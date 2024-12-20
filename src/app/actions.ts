"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { checkUser } from "./lib/checkUser";

// ADMINS PRIVILEGES

export async function createProduct(currentState: unknown, formData: FormData) {
  const user = await checkUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlStrings) =>
    urlStrings.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/dashboard/products");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editProduct(currentState: any, formData: FormData) {
  const user = await checkUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlStrings) =>
    urlStrings.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      isFeatured: submission.value.isFeatured === true ? true : false,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const user = await checkUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });
  redirect("/dashboard/products");
}

export async function createBanner(currentState: unknown, formData: FormData) {
  const user = await checkUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      name: submission.value.name,
      image: submission.value.image,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const user = await checkUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/");
  }

  const bannerId = formData.get("bannerId") as string;

  await prisma.banner.delete({
    where: {
      id: bannerId,
    },
  });
  redirect("/dashboard/banner");
}

// CUSTOMERS PRIVILEGES

export async function addItem(productId: string) {
  const user = await checkUser();

  if (!user) {
    console.log("Unauthorized, login first");

    return redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },

    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }

  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          imageString: selectedProduct.images[0],
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageString: selectedProduct.images[0],
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);
  revalidatePath("/", "layout");
}

export async function deleteItem(formData: FormData) {
  const user = await checkUser();

  if (!user) {
    console.log("Unauthorized, login first");

    return redirect("/");
  }

  const productId = formData.get("productId");

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/cart");
}

export async function checkOut() {
  const user = await checkUser();

  if (!user) {
    console.log("Unauthorized, login first");

    return redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/success"
          : "https://new-store-six.vercel.app/payment/success",

      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/cancel"
          : "https://new-store-six.vercel.app/payment.cancel",
      metadata: {
        userId: user.id,
      },
    });

    return redirect(session.url as string);
  }
}
