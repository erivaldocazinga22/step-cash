"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateNewChallenge } from "@/@actions/challenges/create-new-challenge.action";
import {
	type CurrencyType,
	type NewChallengeInputValues,
	newChallengeSchema,
} from "@/@types/challenge.schema";
import { authClient } from "@/lib/better-auth/client";
import { formatCurrency } from "@/lib/format/format-currency";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface NewChallengeFormProps {
	template?: {
		title: string;
		description: string;
		currency: string;
		targetAmount: number;
		durationDays: number;
	};
}

export function NewChallengeForm({ template }: NewChallengeFormProps) {
	const { data: session } = authClient.useSession();
	const form = useForm({
		mode: "all",
		criteriaMode: "firstError",
		resolver: zodResolver(newChallengeSchema),
		defaultValues: {
			title: template?.title ?? "",
			description: template?.description ?? "",
			currency: (template?.currency as CurrencyType) ?? "KZ",
			durationDays: template?.durationDays ?? 1,
			targetAmount: template?.targetAmount ?? 0,
		},
	});
	const router = useRouter();
	const onSubmit = async (formData: NewChallengeInputValues) => {
		if (!session) {
			toast.error("Sessão não existe");
			return;
		}
		const result = await CreateNewChallenge({
			title: formData.title,
			description: formData.description,
			targetAmount: formData.targetAmount,
			currency: formData.currency,
			durationDays: formData.durationDays,
			isActive: formData.isActive,
			userId: session.user.id,
		});

		if (!result.ok) {
			toast.error(`${result.message}`);
			console.log({ id: session.user.id, errors: result });

			return;
		}

		toast.success("✅ Challenge criado:", result.data);
		router.replace("/dashboard/challenges");
	};

	const targetAmountWatch = form.watch("targetAmount");
	const currencies = ["KZ", "USD", "BRL"];

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-1 md:grid-cols-2 gap-4"
			>
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Título *</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Fundo de Emergência"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="description"
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Descreva o objetivo..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="targetAmount"
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Valor Meta *</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Ex: 500000"
									{...field}
									onChange={(e) =>
										field.onChange(Number(e.target.value))
									}
								/>
							</FormControl>
							{targetAmountWatch > 0 && (
								<p className="text-sm text-muted-foreground">
									Meta:
									{formatCurrency(String(targetAmountWatch))}
								</p>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="currency"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Moeda *</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecione a moeda" />
									</SelectTrigger>
									<SelectContent>
										{currencies.map((c) => (
											<SelectItem key={c} value={c}>
												{c}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="durationDays"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duração (dias) *</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Ex: 30"
									{...field}
									onChange={(e) =>
										field.onChange(Number(e.target.value))
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-3 pt-4 col-span-2">
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						className="bg-green-600 hover:bg-green-700 text-white flex-1"
					>
						{form.formState.isSubmitting
							? "Criando..."
							: "Criar Desafio"}
					</Button>
					<Link href="/dashboard/challenges">
						<Button type="button" variant="outline">
							Cancelar
						</Button>
					</Link>
				</div>
			</form>
		</Form>
	);
}
