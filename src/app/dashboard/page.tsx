import {
	Calendar,
	Edit,
	Eye,
	Plus,
	Target,
	Trash2,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";
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

// Mock data - em produção viria do banco de dados
const mockChallenges = [
	{
		id: "1",
		title: "Viagem para Europa",
		targetAmount: 500000,
		currency: "KZ",
		currentAmount: 180000,
		durationDays: 180,
		daysLeft: 120,
		progress: 36,
		isActive: true,
	},
	{
		id: "2",
		title: "Novo Laptop",
		targetAmount: 2500,
		currency: "USD",
		currentAmount: 1200,
		durationDays: 90,
		daysLeft: 45,
		progress: 48,
		isActive: true,
	},
	{
		id: "3",
		title: "Reserva de Emergência",
		targetAmount: 1000000,
		currency: "KZ",
		currentAmount: 750000,
		durationDays: 365,
		daysLeft: 200,
		progress: 75,
		isActive: true,
	},
];

export default function DashboardPage() {
	const totalAccumulated = mockChallenges.reduce(
		(sum, challenge) => sum + challenge.currentAmount,
		0,
	);
	const averageProgress = Math.round(
		mockChallenges.reduce((sum, challenge) => sum + challenge.progress, 0) /
			mockChallenges.length,
	);
	const activeChallenges = mockChallenges.filter((c) => c.isActive).length;

	return (
		<main className="flex-1 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="font-playfair text-3xl font-bold mb-2">
							Olá, Erivaldo 👋
						</h1>
						<p className="text-muted-foreground">
							Acompanhe o progresso dos seus desafios financeiros
						</p>
					</div>
					<Button className="stepcash-gradient" asChild>
						<Link href="/dashboard/challenges/new">
							<Plus className="h-4 w-4" />
							Novo Desafio
						</Link>
					</Button>
				</div>

				{/* Cards de Resumo */}
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Acumulado
							</CardTitle>
							<TrendingUp className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-primary">
								{totalAccumulated.toLocaleString()} KZ
							</div>
							<p className="text-xs text-muted-foreground">
								Soma de todos os desafios ativos
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Progresso Médio
							</CardTitle>
							<Target className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-primary">
								{averageProgress}%
							</div>
							<Progress
								value={averageProgress}
								className="mt-2"
							/>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Desafios Ativos
							</CardTitle>
							<Calendar className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-primary">
								{activeChallenges}
							</div>
							<p className="text-xs text-muted-foreground">
								Metas em andamento
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Lista de Desafios */}
				<div>
					<h2 className="font-playfair text-2xl font-bold mb-6">
						Seus Desafios
					</h2>
					<div className="grid gap-6">
						{mockChallenges.map((challenge) => (
							<Card
								key={challenge.id}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="flex items-center gap-2">
												{challenge.title}
												{challenge.isActive && (
													<Badge
														variant="secondary"
														className="bg-primary/10 text-primary"
													>
														Ativo
													</Badge>
												)}
											</CardTitle>
											<CardDescription>
												Meta:{" "}
												{challenge.targetAmount.toLocaleString()}{" "}
												{challenge.currency} em{" "}
												{challenge.durationDays} dias
											</CardDescription>
										</div>
										<div className="flex space-x-2">
											<Button
												variant="outline"
												size="sm"
												asChild
											>
												<Link
													href={`/dashboard/challenges/${challenge.id}`}
												>
													<Eye className="h-4 w-4" />
												</Link>
											</Button>
											<Button variant="outline" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="outline" size="sm">
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex justify-between text-sm">
											<span>
												Progresso:{" "}
												{challenge.currentAmount.toLocaleString()}{" "}
												{challenge.currency}
											</span>
											<span>
												{challenge.progress}% concluído
											</span>
										</div>
										<Progress
											value={challenge.progress}
											className="h-2"
										/>
										<div className="flex justify-between text-sm text-muted-foreground">
											<span>
												{challenge.daysLeft} dias
												restantes
											</span>
											<span>
												Faltam:{" "}
												{(
													challenge.targetAmount -
													challenge.currentAmount
												).toLocaleString()}{" "}
												{challenge.currency}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
