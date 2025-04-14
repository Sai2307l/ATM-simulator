"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [Atm, setAtm] = useState();
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    fetch("/api/dashboard/servecing")
      .then((response) => response.json())
      .then((data) => {
        console.log("ATM data:", data);
        setAtm(data.data[0]);
        console.log("ATM data:", data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching ATM data:", error);
      });
  }, [flip]);
  const handleFlip = () => {
    setFlip(!flip);
  };
  const restack = async () => {
    try {
      const response = await fetch("/api/dashboard/servecing", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleFlip();
      const data = await response.json();
      console.log("Restack response:", data);
    } catch (error) {
      console.error("Error during restack:", error);
    }
  };
  const maintain = async () => {
    try {
      const response = await fetch("/api/dashboard/servecing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleFlip();
      const data = await response.json();
      console.log("Maintain response:", data);
    } catch (error) {
      console.error("Error during maintain:", error);
    }
  };
  const turnOnOff = async () => {
    try {
      const response = await fetch("/api/dashboard/switch", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleFlip();
      const data = await response.json();
      console.log("Turn ON/OFF response:", data);
    } catch (error) {
      console.error("Error during turn ON/OFF:", error);
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Card className="w-[550px]">
              <CardHeader>
                <CardTitle>ATM</CardTitle>
                <CardDescription>ATM details and information</CardDescription>
              </CardHeader>
              <CardContent>
                Location: {Atm ? Atm.location : "Loading..."}
              </CardContent>
              <CardContent>
                Status:{" "}
                {Atm ? (Atm.machine_status ? "ON" : "OFF") : "Loading..."}
              </CardContent>
              <CardContent>
                Last Maintenance:{Atm ? Atm.lastServiced : "Loading..."}
              </CardContent>
              <CardContent>
                Next Scheduled Maintenance:
                {Atm ? Atm.date_of_Servicing : "Loading..."}
              </CardContent>
              <CardContent>
                Available Balance:{Atm ? Atm.balance : "Loading..."}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => restack()}>
                  Restack
                </Button>
                <Button variant="outline" onClick={() => maintain()}>
                  Maintain
                </Button>
                <Button variant="outline" onClick={() => turnOnOff()}>
                  Turn ON / Turn OFF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
