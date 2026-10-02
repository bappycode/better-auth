'use client';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import { requestPasswordReset } from "@/lib/auth-client";

// eslint-disable-next-line @next/next/no-async-client-component
const ForgotPasswordPage = () => {
    const hsndleForgotPassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Forgot Password Data:", data);
        const resData = await requestPasswordReset({
          email: data.email,
          redirectTo: `${window.location.origin}/reset-password`,
        })
        toast.success("Password reset email sent!");
        console.log("Password reset response:", resData);
    }

    return (
        <div>
             <Form className="flex w-96 flex-col gap-4" onSubmit={hsndleForgotPassword}>
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
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
        </div>
    );
};

  export default ForgotPasswordPage;