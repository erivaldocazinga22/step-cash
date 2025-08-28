"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, CalendarIcon, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const categories = [
	"Emergência",
	"Viagem",
	"Tecnologia",
	"Educação",
	"Saúde",
	"Casa",
	"Investimento",
	"Lazer",
	"Outros",
];

const challengeTemplates = [
	{
		title: "Fundo de Emergência",
		description: "Reserve de 3 a 6 meses de despesas para emergências",
		category: "Emergência",
		suggestedAmount: 300000,
	},
	{
		title: "Viagem dos Sonhos",
		description: "Economize para aquela viagem que sempre sonhou",
		category: "Viagem",
		suggestedAmount: 500000,
	},
	{
		title: "Novo Smartphone",
		description: "Troque seu celular sem comprometer o orçamento",
		category: "Tecnologia",
		suggestedAmount: 200000,
	},
];

export default function NewChallengePage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		targetAmount: "",
		category: "",
		endDate: undefined as Date | undefined,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simular criação do desafio
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Redirecionar para a lista de desafios
		router.push("/dashboard/challenges");
	};

	const handleTemplateSelect = (template: (typeof challengeTemplates)[0]) => {
		setFormData({
			...formData,
			title: template.title,
			description: template.description,
			category: template.category,
			targetAmount: template.suggestedAmount.toString(),
		});
	};

	const formatCurrency = (value: string) => {
		const numericValue = value.replace(/\D/g, "");
		if (!numericValue) return "";

		return new Intl.NumberFormat("pt-AO", {
			style: "currency",
			currency: "AOA",
			minimumFractionDigits: 0,
		}).format(Number.parseInt(numericValue));
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex items-center gap-4 mb-8">
				<Link href="/dashboard/challenges">
					<Button variant="outline" size="sm">
						<ArrowLeft className="w-4 h-4 mr-2" />
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
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Título */}
								<div className="space-y-2">
									<Label htmlFor="title">
										Título do Desafio *
									</Label>
									<Input
										id="title"
										placeholder="Ex: Fundo de Emergência"
										value={formData.title}
										onChange={(e) =>
											setFormData({
												...formData,
												title: e.target.value,
											})
										}
										required
									/>
								</div>

								{/* Descrição */}
								<div className="space-y-2">
									<Label htmlFor="description">
										Descrição
									</Label>
									<Textarea
										id="description"
										placeholder="Descreva o objetivo deste desafio..."
										value={formData.description}
										onChange={(e) =>
											setFormData({
												...formData,
												description: e.target.value,
											})
										}
										rows={3}
									/>
								</div>

								{/* Valor Meta */}
								<div className="space-y-2">
									<Label htmlFor="targetAmount">
										Valor Meta (AOA) *
									</Label>
									<Input
										id="targetAmount"
										placeholder="Ex: 500.000"
										value={formData.targetAmount}
										onChange={(e) => {
											const numericValue =
												e.target.value.replace(
													/\D/g,
													"",
												);
											setFormData({
												...formData,
												targetAmount: numericValue,
											});
										}}
										required
									/>
									{formData.targetAmount && (
										<p className="text-sm text-muted-foreground">
											Meta:{" "}
											{formatCurrency(
												formData.targetAmount,
											)}
										</p>
									)}
								</div>

								{/* Categoria */}
								<div className="space-y-2">
									<Label>Categoria *</Label>
									<Select
										value={formData.category}
										onValueChange={(value) =>
											setFormData({
												...formData,
												category: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Selecione uma categoria" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category}
													value={category}
												>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Data Limite */}
								<div className="space-y-2">
									<Label>Data Limite</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													"w-full justify-start text-left font-normal",
													!formData.endDate &&
														"text-muted-foreground",
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{formData.endDate
													? format(
															formData.endDate,
															"PPP",
															{ locale: ptBR },
														)
													: "Selecione uma data"}
											</Button>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={formData.endDate}
												onSelect={(date) =>
													setFormData({
														...formData,
														endDate: date,
													})
												}
												disabled={(date) =>
													date < new Date()
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>

								{/* Botões */}
								<div className="flex gap-3 pt-4">
									<Button
										type="submit"
										disabled={
											isSubmitting ||
											!formData.title ||
											!formData.targetAmount ||
											!formData.category
										}
										className="bg-green-600 hover:bg-green-700 text-white flex-1"
									>
										{isSubmitting
											? "Criando..."
											: "Criar Desafio"}
									</Button>
									<Link href="/dashboard/challenges">
										<Button type="button" variant="outline">
											Cancelar
										</Button>
									</Link>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>

				{/* Templates Sugeridos */}
				<div>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Sparkles className="w-5 h-5 text-green-600" />
								Templates Populares
							</CardTitle>
							<CardDescription>
								Use um modelo pronto para começar rapidamente.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							{challengeTemplates.map((template, index) => (
								<div
									key={index}
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
											{template.category}
										</span>
										<span className="text-xs font-medium text-green-600">
											{formatCurrency(
												template.suggestedAmount.toString(),
											)}
										</span>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Dicas */}
					<Card className="mt-6">
						<CardHeader>
							<CardTitle className="text-lg">💡 Dicas</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 text-sm">
							<div>
								<h4 className="font-medium text-green-600">
									Seja Específico
								</h4>
								<p className="text-muted-foreground">
									Defina metas claras e valores exatos para
									manter o foco.
								</p>
							</div>
							<div>
								<h4 className="font-medium text-green-600">
									Prazo Realista
								</h4>
								<p className="text-muted-foreground">
									Estabeleça datas alcançáveis para manter a
									motivação.
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
		</div>
	);
}
