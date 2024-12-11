import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
async function getData() {
  const data = prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}
export async function Hero() {
  const data = await getData();
  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                alt="Banner image"
                src={item.image}
                fill
                className="object-contain w-full h-full rounded-xl "
              />
              <div className="absolute top-6 left-6 p-6 bg-black text-white rounded-xl shadow-lg bg-opacity-70 transition-transform hover:scale-110">
                <h1 className="text-xl lg:text-4xl  font-bold">{item.name}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
