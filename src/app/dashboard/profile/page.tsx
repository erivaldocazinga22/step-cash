import { ArrowLeft, Camera, Save } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { ChangeAvatarUser } from "@/components/change-avatar-user";
import { ChangePassword } from "@/components/change-password";
import { DeleteAccount } from "@/components/delete-account";
import { NotificationPreferences } from "@/components/notification-preferences";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { auth } from "@/lib/better-auth";

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<main className="flex-1 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex items-center gap-4 mb-8">
					<Button variant="outline" size="icon" asChild>
						<Link href="/dashboard">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<h1 className="font-playfair text-3xl font-bold mb-2">
							Perfil do Usuário
						</h1>
						<p className="text-muted-foreground">
							Gerencie suas informações pessoais e preferências
						</p>
					</div>
				</div>

				<div className="grid gap-6">
					{/* Informações Pessoais */}
					<Card>
						<CardHeader>
							<CardTitle>Informações Pessoais</CardTitle>
							<CardDescription>
								Atualize suas informações básicas de perfil
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<ChangeAvatarUser />

							{/* Campos do Formulário */}
							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name">Nome Completo</Label>
									<Input
										id="name"
										defaultValue={`${session?.user.name}`}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										defaultValue={session?.user.email}
										disabled
									/>
									<p className="text-xs text-muted-foreground">
										Email não pode ser alterado
									</p>
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="phone">Telefone</Label>
									<Input
										id="phone"
										defaultValue="957031922"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="currency">
										Moeda Padrão
									</Label>
									<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
										<option value="KZ">Kwanza (KZ)</option>
										<option value="USD">Dólar (USD)</option>
										<option value="BRL">Real (BRL)</option>
									</select>
								</div>
							</div>

							<Button className="stepcash-gradient">
								<Save className="mr-2 h-4 w-4" />
								Salvar Alterações
							</Button>
						</CardContent>
					</Card>

					<NotificationPreferences />

					{/* Estatísticas da Conta */}
					<Card>
						<CardHeader>
							<CardTitle>Estatísticas da Conta</CardTitle>
							<CardDescription>
								Resumo da sua atividade na plataforma
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-3 gap-4">
								<div className="text-center p-4 bg-primary/10 rounded-lg">
									<div className="text-2xl font-bold text-primary mb-1">
										3
									</div>
									<p className="text-sm text-muted-foreground">
										Desafios Criados
									</p>
								</div>
								<div className="text-center p-4 bg-chart-3/10 rounded-lg">
									<div className="text-2xl font-bold text-chart-3 mb-1">
										1
									</div>
									<p className="text-sm text-muted-foreground">
										Metas Alcançadas
									</p>
								</div>
								<div className="text-center p-4 bg-chart-2/10 rounded-lg">
									<div className="text-2xl font-bold text-chart-2 mb-1">
										45
									</div>
									<p className="text-sm text-muted-foreground">
										Dias Ativos
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Ações da Conta */}
					<Card>
						<CardHeader>
							<CardTitle>Ações da Conta</CardTitle>
							<CardDescription>
								Gerencie sua conta e dados
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between p-4 border rounded-lg">
								<div>
									<h4 className="font-medium">
										Exportar Dados
									</h4>
									<p className="text-sm text-muted-foreground">
										Baixe uma cópia de todos os seus dados
									</p>
								</div>
								<Button variant="outline">Exportar</Button>
							</div>

							<ChangePassword />
							<DeleteAccount />
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
