"use client";
import { useTheme } from "next-themes";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

export function NotificationPreferences() {
	const { theme, setTheme } = useTheme();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Preferências</CardTitle>
				<CardDescription>
					Configure suas preferências de notificação e privacidade
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Notificações por Email</Label>
						<p className="text-sm text-muted-foreground">
							Receber lembretes sobre seus desafios
						</p>
					</div>
					<Switch defaultChecked />
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Notificações Push</Label>
						<p className="text-sm text-muted-foreground">
							Receber notificações no navegador
						</p>
					</div>
					<Switch />
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Relatórios Semanais</Label>
						<p className="text-sm text-muted-foreground">
							Receber resumo semanal do progresso
						</p>
					</div>
					<Switch defaultChecked />
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label>Modo de Aparência</Label>
						<p className="text-sm text-muted-foreground">
							Escolha claro, escuro ou seguir o sistema
						</p>
					</div>

					<Select
						value={theme}
						onValueChange={(value) => setTheme(value)}
					>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Selecione" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Claro</SelectItem>
							<SelectItem value="dark">Escuro</SelectItem>
							<SelectItem value="system">Automático</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
}
