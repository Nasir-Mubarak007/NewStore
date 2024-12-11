"use client";
import { createBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useState } from "react";

export default function BannerRoute() {
  const { toast } = useToast();

  const [picture, setPicture] = useState<string | undefined>(undefined);

  const [lastResult, action] = useActionState(createBanner, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4 mb-5">
        <Button variant={"outline"} size={"icon"}>
          <Link href={"/dashboard/banner"}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Create Your banner here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                placeholder="Banner title goes here"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="grid gap-3">
              <Label>Image</Label>
              <Input
                type="hidden"
                value={picture}
                key={fields.image.key}
                name={fields.image.name}
                onChange={(e) => setPicture(e.target.value)}
                defaultValue={fields.image.initialValue ?? ""}
              />
              {picture !== undefined ? (
                <Image
                  height={200}
                  width={200}
                  src={picture}
                  alt="Banner Image"
                  className="w-[12.5rem] h-[12.5rem] object-cover rounded-lg border"
                />
              ) : (
                <UploadDropzone
                  endpoint="bannerUploaderRoute"
                  onClientUploadComplete={(res) => {
                    toast({ title: "Upload Completed", variant: "default" });
                    setPicture(res[0].url);
                  }}
                  onUploadError={(err: Error) => {
                    toast({
                      title: `Something went wrong`,
                      description: err.message,
                      variant: "destructive",
                    });
                  }}
                />
              )}
              <p className="text-red-500">{fields.image.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton text={"Create Banner"} loadingText={"Loading..."} />
        </CardFooter>
      </Card>
    </form>
  );
}
