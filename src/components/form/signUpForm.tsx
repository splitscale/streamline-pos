"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { signIn } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function SignUpForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const res = await signIn("user-signup", {
      ...values,
      redirect: false,
    });

    if (!res?.ok) {
      alert(
        `Registration failed! This should not happen if the auth server is up! Or maybe the user already exist?`,
      );
    } else {
      router.push("/mobile");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign Up using basic credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center space-y-5"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="username"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      className="w-full"
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" variant={"default"} type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
