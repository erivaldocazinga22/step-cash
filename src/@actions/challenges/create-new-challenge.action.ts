"use server";

import {
	type NewChallengeWithUserIdInputValues,
	newChallengeWithUserIdSchema,
} from "@/@types/challenge.schema";
import { prisma } from "@/lib/database/prisma/prisma.client";

/**
 * Tipo de retorno padronizado para consumir no front
 */
export type CreateChallengeResponse =
	| {
			ok: true;
			message: string;
			data: Awaited<ReturnType<typeof prisma.challenge.create>>;
	  }
	| {
			ok: false;
			message: string;
			errors?: Record<string, string[]>;
	  };

export async function CreateNewChallenge(
	formData: NewChallengeWithUserIdInputValues,
): Promise<CreateChallengeResponse> {
	const parsed = newChallengeWithUserIdSchema.safeParse(formData);

	if (!parsed.success) {
		return {
			ok: false,
			message: "Dados inválidos. Verifique os campos do formulário.",
			errors: parsed.error.flatten().fieldErrors,
		};
	}

	const { userId, ...challengeData } = parsed.data;

	const userAlreadyExists = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!userAlreadyExists) {
		return {
			ok: false,
			message: "Usuário não encontrado.",
		};
	}

	try {
		const challenge = await prisma.challenge.create({
			data: {
				...challengeData,
				user: {
					connect: { id: userId },
				},
			},
		});

		return {
			ok: true,
			message: "Desafio criado com sucesso",
			data: challenge,
		};
	} catch (error) {
		console.error("Erro ao criar desafio:", error);
		return {
			ok: false,
			message: "Falha ao criar o desafio, tente novamente mais tarde.",
		};
	}
}
