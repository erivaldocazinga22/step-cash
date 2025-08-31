"use client";

import {
	FileText,
	LayoutDashboard,
	Target,
	User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserProfile } from "./user-profile";

const navigation = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Desafios",
		href: "/dashboard/challenges",
		icon: Target,
	},
	{
		name: "Perfil",
		href: "/dashboard/profile",
		icon: User,
	},
	{
		name: "Políticas",
		href: "/policies",
		icon: FileText,
	},
];

export function DashboardSidebar() {
	const pathname = usePathname();

	return (
		<div className="sticky top-0 left-0 flex h-screen w-64 flex-col bg-sidebar border-r">
			<div className="flex h-16 items-center px-6 border-b">
				<div className="flex items-center space-x-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
						<Target className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="font-playfair text-xl font-bold text-primary">
						StepCash
					</span>
				</div>
			</div>

			<nav className="flex-1 px-4 py-6">
				<ul className="space-y-2">
					{navigation.map((item) => {
						const isActive =
							pathname === item.href ||
							(item.href === "/dashboard/challenges" &&
								pathname.startsWith("/dashboard/challenges"));

						return (
							<li key={item.name}>
								<Button
									variant={isActive ? "secondary" : "ghost"}
									className={cn(
										"w-full justify-start",
										isActive &&
											"bg-primary/10 text-primary hover:bg-primary/20",
									)}
									asChild
								>
									<Link href={item.href}>
										<item.icon className="mr-3 h-4 w-4" />
										{item.name}
									</Link>
								</Button>
							</li>
						);
					})}
				</ul>
			</nav>

			<UserProfile />
		</div>
	);
}
