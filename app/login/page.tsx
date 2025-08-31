"use client";

import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/login`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast(data.message);
        // From where ever you redirect use router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
        const callbackUrl =
          searchParams.get("callbackUrl") ||
          process.env.NEXT_PUBLIC_PROFILE_URL ||
          "/";
        router.replace(callbackUrl);
      } else {
        toast(data.error);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <form onSubmit={onSubmit} method="post">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <Image
                      src="/pclub.png"
                      alt="Programming Club Logo"
                      className="rounded-2xl"
                      width={60}
                      height={60}
                    ></Image>
                  </div>
                  <span className="sr-only">Programming Club</span>
                </a>
                <h1 className="text-xl font-bold">
                  Welcome to PClub IIT Kanpur
                </h1>
                <div className="text-center text-sm">
                  Please log in to continue. Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="pclubiik@gmail.com or @iik.ac.in"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="no one is watching you..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying.." : "Login"}
                </Button>
              </div>
            </div>
          </form>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            {/* TODO: Add TnC and Privacy Policy page */}
          </div>
        </div>
      </div>
    </div>
  );
}
