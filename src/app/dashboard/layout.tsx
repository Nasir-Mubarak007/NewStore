// "use client";

import { ReactNode } from "react";
import { DashboardNavigation } from "../components/dashboard/DashboardNavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

import { redirect } from "next/navigation";
import { checkUser } from "../lib/checkUser";
import { UserButton } from "@clerk/nextjs";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await checkUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    console.log("Unauthorized user!");

    return redirect("/");
  }

  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white mb-3">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <DashboardNavigation />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              variant={"outline"}
              size={"icon"}
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <nav className="grid gap-6 text-lg font-medium mt-5">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>

        <UserButton />
      </header>
      {children}
    </div>
  );
}

export default DashboardLayout;
