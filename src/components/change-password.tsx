"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	type ChangePasswordInput,
	changePasswordSchema,
} from "@/@types/change-password.schema";
import { authClient } from "@/lib/better-auth/client";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export function ChangePassword() {
	const [view, setView] = useState(false);

	const form = useForm<ChangePasswordInput>({
		resolver: zodResolver(changePasswordSchema),
		mode: "onBlur",
		criteriaMode: "firstError",
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const onSubmit = async (formData: ChangePasswordInput) => {
		try {
			await authClient.changePassword({
				currentPassword: formData.currentPassword,
				newPassword: formData.newPassword,
				revokeOtherSessions: true,
			});
			alert("Senha alterada com sucesso!");
			setView(false);
			form.reset();
		} catch (err) {
			console.error(err);
			form.setError("currentPassword", {
				message: "Senha atual incorreta ou erro no servidor",
			});
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between p-4 border rounded-lg">
				<div>
					<h4 className="font-medium">Alterar Senha</h4>
					<p className="text-sm text-muted-foreground">
						Atualize sua senha de acesso
					</p>
				</div>
				<Button
					variant="outline"
					onClick={() => setView((prev) => !prev)}
				>
					{view ? "Cancelar" : "Alterar"}
				</Button>
			</div>

			{view && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 my-8 px-4"
					>
						<FormField
							name="currentPassword"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha atual</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Digite sua senha atual"
											autoComplete="current-password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="newPassword"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nova senha</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Mínimo de 8 caracteres"
											autoComplete="new-password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="confirmNewPassword"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar nova senha</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Repita sua nova senha"
											autoComplete="new-password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full dark:text-white bg-green-600 hover:bg-green-700"
						>
							{form.formState.isSubmitting ? (
								<div className="flex items-center">
									<Loader2 className="mr-2 animate-spin inline-block" />
									<span>Alterando...</span>
								</div>
							) : (
								"Alterar senha"
							)}
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
}
