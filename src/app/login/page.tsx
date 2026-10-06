
"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LoginPage = () => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value;

    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Login successfully!");
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="bg-[#F8F9FA]">
      <Card className="mx-auto my-8 w-full max-w-md bg-white px-6 py-5 shadow-md">
        <h1 className="text-center text-2xl font-bold text-[#1D2D44]">
          Login
        </h1>

        <Form
          className="mx-auto flex w-full flex-col gap-4"
          onSubmit={onSubmit}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="text-[#1D2D44]">Email</Label>

            <Input
              placeholder="john@example.com"
              className="border-[#0F4C5C] focus:border-[#0F4C5C]"
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-[#1D2D44]">Password</Label>

            <Input
              placeholder="Enter your password"
              className="border-[#0F4C5C] focus:border-[#0F4C5C]"
            />

            <Description className="text-[#1D2D44]/70">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

            <Button
              type="submit"
              className="bg-[#0F4C5C] text-white w-full hover:bg-[#0F4C5C]/90"
            >
              Login
            </Button>
        </Form>

        <p className="mt-2 text-center text-sm text-[#1D2D44]/80">
          Don`t have account? Please{" "}
          <Link
            href="/register"
            className="font-medium text-[#E36414] hover:underline"
          >
            Register
          </Link>
        </p>

        <p className="text-center text-[#1D2D44]/60">OR</p>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full border-[#0F4C5C] text-[#1D2D44] hover:bg-[#F8F9FA]"
        >
          <FcGoogle />
          Login with Google
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;

