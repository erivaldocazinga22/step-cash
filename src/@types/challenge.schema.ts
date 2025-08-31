import { z } from "zod";

export const newChallengeSchema = z.object({
	title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
	description: z.string().optional(),
	targetAmount: z.number().positive("O valor alvo deve ser maior que zero"),
	currency: z.enum(["KZ", "USD", "BRL"], {
		error: "Moeda obrigatória",
	}),
	durationDays: z
		.number()
		.int()
		.positive("A duração deve ser em dias positivos"),
	isActive: z.boolean().default(true),
});

export const newChallengeWithUserIdSchema = newChallengeSchema.extend({
	userId: z.nanoid({ message: "ID do usuário inválido" }),
});

export type NewChallengeInputValues = z.infer<typeof newChallengeSchema>;
export type NewChallengeWithUserIdInputValues = z.infer<
	typeof newChallengeWithUserIdSchema
>;
export type CurrencyType = NewChallengeInputValues["currency"];
