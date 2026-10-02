"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import {Button, Description, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import { resetPassword } from "@/lib/auth-client";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const resData = await resetPassword(
            newPassword = data.password,
            token
        );
        console.log("Reset Password Response:", resData),
        toast.success("Password reset successfully! Please sign in with your new password.")
        }
    return (
        <div>
            <h2>Now Give me a new password</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={handleResetPassword}>

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
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          Submit
        </Button>
      </div>
    </Form>
        </div>
    );
};

export default ResetPasswordForm;