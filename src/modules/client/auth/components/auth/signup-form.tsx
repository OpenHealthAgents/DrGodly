"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import OauthButton from "./oauth-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/modules/client/auth/betterauth/auth-client";

const signUpFormSchema = z.object({
  username: z
    .string()
    .min(2, "Username must have atleast two characters")
    .max(15, "Username must have atmost 20 characters"),
  name: z
    .string()
    .min(2, "Name must have atleast two characters")
    .max(20, "Name must have atmost 20 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must have atleast two characters")
    .max(16, "Password must have atmost 16 characters"),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUpForm({
  isAuthCheckPending,
}: {
  isAuthCheckPending: boolean;
}) {
  const router = useRouter();
  const [inputType, setInputType] = useState("password");

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignUpForm) {
    const { email, name, password, username } = values;

    await authClient.signUp.email(
      {
        username,
        email,
        name,
        password,
        callbackURL: "/bezs",
      },
      {
        onSuccess() {
          toast("Success!");
          router.push(`/email-verification?email=${email}`);
        },
        onError(ctx) {
          toast("Error!", {
            description: ctx.error.message,
          });
        },
      }
    );
  }

  function handleInputTypeChange() {
    setInputType((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  }

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="******"
                        {...field}
                        type={inputType}
                        maxLength={16}
                        autoComplete="off"
                      />
                      {inputType === "password" ? (
                        <EyeOff
                          className="w-4 h-4 absolute top-[25%] right-3.5 cursor-pointer"
                          onClick={handleInputTypeChange}
                        />
                      ) : (
                        <Eye
                          className="w-4 h-4 absolute top-[25%] right-3.5 cursor-pointer"
                          onClick={handleInputTypeChange}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-md cursor-pointer"
              disabled={isSubmitting || isAuthCheckPending}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                "Create an account"
              )}
            </Button>
          </form>
        </Form>
        <div className="space-y-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="h-[1px] bg-white/20 w-full" />
            <p className="text-nowrap w-fit text-center text-sm text-zinc-500 dark:text-white/70">
              Or continue with
            </p>
            <div className="h-[1px] bg-white/20 w-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <OauthButton
              oauthName="google"
              label="Google"
              isFormSubmitting={isSubmitting || isAuthCheckPending}
            />
            <OauthButton
              oauthName="github"
              label="GitHub"
              isFormSubmitting={isSubmitting || isAuthCheckPending}
            />
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-zinc-500 dark:text-white/70">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-black dark:text-white underline-offset-4 underline"
          >
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
