import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";

export function DepositForm() {
  async function onSubmit(formData: FormData) {
    const password = await formData.get("password");
    const amount = await formData.get("amount");
    const body = { password: password, amount: amount };
    console.log("Form data:", body);
    const response = await fetch("/api/dashboard/deposite", {
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
  }
  return (
    <Form className="flex flex-col gap-6" action={onSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Deposit</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input name="amount" type="number" required />
        </div>
        <Button type="submit" className="w-full">
          Deposit
        </Button>
      </div>
    </Form>
  );
}
