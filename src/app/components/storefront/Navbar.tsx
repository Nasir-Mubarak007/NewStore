import Link from "next/link";
import React from "react";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ShoppingCartIcon } from "lucide-react";
import { UserDropDown } from "./UserDropDown";
import { Button } from "@/components/ui/button";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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
        {user ? (
          <>
            <Link href={"/cart"} className="group p-2 flex items-center mr-2">
              <ShoppingCartIcon className="size-6 text-gray-500 group-hover:text-gray-700" />
              <span className="text-sm font-medium ml-2 text-gray-700 group-hover:text-gray-800">
                {total}
              </span>
            </Link>
            <UserDropDown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:space-x-2 md:justify-end">
            <Button variant={"outline"} asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-300"></span>
            <Button asChild>
              <RegisterLink>Create account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
