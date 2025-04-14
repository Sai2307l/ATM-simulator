import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  async function onSubmit(formData: FormData) {
    const data = await formData.get("username");
    const email = await formData.get("email");
    const password = await formData.get("password");
    const body = { username: data, email, password };
    console.log("Form data:", body);
    const response = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error("Failed to submit form", response.statusText);
      return;
    }
    if (response.status === 200) {
      const data = await response.json();
      console.log("Form submitted successfully", data);
    }
    if (response.status === 401) {
      console.error("Unauthorized", response.statusText);
    }
    router.push("/verifyuser");
  }
  return (
    <Form className="flex flex-col gap-6" action={onSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Signup and Create your own account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            type="text"
            placeholder="sai2307L...."
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        already have an account?{" "}
        <a href="/sign-in" className="underline underline-offsft-4">
          Sign In
        </a>
      </div>
    </Form>
  );
}
