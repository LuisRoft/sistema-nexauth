"use client";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      form.setError("username", {
        type: "manual",
        message: "Invalid username or password",
      });
      form.setError("password", {
        type: "manual",
        message: "Invalid username or password",
      });
    } else {
      setLoading(false);
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="rounded-lg border border-zinc-600 bg-white px-14 py-8">
      <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="luisroftl"
                    {...field}
                    className="border-zinc-600"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                      id="input-23"
                      className="pr-9 border-zinc-600"
                      placeholder="password"
                      type={isVisible ? "text" : "password"}
                      {...field}
                    />
                    <button
                      className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <EyeOff
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                          role="presentation"
                        />
                      ) : (
                        <Eye
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                          role="presentation"
                        />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>
                  This is your private password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Please wait</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
