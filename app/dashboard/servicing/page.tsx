"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Card className="w-[550px]">
              <CardHeader>
                <CardTitle>ATM</CardTitle>
                <CardDescription>ATM details and information</CardDescription>
              </CardHeader>
              <CardContent>Location:</CardContent>
              <CardContent>Status:</CardContent>
              <CardContent>Last Maintenance:</CardContent>
              <CardContent>Next Scheduled Maintenance:</CardContent>
              <CardContent>Available Balance:</CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Restack</Button>
                <Button variant="outline">Maintain</Button>
                <Button variant="outline">Turn ON / Turn OFF</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
