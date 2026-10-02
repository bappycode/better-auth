'use client'
import {Button, Description, FieldError, Form, Input, Label, TextField, InputGroup} from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import { useState } from "react";
import Link from "next/link";


const signInPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { data: signInData, error } = await signIn.email({
    email: data.email, // required, The email address of the user.
    password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
    callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
});
console.log("Sign In Data:", signInData, "Error:", error);
  };
  const handleGoogleSignIn = async () => {
        const data = await signIn.social({
      provider: "google",
      callbackURL: "/", // An optional URL to redirect to after the user signs in.
    })};
    const handleGitHubSignIn = async () => {
        const data = await signIn.social({
      provider: "github",
      callbackURL: "/", // An optional URL to redirect to after the user signs in.
    })};
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
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
      <TextField className="w-full max-w-[280px]" name="password">
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          type={isVisible ? "text" : "password"}
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
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
    <p><Link href="/forgot-password">Forgot your password?</Link></p>
    <p>Or</p>
        <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
        <Button onClick={handleGitHubSignIn}>Sign In With GitHub</Button>
        </div>
    );
};

export default signInPage;