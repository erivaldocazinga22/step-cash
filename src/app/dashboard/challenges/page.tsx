"use client";

import { Calendar, Plus, Target } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Challenge = {
	id: string;
	title: string;
	description: string;
	targetAmount: number;
	currentAmount: number;
	startDate: string;
	endDate: string;
	status: "active" | "completed" | "paused";
	category: string;
};

const challenges: Challenge[] = [
	{
		id: "1",
		title: "Fundo de Emergência",
		description:
			"Economizar para ter 6 meses de despesas guardadas como reserva de emergência.",
		targetAmount: 500000,
		currentAmount: 180000,
		startDate: "2024-01-01",
		endDate: "2024-12-31",
		status: "active",
		category: "Emergência",
	},
	{
		id: "2",
		title: "Viagem para Portugal",
		description:
			"Juntar dinheiro para uma viagem de 15 dias para Portugal no final do ano.",
		targetAmount: 800000,
		currentAmount: 320000,
		startDate: "2024-02-01",
		endDate: "2024-11-30",
		status: "active",
		category: "Viagem",
	},
	{
		id: "3",
		title: "Novo Smartphone",
		description:
			"Economizar para comprar um iPhone 15 Pro Max sem comprometer o orçamento.",
		targetAmount: 450000,
		currentAmount: 450000,
		startDate: "2024-01-15",
		endDate: "2024-06-15",
		status: "completed",
		category: "Tecnologia",
	},
];

export default function ChallengesPage() {
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

	const filteredChallenges = challenges.filter((challenge) => {
		if (filter === "all") return true;
		return challenge.status === filter;
	});

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("pt-AO", {
			style: "currency",
			currency: "AOA",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const getProgressColor = (progress: number) => {
		if (progress < 30) return "bg-red-500";
		if (progress < 70) return "bg-orange-500";
		return "bg-green-500";
	};

	const getStatusBadge = (status: string) => {
		const variants = {
			active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
			completed:
				"bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
			paused: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
		};

		const labels = {
			active: "Ativo",
			completed: "Concluído",
			paused: "Pausado",
		};

		return (
			<Badge className={variants[status as keyof typeof variants]}>
				{labels[status as keyof typeof labels]}
			</Badge>
		);
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="font-playfair text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
						Meus Desafios
					</h1>
					<p className="text-muted-foreground">
						Acompanhe o progresso dos seus objetivos financeiros e
						mantenha-se motivado.
					</p>
				</div>
				<Link href="/dashboard/challenges/new">
					<Button className="bg-green-600 hover:bg-green-700 text-white">
						<Plus className="w-4 h-4 mr-2" />
						Novo Desafio
					</Button>
				</Link>
			</div>

			{/* Filtros */}
			<div className="flex gap-2 mb-6">
				<Button
					variant={filter === "all" ? "default" : "outline"}
					onClick={() => setFilter("all")}
					className={
						filter === "all"
							? "bg-green-600 hover:bg-green-700"
							: ""
					}
				>
					Todos
				</Button>
				<Button
					variant={filter === "active" ? "default" : "outline"}
					onClick={() => setFilter("active")}
					className={
						filter === "active"
							? "bg-green-600 hover:bg-green-700"
							: ""
					}
				>
					Ativos
				</Button>
				<Button
					variant={filter === "completed" ? "default" : "outline"}
					onClick={() => setFilter("completed")}
					className={
						filter === "completed"
							? "bg-green-600 hover:bg-green-700"
							: ""
					}
				>
					Concluídos
				</Button>
			</div>

			{/* Lista de desafios */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredChallenges.length > 0 ? (
					filteredChallenges.map((challenge) => {
						const progress =
							(challenge.currentAmount / challenge.targetAmount) *
							100;

						return (
							<Link
								key={challenge.id}
								href={`/dashboard/challenges/${challenge.id}`}
							>
								<Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 group cursor-pointer">
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between">
											<div className="flex items-center gap-2">
												<Target className="w-5 h-5 text-green-600" />
												<Badge
													variant="outline"
													className="text-xs"
												>
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
											<Progress
												value={progress}
												className="h-2"
											/>
											<div
												className={`h-2 rounded-full ${getProgressColor(progress)} opacity-80`}
												style={{
													width: `${Math.min(progress, 100)}%`,
												}}
											/>
										</div>

										{/* Valores */}
										<div className="space-y-1">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">
													Atual
												</span>
												<span className="font-medium text-green-600">
													{formatCurrency(
														challenge.currentAmount,
													)}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">
													Meta
												</span>
												<span className="font-medium">
													{formatCurrency(
														challenge.targetAmount,
													)}
												</span>
											</div>
										</div>

										{/* Data */}
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<Calendar className="w-3 h-3" />
											<span>
												{new Date(
													challenge.endDate,
												).toLocaleDateString("pt-AO")}
											</span>
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})
				) : (
					<div className="col-span-full text-center py-12">
						<Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
						<h3 className="text-lg font-medium mb-2">
							Nenhum desafio encontrado
						</h3>
						<p className="text-muted-foreground mb-4">
							{filter === "all"
								? "Você ainda não criou nenhum desafio financeiro."
								: `Não há desafios ${filter === "active" ? "ativos" : "concluídos"} no momento.`}
						</p>
						<Link href="/dashboard/challenges/new">
							<Button className="bg-green-600 hover:bg-green-700 text-white">
								<Plus className="w-4 h-4 mr-2" />
								Criar Primeiro Desafio
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
