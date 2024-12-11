"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBasketIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
interface btnProps {
  text: string;
  loadingText: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}
export function SubmitButton({ text, loadingText, variant }: btnProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={variant} disabled>
          <Loader2 className="mr-3 size-4 animate-spin" />
          <span>{loadingText}</span>
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingCartBtn() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          size={"lg"}
          className="flex justify-center gap-4 w-full mt-4"
        >
          <Loader2 className="size-5 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button
          size={"lg"}
          className="flex justify-center gap-4 w-full mt-4"
          type="submit"
        >
          <ShoppingBasketIcon className="size-5" />
          Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteItem() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant={"link"} disabled className="font-medium text-primary ">
          Deleting...
        </Button>
      ) : (
        <Button
          variant={"link"}
          type="submit"
          className="font-medium text-primary "
        >
          Delete
        </Button>
      )}
    </>
  );
}

export function CheckoutBtn() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size={"lg"} className="w-full mt-5">
          <Loader2 className="size-5 animate-spin mr-2" />
          Checking out...
        </Button>
      ) : (
        <Button type="submit" size={"lg"} className="w-full mt-5">
          Checkout
        </Button>
      )}
    </>
  );
}
