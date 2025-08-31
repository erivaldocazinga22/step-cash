// src/utils/challenge.utils.ts
import { Badge } from "@/components/ui/badge";

// Retorna a cor/progresso da barra
export function getProgressColor(progress: number): string {
	if (progress < 40) return "bg-red-500";
	if (progress < 70) return "bg-yellow-500";
	return "bg-green-600";
}

// Retorna o badge de status
export function getStatusBadge(status: string) {
	switch (status) {
		case "active":
			return (
				<Badge
					variant="outline"
					className="text-green-600 border-green-600"
				>
					Ativo
				</Badge>
			);
		case "completed":
			return (
				<Badge
					variant="outline"
					className="text-blue-600 border-blue-600"
				>
					Concluído
				</Badge>
			);
		case "expired":
			return (
				<Badge
					variant="outline"
					className="text-red-600 border-red-600"
				>
					Expirado
				</Badge>
			);
		default:
			return (
				<Badge
					variant="outline"
					className="text-gray-600 border-gray-600"
				>
					Desconhecido
				</Badge>
			);
	}
}

// Calcula progresso em porcentagem
export function calculateProgress(current: number, target: number) {
	if (!target || target <= 0) return 0;
	return Math.min((current / target) * 100, 100);
}

// Calcula a data final com base na duração
export function calculateEndDate(startDate: Date, durationDays: number) {
	const end = new Date(startDate);
	end.setDate(end.getDate() + durationDays);
	return end;
}
