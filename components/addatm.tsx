"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";

export function AddAtmForm() {
  async function onSubmit(formData: FormData) {
    const Id = await formData.get("Id");
    const balance = await formData.get("balance");
    const status = await formData.get("status");
    const location = await formData.get("location"); // Assuming you meant to get the location here, but
    const body = {
      Id: Id,
      balance: balance,
      status: status === "on" ? true : false, // Assuming status is a string that can be "on" or "off"
      location: location,
    };
    console.log("Form data:", body);

    const response = await fetch("/api/dashboard/servecing", {
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
    <Form action={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create ATM</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="Id">Id</Label>
          <Input name="Id" type="number" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="balance">Balance</Label>
          <Input name="balance" type="text" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Machine_Status</Label>
          <Input name="status" type="checkbox" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input name="location" type="text" required />
        </div>
        <Button type="submit" className="w-full">
          Add Atm
        </Button>
      </div>
    </Form>
  );
}
