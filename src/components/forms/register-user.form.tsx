"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/better-auth/client";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
		email: z.string().email({ message: "Informe um e-mail válido" }),
		password: z
			.string()
			.min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
		confirmPassword: z
			.string()
			.min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export type RegisterSchemaValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
	const router = useRouter();
	const form = useForm<RegisterSchemaValues>({
		mode: "onChange",
		criteriaMode: "firstError",
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (formData: RegisterSchemaValues) => {
		try {
			const { data, error } = await authClient.signUp.email(
				{
					name: formData.name,
					email: formData.email,
					password: formData.password,
				},
				{
					onRequest: (ctx) => {
						console.log("ON_REQUEST", { ctx });
					},
					onSuccess: (ctx) => {
						console.log("ON_SUCCESS", { ctx });
						router.replace("/");
					},
					onError: (ctx) => {
						// display the error message
						toast.error(ctx.error.message);
					},
				},
			);

			if (error) {
				toast.error(
					error.message || "Erro ao criar conta. Tente novamente.",
				);
				return;
			}

			toast.success("Conta criada com sucesso! 🎉", {
				description: data.token,
			});
		} catch (err) {
			console.error(err);
			toast.error("Erro inesperado. Tente novamente.");
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Ex: João Silva"
									autoComplete="name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="seu@email.com"
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
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
					name="confirmPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirmar senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Repita sua senha"
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
							<span>Cadastrando...</span>
						</div>
					) : (
						"Cadastrar"
					)}
				</Button>
			</form>
		</Form>
	);
}