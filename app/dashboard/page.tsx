"use client";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  interface UserType {
    balance: number;
    transactions: Array<any>;
  }

  const [User, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    // Simulate fetching user and navMain data
    const fetchData = async () => {
      const response = await fetch("/api/dashboard/user");
      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const data = await response.json();
      if (!data.success) {
        console.error("Failed to fetch user data:", data.message);
        return;
      }
      console.log("User data fetched successfully:", data.data);
      setUser(data.data);
    };
    fetchData();
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards balance={User ? User.balance : 0} />
              <DataTable Transactions={User ? User.transactions : []} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
