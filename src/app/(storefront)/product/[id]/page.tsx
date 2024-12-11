import { addItem } from "@/app/actions";
import FeaturedProducts from "@/app/components/storefront/FeaturedProducts";
import ImageSlider from "@/app/components/storefront/ImageSlider";
import { ShoppingCartBtn } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getData(id);
  const addProductToCart = addItem.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-4">
        <ImageSlider images={data.images} />
        <div className="">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-primary text-3xl mt2">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-7">{data.description}</p>
          <form action={addProductToCart}>
            <ShoppingCartBtn />
          </form>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}

export default ProductPage;
