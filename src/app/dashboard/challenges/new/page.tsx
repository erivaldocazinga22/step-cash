"use client";

import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";
import { NewChallengeForm } from "@/components/forms/new-challenge.form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

/* const challengeTemplates = [
	{
		title: "Fundo de Emergência",
		description: "Reserve de 3 a 6 meses de despesas para emergências",
		currency: "KZ",
		targetAmount: 300_000,
		durationDays: 30,
	},
	{
		title: "Viagem dos Sonhos",
		description: "Economize para aquela viagem que sempre sonhou",
		currency: "USD",
		targetAmount: 500_000,
		durationDays: 60,
	},
	{
		title: "Novo Smartphone",
		description: "Troque seu celular sem comprometer o orçamento",
		currency: "BRL",
		targetAmount: 200_000,
		durationDays: 30,
	},
]; */

export default function NewChallengePage() {
	/* const [selectedTemplate, setSelectedTemplate] = useState<
		(typeof challengeTemplates)[0] | null
	>(null); */
	/* const defaultValues: Partial<NewChallengeInputValues> = {
		title: selectedTemplate?.title ?? "",
		description: selectedTemplate?.description ?? "",
		currency: (selectedTemplate?.currency as CurrencyType) ?? "KZ",
		targetAmount: selectedTemplate?.targetAmount ?? 0,
		durationDays: selectedTemplate?.durationDays ?? 1,
		isActive: true,
	}; */

	/* const handleTemplateSelect = (template: (typeof challengeTemplates)[0]) => {
		setSelectedTemplate(template);
	}; */

	return (
		<div className="py-8">
			<div className="flex items-center gap-4 mb-8 px-4 pb-4">
				<Link href="/dashboard/challenges">
					<Button variant="outline" size="sm">
						<ArrowLeft className="w-4 h-4" />
						Voltar
					</Button>
				</Link>
				<div>
					<h1 className="font-playfair text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
						Novo Desafio Financeiro
					</h1>
					<p className="text-muted-foreground">
						Defina uma meta financeira e acompanhe seu progresso até
						alcançá-la.
					</p>
				</div>
			</div>

			<section className="max-w-5xl mx-auto px-4">
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Formulário */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Target className="w-5 h-5 text-green-600" />
									Detalhes do Desafio
								</CardTitle>
								<CardDescription>
									Preencha as informações do seu novo objetivo
									financeiro.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<NewChallengeForm />
							</CardContent>
						</Card>
					</div>

					{/* Templates e Dicas */}
					<div className="space-y-6">
						{/* <Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Sparkles className="w-5 h-5 text-green-600" />
									Templates Populares
								</CardTitle>
								<CardDescription>
									Use um modelo pronto para começar
									rapidamente.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								{challengeTemplates.map((template) => (
									// biome-ignore lint/a11y/noStaticElementInteractions: false
									// biome-ignore lint/a11y/useKeyWithClickEvents: false
									<div
										key={template.title}
										className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
										onClick={() =>
											handleTemplateSelect(template)
										}
									>
										<h4 className="font-medium text-sm mb-1">
											{template.title}
										</h4>
										<p className="text-xs text-muted-foreground mb-2">
											{template.description}
										</p>
										<div className="flex justify-between items-center">
											<span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
												{template.currency}
											</span>
											<span className="text-xs font-medium text-green-600">
												{formatCurrency(
													template.targetAmount.toString(),
												)}
											</span>
										</div>
									</div>
								))}
							</CardContent>
						</Card> */}

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									💡 Dicas
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 text-sm">
								<div>
									<h4 className="font-medium text-green-600">
										Seja Específico
									</h4>
									<p className="text-muted-foreground">
										Defina metas claras e valores exatos
										para manter o foco.
									</p>
								</div>
								<div>
									<h4 className="font-medium text-green-600">
										Prazo Realista
									</h4>
									<p className="text-muted-foreground">
										Estabeleça datas alcançáveis para manter
										a motivação.
									</p>
								</div>
								<div>
									<h4 className="font-medium text-green-600">
										Acompanhe Regularmente
									</h4>
									<p className="text-muted-foreground">
										Registre seu progresso semanalmente para
										melhores resultados.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
