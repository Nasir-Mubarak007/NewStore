import Image from "next/image";
import Link from "next/link";
import React from "react";
import All from "../../../../public/all-product.jpg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Men from "../../../../public/men-product.jpg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Women from "../../../../public/women-product.jpg";
import Kids from "../../../../public/kids-product.jpg";

export default function CategorySelection() {
  return (
    <>
      <div className="py-24 sm:py-32 flex justify-between items-center">
        <h2 className="text-2xl   font-extrabold tracking-tight">
          Shop by Category
        </h2>
        <Link
          href={"/products/all"}
          className="text-primary font-medium hover:text-primary/80"
        >
          Browse All Products &rarr;
        </Link>
      </div>

      <div
        className="grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:grid-rows-3 grid-rows-4 sm:gap-x-6
      lg:gap-3 p-x-3"
      >
        <div className="sm:row-span-3 group aspect-w-2 col-span-2 aspect-h-1 overflow-hidden rounded-xl">
          <Image
            src={All}
            alt="All Products"
            fill
            className="object-cover object-center"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="p-6 flex items-end">
            <Link href={"/products/all"} className="">
              <h3 className="text-white font-semibold">All Products</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-1 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={Men}
            alt="Products for Men"
            fill
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-3 flex items-end sm:absolute sm:inset-0">
            <Link href={"/products/men"} className="">
              <h3 className="text-white font-semibold">Products for Men</h3>
              <p className="text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-1 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={Women}
            alt="Women's Products"
            fill
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-3 flex items-end sm:absolute sm:inset-0">
            <Link href={"/products/women"} className="">
              <h3 className="text-white font-semibold">Products for Women</h3>
              <p className=" text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-1 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={Kids}
            alt="Kids' Products"
            fill
            className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-3 flex items-end sm:absolute sm:inset-0">
            <Link href={"/products/Kids"} className="">
              <h3 className="text-white font-semibold">Kids&#39; Products</h3>
              <p className="text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
