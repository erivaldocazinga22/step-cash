import {
	ArrowLeft,
	Eye,
	Github,
	Lock,
	Mail,
	Phone,
	Shield,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function PoliciesPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center">
					<Button
						variant="ghost"
						size="icon"
						asChild
						className="mr-4"
					>
						<Link href="/">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<h1 className="font-playfair text-xl font-bold">
						Políticas da Plataforma
					</h1>
				</div>
			</header>

			<main className="container mx-auto py-12 px-4 max-w-4xl">
				{/* Introdução */}
				<div className="text-center mb-12">
					<h1 className="font-playfair text-4xl font-bold mb-4">
						Políticas de Privacidade
					</h1>
					<p className="text-lg text-muted-foreground">
						StepCash - Transparência e conformidade legal para
						Angola
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						Última atualização: Janeiro de 2024
					</p>
				</div>

				<div className="space-y-8">
					{/* Coleta de Dados */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Eye className="h-5 w-5 text-primary" />
								1. Coleta de Dados
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								Recolhemos apenas informações necessárias para o
								funcionamento da plataforma:
							</p>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground">
								<li>Nome completo e endereço de email</li>
								<li>
									Informações de login social (Google, GitHub,
									Microsoft)
								</li>
								<li>
									Dados dos desafios financeiros criados por
									você
								</li>
								<li>
									Histórico de investimentos e progresso das
									metas
								</li>
							</ul>
							<div className="bg-primary/10 p-4 rounded-lg">
								<p className="text-sm">
									<strong>Compromisso:</strong> Não vendemos
									nem partilhamos dados com terceiros sem
									consentimento explícito.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Uso dos Dados */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="h-5 w-5 text-primary" />
								2. Uso dos Dados
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								Os seus dados são utilizados exclusivamente
								para:
							</p>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground">
								<li>Autenticação e gestão da sua conta</li>
								<li>
									Criação e acompanhamento de desafios
									financeiros
								</li>
								<li>
									Cálculo de metas e progresso personalizado
								</li>
								<li>
									Melhoria contínua da experiência do usuário
								</li>
								<li>
									Comunicação sobre atualizações importantes
									da plataforma
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Armazenamento e Segurança */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Lock className="h-5 w-5 text-primary" />
								3. Armazenamento e Segurança
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								A segurança dos seus dados é nossa prioridade:
							</p>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground">
								<li>
									Dados armazenados em servidores seguros com
									criptografia
								</li>
								<li>
									Acesso restrito apenas a pessoal autorizado
								</li>
								<li>
									Backups regulares para prevenir perda de
									dados
								</li>
								<li>Monitoramento contínuo de segurança</li>
								<li>
									Conformidade com padrões internacionais de
									proteção
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Direitos do Usuário */}
					<Card>
						<CardHeader>
							<CardTitle>4. Direitos do Usuário</CardTitle>
							<CardDescription>
								Baseado na Lei de Proteção de Dados de Angola
								(Lei n.º 22/11)
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>Como usuário da StepCash, você tem direito a:</p>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<h4 className="font-medium">
										Acesso aos Dados
									</h4>
									<p className="text-sm text-muted-foreground">
										Solicitar uma cópia de todos os dados
										que temos sobre você
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">Correção</h4>
									<p className="text-sm text-muted-foreground">
										Atualizar ou corrigir informações
										incorretas
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">Exclusão</h4>
									<p className="text-sm text-muted-foreground">
										Solicitar a remoção completa dos seus
										dados
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">
										Portabilidade
									</h4>
									<p className="text-sm text-muted-foreground">
										Exportar seus dados em formato legível
									</p>
								</div>
							</div>
							<div className="bg-chart-3/10 p-4 rounded-lg">
								<p className="text-sm">
									<strong>Tempo de Resposta:</strong>{" "}
									Comprometemo-nos a responder a pedidos em
									até 30 dias úteis.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Consentimento */}
					<Card>
						<CardHeader>
							<CardTitle>5. Consentimento</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								Ao usar a plataforma StepCash, você concorda com
								esta política de privacidade. O consentimento
								pode ser retirado a qualquer momento através do
								seu perfil ou entrando em contato conosco.
							</p>
							<p className="text-sm text-muted-foreground">
								Notificaremos sobre mudanças significativas
								nesta política através do email cadastrado na
								sua conta.
							</p>
						</CardContent>
					</Card>

					{/* Contato Legal */}
					<Card>
						<CardHeader>
							<CardTitle>6. Contato Legal</CardTitle>
							<CardDescription>
								Para questões relacionadas à privacidade e
								proteção de dados
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="flex items-center space-x-3">
									<Mail className="h-5 w-5 text-primary" />
									<div>
										<p className="font-medium">Email</p>
										<p className="text-sm text-muted-foreground">
											erivaldomalebo2206@gmail.com
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<Phone className="h-5 w-5 text-primary" />
									<div>
										<p className="font-medium">Telefone</p>
										<p className="text-sm text-muted-foreground">
											957031922 / 932411958
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<Github className="h-5 w-5 text-primary" />
									<div>
										<p className="font-medium">GitHub</p>
										<p className="text-sm text-muted-foreground">
											github/erivaldocazinga22
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Footer da Página */}
				<div className="mt-12 pt-8 border-t text-center">
					<p className="text-sm text-muted-foreground mb-4">
						Esta política está em conformidade com a legislação
						angolana de proteção de dados.
					</p>
					<Button asChild>
						<Link href="/dashboard">Voltar ao Dashboard</Link>
					</Button>
				</div>
			</main>
		</div>
	);
}
