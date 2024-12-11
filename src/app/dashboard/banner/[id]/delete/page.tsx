import React from "react";

import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { deleteBanner } from "@/app/actions";

async function DeleteRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="h-[80vh] w-full flex  items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Are you Really Sure?</CardTitle>
          <CardDescription>
            This action is irreversible and will permanently remove this banner
            from the server.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between px-20">
          <Button variant={"outline"} asChild>
            <Link href={"/dashboard/banner"}>Cancel</Link>
          </Button>

          <form action={deleteBanner}>
            <Input type="hidden" name="bannerId" value={id} />
            <SubmitButton
              variant="destructive"
              text={"Delete Banner"}
              loadingText={"Deleting..."}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DeleteRoute;
