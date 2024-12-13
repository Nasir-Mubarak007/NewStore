import { checkUser } from "@/app/lib/checkUser";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await checkUser();
  if (!user || user === null || !user.id) {
    throw new Error("Oops! something went wrong!");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        profileImage:
          user.profileImage ?? `https://avatar.vercel.sh/${user.firstName}`,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://new-store-six.vercel.app"
  );
}
