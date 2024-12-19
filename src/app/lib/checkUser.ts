import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  console.log("user-details: ", user?.fullName);

  // checking for current user is logged in (clerk)
  if (!user || user === null || !user.id) {
    console.log(Error);
    return;
  }

  // Check if the user exist in our database
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
        email: user.emailAddresses[0].emailAddress ?? "",
        profileImage:
          user.imageUrl ?? `https://avatar.vercel.sh/${user.firstName}`,
      },
    });
  }
  return dbUser;
};
