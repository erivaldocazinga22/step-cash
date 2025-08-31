"use client";

import { Settings } from "lucide-react";
import { authClient } from "@/lib/better-auth/client";
import { AvatarUser } from "./Layout/avatar-user";
import { SignOutButton } from "./sign-out-button";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function UserProfile() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return (
			<div className="border-t p-4">
				<div className="flex items-center space-x-3 mb-4">
					<Skeleton className="h-8 w-8 rounded-full" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-2 w-full rounded-full" />
						<Skeleton className="h-1.5 w-10/12 rounded-full" />
					</div>
				</div>
				<Skeleton className="h-4 w-full rounded-full mb-2" />
			</div>
		);
	}

	if (!session) {
		return <p className="text-sm text-muted-foreground">Not signed in</p>;
	}

	return (
		<div className="border-t p-4">
			<div className="flex items-center space-x-3 mb-4">
				<AvatarUser
					name={session.user.name}
					image={session.user?.image ?? ""}
				/>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium truncate">
						{session.user.name}
					</p>
					<p className="text-xs text-muted-foreground truncate">
						{session.user.email}
					</p>
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
