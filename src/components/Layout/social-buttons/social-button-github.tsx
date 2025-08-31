"use client";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/client";

export function SocialButtonGithub() {
	const signIn = async () => {
		const data = await authClient.signIn.social({
			provider: "github",
			callbackURL: "/dashboard"
		});

		console.log("GITHUB SOCIAL: ", { data });
	};
	return (
		<Button
			type="button"
			variant="outline"
			onClick={signIn}
			className="w-full gap-2 py-4"
		>
			<Github />
			<span>Github</span>
		</Button>
	);
}
