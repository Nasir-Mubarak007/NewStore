"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface imageProps {
  images: string[];
}

export default function ImageSlider({ images }: imageProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousBtn() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  function handleNextBtn() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }
  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={images[mainImageIndex]}
          alt="Product Image"
          width={600}
          height={600}
          className="object-cover w-full h-[37.5rem] rounded-xl"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            onClick={handlePreviousBtn}
            variant={"secondary"}
            size={"icon"}
          >
            <ChevronLeftIcon className="size-6" />
          </Button>
          <Button
            onClick={handleNextBtn}
            variant={"secondary"}
            size={"icon"}
            // className="mr-[20%]"
          >
            <ChevronRightIcon className="size-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              index === mainImageIndex
                ? "border border-primary"
                : "border-gray-200",
              "relative overflow-hidden border-2 rounded-lg cursor-pointer"
            )}
          >
            <Image
              src={image}
              alt="Product image"
              width={100}
              height={100}
              className="object-cover w-full h-[6.25rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
