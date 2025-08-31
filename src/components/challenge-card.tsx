"use client";

import { Calendar, Target } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgressColor, getStatusBadge } from "@/lib/challenges-utils";
import { formatCurrency } from "@/lib/format/format-currency";

type Challenge = {
	id: string;
	title: string;
	description: string;
	category: string;
	status: string;
	currentAmount: number;
	targetAmount: number;
	endDate: string | Date;
};

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
	const progress = (challenge.currentAmount / challenge.targetAmount) * 100;

	return (
		<Link href={`/dashboard/challenges/${challenge.id}`}>
			<Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 group cursor-pointer">
				<CardHeader className="pb-3">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-2">
							<Target className="w-5 h-5 text-green-600" />
							<Badge variant="outline" className="text-xs">
								{challenge.category}
							</Badge>
						</div>
						{getStatusBadge(challenge.status)}
					</div>
					<CardTitle className="text-lg group-hover:text-green-600 transition-colors">
						{challenge.title}
					</CardTitle>
					<CardDescription className="text-sm line-clamp-2">
						{challenge.description}
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					{/* Progresso */}
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">
								Progresso
							</span>
							<span className="font-medium">
								{Math.round(progress)}%
							</span>
						</div>
						<Progress value={progress} className="h-2" />
						<div
							className={`h-2 rounded-full ${getProgressColor(progress)} opacity-80`}
							style={{ width: `${Math.min(progress, 100)}%` }}
						/>
					</div>

					{/* Valores */}
					<div className="space-y-1">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Atual</span>
							<span className="font-medium text-green-600">
								{formatCurrency(
									String(challenge.currentAmount),
								)}
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Meta</span>
							<span className="font-medium">
								{formatCurrency(String(challenge.targetAmount))}
							</span>
						</div>
					</div>

					{/* Data */}
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<Calendar className="w-3 h-3" />
						<span>
							{new Date(challenge.endDate).toLocaleDateString(
								"pt-AO",
							)}
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
