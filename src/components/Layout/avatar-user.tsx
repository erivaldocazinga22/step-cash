import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarUserProps {
	name: string;
	image?: string;
	size?: "sm" | "md" | "lg";
}

const sizeMap: Record<NonNullable<AvatarUserProps["size"]>, string> = {
	sm: "w-8 h-8 text-xs",
	md: "w-10 h-10 text-sm",
	lg: "w-14 h-14 text-lg",
};

export function AvatarUser({ name, image, size = "md" }: AvatarUserProps) {
	return (
		<Avatar className={cn(sizeMap[size])}>
			<AvatarImage src={image ?? ""} alt={name} />
			<AvatarFallback>
				{name?.substring(0, 2).toUpperCase() ?? "?"}
			</AvatarFallback>
		</Avatar>
	);
}
