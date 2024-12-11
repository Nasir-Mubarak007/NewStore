import { Skeleton } from "@/components/ui/skeleton";

const ProductLoadingRoute = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start lg:gap-x-24 py6">
      <div>
        <Skeleton className="w-full h-[37.5rem]" />
        <div className="grid grid-cols-5 gap-4 mt-6">
          <Skeleton className="size-[6.25rem]" />
          <Skeleton className="size-[6.25rem]" />
          <Skeleton className="size-[6.25rem]" />
          <Skeleton className="size-[6.25rem]" />
          <Skeleton className="size-[6.25rem]" />
        </div>
      </div>

      <div className="">
        <Skeleton className="w-56 h-12" />
        <Skeleton className="w-36 h-12 mt-4" />
        <Skeleton className="w-full h-60 mt-4" />
        <Skeleton className="w-full h-12 mt-5" />
      </div>
    </div>
  );
};

export default ProductLoadingRoute;
