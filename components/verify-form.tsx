import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VerifyForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify Password</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">username</Label>
          <Input id="username" type="text" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input id="verifyCode" type="number" required />
        </div>
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </div>
    </form>
  );
}
