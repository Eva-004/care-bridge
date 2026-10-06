
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
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Register successfully!");
    router.push("/");
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Card
      className="mx-auto my-8 w-full max-w-md bg-white px-6 py-5 shadow-md"
    >
      <h1 className="text-center text-2xl font-bold text-[#1D2D44]">
        Register
      </h1>

      <Form
        className="mx-auto flex w-full flex-col gap-4"
        onSubmit={onSubmit}
      >
        <TextField isRequired name="name" type="text">
          <Label className="text-[#1D2D44]">Name</Label>
          <Input
            placeholder="Enter your name"
            className="border-[#0F4C5C] focus:border-[#0F4C5C]"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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
            Register
          </Button>
      </Form>

      <p className="mt-2 text-center text-sm text-[#1D2D44]/80">
        Have a account! Please{" "}
        <Link
          href="/login"
          className="font-medium text-[#E36414] hover:underline"
        >
          Login
        </Link>
      </p>

      <p className="text-center text-[#1D2D44]/60">OR</p>

      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full border-[#0F4C5C] text-[#1D2D44] hover:bg-[#F8F9FA]"
      >
        <FcGoogle />
        Register with Google
      </Button>
    </Card>
  );
};

export default RegisterPage;

