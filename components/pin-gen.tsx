import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";

export function PinForm() {
  const onSubmit = async (formData: FormData) => {
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const body = { oldPassword: oldPassword, newPassword: newPassword };
    console.log("Form data:", body);
    const response = await fetch("/api/dashboard/change-password", {
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
  };
  return (
    <Form className="flex flex-col gap-6" action={onSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">PIN generation</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">Old Password</Label>
          <Input name="oldPassword" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input name="newPassword" type="number" required />
        </div>
        <Button type="submit" className="w-full">
          change PIN
        </Button>
      </div>
    </Form>
  );
}
