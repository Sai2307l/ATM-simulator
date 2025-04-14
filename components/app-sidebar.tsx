"use client";

import * as React from "react";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
