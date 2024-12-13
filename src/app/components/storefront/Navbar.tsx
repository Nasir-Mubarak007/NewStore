import Link from "next/link";
import React from "react";
import { NavbarLinks } from "./NavbarLinks";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
import { checkUser } from "@/app/lib/checkUser";

export async function Navbar() {
  const user = await checkUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <nav
      className="!w-full px-4 sm:px-6 lg:px8 py-5 flex items-center
  justify-between"
    >
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className="font-bold text-xl lg:text-3xl">
            New <span className="text-primary">Store</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className="flex items-center">
        <SignedIn>
          <Link href="/cart" className="group p-2 flex items-center mr-2">
            <ShoppingCartIcon className="size-6 text-gray-500 group-hover:text-gray-700" />
            <span className="text-sm font-medium ml-2 text-gray-700 group-hover:text-gray-800">
              {total}
            </span>
          </Link>
          <UserButton showName />
        </SignedIn>

        <div className="hidden md:flex md:flex-1 md:items-center md:space-x-2 md:justify-end">
          <SignedOut>
            <Button variant={"outline"} asChild>
              <SignInButton />
            </Button>
            <span className="h-6 w-px bg-gray-300"></span>
            <Button asChild>
              <SignUpButton>Create Account</SignUpButton>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
