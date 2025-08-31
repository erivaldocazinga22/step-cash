"use client";

import { Plus, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ListAllNewChallenge } from "@/@actions/challenges/list-all-challege.action";
import type { Challenge } from "@/lib/database/prisma/generated/prisma";
import { Button } from "./ui/button";

export function ChallengesList({ userId }: { userId: string }) {
	const [challenges, setChallenges] = useState<Challenge[]>([]);
	const [filter, setFilter] = useState<"all" | "active" | "inative">("all");

	useEffect(() => {
		(async () => {
			const result = await ListAllNewChallenge({ userId });
			if (result.ok) {
				setChallenges(result.data);
			} else {
				console.error(result.message);
			}
		})();
	}, [userId]);

	const filteredChallenges = challenges.filter((challenge) => {
		if (filter === "all") return true;
		return challenge.isActive ? "active" : "inative";
	});

	return (
		<div>
			<div className="flex gap-2 mb-6">
				<Button
					variant={filter === "all" ? "default" : "outline"}
					onClick={() => setFilter("all")}
					className={
						filter === "all"
							? "bg-green-600 hover:bg-green-700"
							: ""
					}
				>
					Todos
				</Button>
				<Button
					variant={filter === "active" ? "default" : "outline"}
					onClick={() => setFilter("active")}
					className={
						filter === "active"
							? "bg-green-600 hover:bg-green-700"
							: ""
					}
				>
					Ativos
				</Button>
				<Button
					variant={filter === "inative" ? "default" : "outline"}
					onClick={() => setFilter("inative")}
					className={
						filter === "inative"
							? "bg-green-600 hover:bg-green-700"
							: ""
					}
				>
					Concluídos
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredChallenges.length > 0 ? (
					filteredChallenges.map((challenge) => (
						<div key={challenge.id}>
							<pre>{JSON.stringify(challenge, null, 2)}</pre>
						</div>
					))
				) : (
					<div className="col-span-full text-center py-12">
						<Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
						<h3 className="text-lg font-medium mb-2">
							Nenhum desafio encontrado
						</h3>
						<p className="text-muted-foreground mb-4">
							{filter === "all"
								? "Você ainda não criou nenhum desafio financeiro."
								: `Não há desafios ${filter === "active" ? "ativos" : "concluídos"} no momento.`}
						</p>
						<Link href="/dashboard/challenges/new">
							<Button className="bg-green-600 hover:bg-green-700 text-white">
								<Plus className="w-4 h-4" />
								Criar Primeiro Desafio
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
