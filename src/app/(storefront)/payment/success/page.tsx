import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[21.88rem]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <CheckCircleIcon className="size-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successful
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats to your purchase. Your payment was successful.
            </p>

            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href={"/"}>Back To HomePage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default SuccessPage;
