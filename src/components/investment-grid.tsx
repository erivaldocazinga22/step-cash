"use client";

import { AlertCircle, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface InvestmentGridProps {
	challengeId: string;
}

// Mock data para os investimentos (em produção viria do banco)
const mockInvestments = Array.from({ length: 42 }, (_, i) => ({
	day: i + 1,
	targetAmount: 2778,
	investedAmount: i < 15 ? 2778 : i < 25 ? Math.floor(2778 * 0.6) : 0,
	status: i < 15 ? "complete" : i < 25 ? "partial" : "pending",
}));

export function InvestmentGrid({ challengeId }: InvestmentGridProps) {
	const [investments, setInvestments] = useState(mockInvestments);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "complete":
				return "progress-cell-green";
			case "partial":
				return "progress-cell-orange";
			default:
				return "progress-cell-red";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "complete":
				return <CheckCircle className="h-4 w-4" />;
			case "partial":
				return <AlertCircle className="h-4 w-4" />;
			default:
				return <Circle className="h-4 w-4" />;
		}
	};

	return (
		<div className="space-y-6">
			{/* Legenda */}
			<div className="flex flex-wrap gap-4 justify-center">
				<div className="flex items-center space-x-2">
					<div className="w-4 h-4 rounded progress-cell-green"></div>
					<span className="text-sm">Valor Total Investido</span>
				</div>
				<div className="flex items-center space-x-2">
					<div className="w-4 h-4 rounded progress-cell-orange"></div>
					<span className="text-sm">Valor Parcial</span>
				</div>
				<div className="flex items-center space-x-2">
					<div className="w-4 h-4 rounded progress-cell-red"></div>
					<span className="text-sm">Não Investido</span>
				</div>
			</div>

			{/* Grid de Investimentos */}
			<div className="grid grid-cols-7 gap-2">
				{investments.map((investment) => (
					<Button
						key={investment.day}
						variant="outline"
						className={`
              h-16 p-2 flex flex-col items-center justify-center text-xs font-medium
              ${getStatusColor(investment.status)}
              hover:opacity-80 transition-opacity
            `}
						onClick={() => {
							// Aqui seria aberto um modal para editar o investimento
							console.log(
								`Editar investimento do dia ${investment.day}`,
							);
						}}
					>
						<div className="flex items-center justify-center mb-1">
							{getStatusIcon(investment.status)}
						</div>
						<span>Dia {investment.day}</span>
						<span className="text-xs opacity-75">
							{investment.investedAmount > 0
								? `${investment.investedAmount.toLocaleString()}`
								: `${investment.targetAmount.toLocaleString()}`}
						</span>
					</Button>
				))}
			</div>

			{/* Estatísticas */}
			<div className="grid md:grid-cols-3 gap-4 mt-6">
				<div className="text-center p-4 bg-chart-3/10 rounded-lg">
					<div className="text-2xl font-bold text-chart-3 mb-1">
						{
							investments.filter((i) => i.status === "complete")
								.length
						}
					</div>
					<p className="text-sm text-muted-foreground">
						Dias Completos
					</p>
				</div>
				<div className="text-center p-4 bg-chart-2/10 rounded-lg">
					<div className="text-2xl font-bold text-chart-2 mb-1">
						{
							investments.filter((i) => i.status === "partial")
								.length
						}
					</div>
					<p className="text-sm text-muted-foreground">
						Dias Parciais
					</p>
				</div>
				<div className="text-center p-4 bg-chart-1/10 rounded-lg">
					<div className="text-2xl font-bold text-chart-1 mb-1">
						{
							investments.filter((i) => i.status === "pending")
								.length
						}
					</div>
					<p className="text-sm text-muted-foreground">
						Dias Pendentes
					</p>
				</div>
			</div>
		</div>
	);
}
