"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth/client";
import { Button } from "./ui/button";

export function SignOutButton() {
	const router = useRouter();
	const handleSignOut = async () => {
		await authClient.signOut(
			{},
			{
				onSuccess: () => {
					router.replace("/sign-in");
				},
			},
		);
	};
	return (
		<Button variant="ghost" size="icon" onClick={handleSignOut}>
			<LogOut className="h-4 w-4" />
		</Button>
	);
}
