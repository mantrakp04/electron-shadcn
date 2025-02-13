import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Home, Book, Settings, Wrench } from "lucide-react";
import { useRouter, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    icon: <Home className="w-4 h-4" />,
    href: "/",
  },
  {
    label: "Knowledge Base",
    icon: <Book className="w-4 h-4" />,
    href: "/knowledgebase",
  },
  {
    label: "Tools",
    icon: <Wrench className="w-4 h-4" />,
    href: "/tools",
  },
];

export function AppSidebar() {
  const router = useRouter();
  const location = useLocation();

  return (
    <div className="w-64 border-r bg-background h-full flex flex-col">
      {/* Header */}
      <div className="h-12 px-2 flex items-center justify-between bg-background shrink-0">
        <Button
          variant="ghost"
          className="text-xl font-medium h-auto p-0 hover:bg-transparent"
          onClick={() => router.navigate({ to: "/" })}
        >
          CommChat
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Navigation */}
        <div className="p-2 gap-1 flex flex-col">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              size="sm"
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors justify-start",
                location.pathname === route.href
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground"
              )}
              onClick={() => router.navigate({ to: route.href })}
            >
              {route.icon}
              {route.label}
            </Button>
          ))}
        </div>

        {/* Chats Section */}
        <div className="px-4 py-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Chats
          </h3>
          <div className="space-y-1">
            {/* Chat items would go here */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-14 px-4 flex items-center min-h-14 shrink-0">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
