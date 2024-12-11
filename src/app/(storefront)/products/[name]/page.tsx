import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          description: true,
          price: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "All Products",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          description: true,
          price: true,
        },
        where: {
          status: "published",
          category: "men",
        },
      });
      return {
        title: "Products For Men",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          description: true,
          price: true,
        },
        where: {
          status: "published",
          category: "women",
        },
      });

      return {
        title: "Products For Ladies",
        data: data,
      };
    }

    case "kids": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          description: true,
          price: true,
        },
        where: {
          status: "published",
          category: "kids",
        },
      });
      return {
        title: "Products For Kids",
        data: data,
      };
    }

    default:
      notFound();
  }
}

const CategoriesPage = async ({ params }: { params: { name: string } }) => {
  // const { name } = await params;
  const { data, title } = await getData(params.name);
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
