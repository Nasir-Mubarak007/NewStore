import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface cardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}
export function ProductCard({ item }: cardProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[20.63rem]">
                <Image
                  src={photo}
                  alt="Product Image"
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="flex justify-between items-center mt-2">
        <h3 className="font-semibold text-xl">{item.name}</h3>
        <h3 className="inline-flex rounded-md items-center bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring ring-inset ring-primary/25">
          ${item.price}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>
      <Button className="w-full mt-5" asChild>
        <Link href={`/product/${item.id}`}>Learn More</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[20.625rem]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
