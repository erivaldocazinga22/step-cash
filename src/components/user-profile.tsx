"use client"

import { Settings } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SignOutButton } from "./sign-out-button";
import { authClient } from "@/lib/better-auth/client";

export function UserProfile() {
  const { data: session,isPending } = authClient.useSession();

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  if (!session) {
    return <p className="text-sm text-muted-foreground">Not signed in</p>;
  }

  return (
    <div className="border-t p-4">
      <div className="flex items-center space-x-3 mb-4">
        <Avatar>
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback>{session.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{session.user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
        <SignOutButton />
      </div>
    </div>
  );
}
