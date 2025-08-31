"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/client";

export function SocialButtonGoogle() {
	const signIn = async () => {
		const data = await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashbaord"
		});

		console.log("GOOGLE SOCIAL: ", { data });
	};
	return (
		<Button
			type="button"
			variant="outline"
			onClick={signIn}
			className="w-full gap-2 py-4"
		>
			<Image
				src="/images/Google-Logo.svg"
				alt="Google Logo"
				width={20}
				height={20}
			/>
			<span>Google</span>
		</Button>
	);
}
