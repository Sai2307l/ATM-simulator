"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WithdrawForm } from "@/components/withdraw-form";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <WithdrawForm />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
