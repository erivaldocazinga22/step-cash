"use client";
import { Camera } from "lucide-react";
import { authClient } from "@/lib/better-auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function ChangeAvatarUser() {
	const { data: session } = authClient.getSession();
	return (
		<div className="flex items-center space-x-4">
			<Avatar className="h-20 w-20">
				<AvatarImage src={`${session?.user.image}`} />
				<AvatarFallback className="text-lg">
					{session?.user.name.substring(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div>
				<Button variant="outline" size="sm">
					<Camera className="mr-2 h-4 w-4" />
					Alterar Foto
				</Button>
				<p className="text-sm text-muted-foreground mt-1">
					JPG, PNG ou GIF. Máximo 2MB.
				</p>
			</div>
		</div>
	);
}
