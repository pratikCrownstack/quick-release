"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

const Register = () => {
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    firstName: z.string().min(1, { message: "Required" }).max(50, {
      message: "Fisrt Name can be maximum 50 characters",
    }),
    lastName: z.string().min(1, { message: "Required" }).max(50, {
      message: "Last Name can be maximum 50 characters",
    }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password should be minimum 6 characters" }),
    orgName: z.string().min(1, { message: "Required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      orgName: "",
    },
  });

  async function createUser(values: z.infer<typeof formSchema>) {
    try {
      setLoader(true);
      const response = await axios.post("/api/register", values);
      setLoader(false);
      toast({
        title: response.data.message,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <MaxWidthWrapper className="md:px-20 lg:px-60">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createUser)}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center flex flex-col gap-2">
                  <span className="px-4 text-3xl">Quick Release</span>
                  Create an account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
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
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="orgName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organisation Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Organisation Name" {...field} />
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
                      <span className="px-2">Create account </span>
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
    </>
  );
};

export default Register;
