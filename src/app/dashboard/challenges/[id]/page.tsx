import { ArrowLeft, Calendar, Plus, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { InvestmentGrid } from "@/components/investment-grid";
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

// Mock data para o desafio específico
const mockChallenge = {
	id: "1",
	title: "Viagem para Europa",
	description: "Guardar dinheiro para uma viagem de sonho pela Europa",
	targetAmount: 500000,
	currency: "KZ",
	currentAmount: 180000,
	durationDays: 180,
	daysLeft: 120,
	progress: 36,
	dailyTarget: 2778,
	weeklyTarget: 19444,
	monthlyTarget: 83333,
	startDate: "2024-01-01",
	isActive: true,
};

export default function ChallengePage({ params }: { params: { id: string } }) {
	return (
		<div className="flex min-h-screen bg-background">
			<DashboardSidebar />

			<main className="flex-1 p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex items-center gap-4 mb-8">
						<Button variant="outline" size="icon" asChild>
							<Link href="/dashboard">
								<ArrowLeft className="h-4 w-4" />
							</Link>
						</Button>
						<div className="flex-1">
							<h1 className="font-playfair text-3xl font-bold mb-2">
								Desafio: {mockChallenge.title}
							</h1>
							<p className="text-muted-foreground">
								{mockChallenge.description}
							</p>
						</div>
						<Button className="stepcash-gradient">
							<Plus className="mr-2 h-4 w-4" />
							Adicionar Contribuição
						</Button>
					</div>

					{/* Resumo do Desafio */}
					<div className="grid md:grid-cols-4 gap-6 mb-8">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium flex items-center gap-2">
									<Target className="h-4 w-4" />
									Meta Total
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-primary">
									{mockChallenge.targetAmount.toLocaleString()}{" "}
									{mockChallenge.currency}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium flex items-center gap-2">
									<TrendingUp className="h-4 w-4" />
									Valor Acumulado
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-chart-3">
									{mockChallenge.currentAmount.toLocaleString()}{" "}
									{mockChallenge.currency}
								</div>
								<Progress value={mockChallenge.progress} className="mt-2" />
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									Tempo Restante
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{mockChallenge.daysLeft} dias
								</div>
								<p className="text-sm text-muted-foreground">
									de {mockChallenge.durationDays} dias totais
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">Progresso</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-primary">
									{mockChallenge.progress}%
								</div>
								<Badge variant="secondary" className="mt-2">
									{mockChallenge.isActive ? "Ativo" : "Pausado"}
								</Badge>
							</CardContent>
						</Card>
					</div>

					{/* Valores Sugeridos */}
					<Card className="mb-8">
						<CardHeader>
							<CardTitle>Valores Sugeridos para Alcançar a Meta</CardTitle>
							<CardDescription>
								Baseado no tempo restante e valor faltante
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="text-center p-4 bg-muted/50 rounded-lg">
									<div className="text-2xl font-bold text-primary mb-2">
										{mockChallenge.dailyTarget.toLocaleString()}{" "}
										{mockChallenge.currency}
									</div>
									<p className="text-sm text-muted-foreground">Por dia</p>
								</div>
								<div className="text-center p-4 bg-muted/50 rounded-lg">
									<div className="text-2xl font-bold text-primary mb-2">
										{mockChallenge.weeklyTarget.toLocaleString()}{" "}
										{mockChallenge.currency}
									</div>
									<p className="text-sm text-muted-foreground">Por semana</p>
								</div>
								<div className="text-center p-4 bg-muted/50 rounded-lg">
									<div className="text-2xl font-bold text-primary mb-2">
										{mockChallenge.monthlyTarget.toLocaleString()}{" "}
										{mockChallenge.currency}
									</div>
									<p className="text-sm text-muted-foreground">Por mês</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Tabela de Acompanhamento */}
					<Card>
						<CardHeader>
							<CardTitle>Tabela de Acompanhamento</CardTitle>
							<CardDescription>
								Marque seus investimentos diários para acompanhar o progresso
							</CardDescription>
						</CardHeader>
						<CardContent>
							<InvestmentGrid challengeId={mockChallenge.id} />
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
