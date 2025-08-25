import {
	ArrowRight,
	Calendar,
	CheckCircle,
	Github,
	Mail,
	Phone,
	Target,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Layout/footer";
import { Header } from "@/components/Layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<div>
			<Header />

			<section className="py-20 px-4 h-[90vh] flex items-center justify-center">
				<div className="container mx-auto text-center">
					<Badge variant="secondary" className="mb-4">
						🎯 Transforme seus sonhos em realidade
					</Badge>
					<h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
						Poupar nunca foi tão simples
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Defina a sua meta financeira, escolha o tempo e siga
						pequenos passos até alcançá-la. Transforme o hábito de
						poupar em uma jornada motivadora.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="stepcash-gradient" asChild>
							<Link href="/dashboard">
								Começar Desafio{" "}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="#como-funciona">Ver Como Funciona</Link>
						</Button>
					</div>
				</div>
			</section>

			{/** biome-ignore lint/correctness/useUniqueElementIds: false */}
			<section id="como-funciona" className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
							Como Funciona
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Três passos simples para alcançar suas metas
							financeiras
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card className="text-center border-2 hover:border-primary/50 transition-colors">
							<CardHeader>
								<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
									<Target className="h-6 w-6 text-primary" />
								</div>
								<CardTitle>1. Escolha o Montante</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Defina quanto quer poupar em KZ, USD ou
									Reais. Seja realista com seus objetivos.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="text-center border-2 hover:border-primary/50 transition-colors">
							<CardHeader>
								<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
									<Calendar className="h-6 w-6 text-primary" />
								</div>
								<CardTitle>2. Escolha o Tempo</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Determine o prazo para alcançar sua meta. O
									sistema calculará valores diários, semanais
									e mensais.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="text-center border-2 hover:border-primary/50 transition-colors">
							<CardHeader>
								<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
									<TrendingUp className="h-6 w-6 text-primary" />
								</div>
								<CardTitle>3. Acompanhe o Progresso</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Use nossa tabela visual colorida para marcar
									seus investimentos e ver seu progresso em
									tempo real.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			<section className="py-20 px-4">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
							Visualize Seu Progresso
						</h2>
						<p className="text-lg text-muted-foreground">
							Sistema de cores intuitivo para acompanhar seus
							investimentos
						</p>
					</div>

					<Card className="max-w-4xl mx-auto">
						<CardHeader>
							<CardTitle className="text-center">
								Desafio: Guardar 100.000 KZ em 6 meses
							</CardTitle>
							<CardDescription className="text-center">
								Exemplo de tabela de acompanhamento semanal
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-7 gap-2 mb-6">
								{Array.from({ length: 28 }, (_, i) => (
									<div
										key={Math.random().toString(12)}
										className={`
                      h-12 rounded-lg flex items-center justify-center text-sm font-medium
                      ${i < 10 ? "progress-cell-green" : i < 20 ? "progress-cell-orange" : "progress-cell-red"}
                    `}
									>
										{i < 10 ? (
											<CheckCircle className="h-4 w-4" />
										) : (
											`${500 + i * 50}`
										)}
									</div>
								))}
							</div>

							<div className="flex justify-center space-x-8 text-sm">
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 rounded progress-cell-green"></div>
									<span>Valor Total Investido</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 rounded progress-cell-orange"></div>
									<span>Valor Parcial</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 rounded progress-cell-red"></div>
									<span>Não Investido</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Depoimento */}
			<section className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto text-center">
					<Card className="max-w-2xl mx-auto">
						<CardContent className="pt-6">
							<blockquote className="text-lg italic mb-4">
								"Com o StepCash, consegui guardar para minha
								primeira viagem em 6 meses. A visualização do
								progresso me manteve motivada todos os dias!"
							</blockquote>
							<cite className="text-primary font-medium">
								— Maria, Luanda
							</cite>
						</CardContent>
					</Card>
				</div>
			</section>

			{/** biome-ignore lint/correctness/useUniqueElementIds: false */}
			<section id="contato" className="py-20 px-4">
				<div className="container mx-auto">
					<div className="text-center mb-16">
						<h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
							Entre em Contato
						</h2>
						<p className="text-lg text-muted-foreground">
							Precisa de ajuda? Nossa equipe está aqui para apoiar
							sua jornada financeira
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<Card className="text-center">
							<CardHeader>
								<Mail className="h-8 w-8 text-primary mx-auto mb-2" />
								<CardTitle>Email</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									erivaldomalebo2206@gmail.com
								</p>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<Phone className="h-8 w-8 text-primary mx-auto mb-2" />
								<CardTitle>Telefone</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									957031922 / 932411958
								</p>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<Github className="h-8 w-8 text-primary mx-auto mb-2" />
								<CardTitle>GitHub</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									github/erivaldocazinga22
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
