"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/client";
import { Button } from "./ui/button";

export function DeleteAccount() {
	const router = useRouter();
	const handleDelete = async () => {
		try {
			await authClient.deleteUser();
			toast.success("Conta deletada com sucesso!");
			router.replace("/");
		} catch (err) {
			console.error(err);
			toast.error("Erro ao deletar conta.");
		}
	};

	return (
		<div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
			<div>
				<h4 className="font-medium text-destructive">
					Desativar Conta
				</h4>
				<p className="text-sm text-muted-foreground">
					Desative temporariamente sua conta
				</p>
			</div>
			<Button variant="destructive" size="sm" onClick={handleDelete}>
				<Trash2 className="mr-2 h-4 w-4" />
				Desativar
			</Button>
		</div>
	);
}
