"use client"

import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { authClient } from "@/lib/better-auth/client"

export function SignOutButton() {
    const handleSignOut = async ()=> {
		await authClient.signOut()
	}
    return (
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
        </Button>
    )
}