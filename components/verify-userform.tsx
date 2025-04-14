"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import { useRouter } from "next/navigation";

export function VerifyUserForm() {
  const router = useRouter();
  async function onSubmit(formData: FormData) {
    const username = await formData.get("username");
    const code = await formData.get("verifyCode");
    const body = { username: username, verifyCode: code };
    console.log("Form data:", body);
    const response = await fetch("/api/verify-code", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }
    const data = await response.json();
    console.log("Success:", data.message);
    if (response.status === 200) {
      router.push("/sign-in");
    }
  }
  return (
    <Form action={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify Password</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input name="username" type="text" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input name="verifyCode" type="number" required />
        </div>
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </div>
    </Form>
  );
}
