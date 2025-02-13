import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <DragWindowRegion title="electron-shadcn" />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}