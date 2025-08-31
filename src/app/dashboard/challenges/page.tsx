import { Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { ChallengesList } from "@/components/challeges-list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/better-auth";

export default async function ChallengesPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="font-playfair text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
						Meus Desafios
					</h1>
					<p className="text-muted-foreground">
						Acompanhe o progresso dos seus objetivos financeiros e
						mantenha-se motivado.
					</p>
				</div>
				<Link href="/dashboard/challenges/new">
					<Button className="bg-green-600 hover:bg-green-700 text-white">
						<Plus className="w-4 h-4 mr-2" />
						Novo Desafio
					</Button>
				</Link>
			</div>

			{session?.user ? (
				<ChallengesList userId={session.user.id} />
			) : (
				<div>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)}
		</div>
	);
}
