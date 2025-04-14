"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  ArrowDownCircleIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    role: "service",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Withdraw",
      url: "/dashboard/withdraw",
      icon: ArrowUpCircleIcon,
    },
    {
      title: "Deposit",
      url: "/dashboard/deposit",
      icon: ArrowDownCircleIcon,
    },
    {
      title: "PIN generator",
      url: "/dashboard/pin",
      icon: BarChartIcon,
    },
    {
      title: "Verification for user",
      url: "/dashboard/verification",
      icon: UsersIcon,
    },
    {
      title: "Servicing",
      url: "/dashboard/servicing",
      icon: UsersIcon,
    },
  ],
};

export function AppSidebar() {
  const [user, setUser] = useState(data.user);
  const [navMain, setNavMain] = useState(data.navMain);
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
      setUser(data.data);
      setNavMain(data.navMain);
    };
    fetchData();
  }, []);
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
