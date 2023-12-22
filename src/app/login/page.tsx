"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  function handleInput(e: any) {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password should be minimum 6 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function loginUser(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      setLoader(false);
      if (res?.error) {
        toast({
          title:
            res?.error === "CredentialsSignin" ? "Invalid Credentials" : "",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
  return (
    <MaxWidthWrapper className="md:px-20 lg:px-60">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(loginUser)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center flex flex-col gap-2">
                <span className="px-4 text-3xl">Quick Release</span>
                Log In To Your Account
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="abc@gmail.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">
                {loader ? (
                  <>
                    <span className="px-2">Log In </span>
                    <Loader />
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Login;
