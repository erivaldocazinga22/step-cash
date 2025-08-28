import type React from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function PrincipalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen bg-background">
			<DashboardSidebar />
			<main className="w-full">{children}</main>
		</div>
	);
}
