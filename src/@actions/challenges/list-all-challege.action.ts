"use server";

import { prisma } from "@/lib/database/prisma/prisma.client";

/**
 * Tipo de retorno padronizado para consumir no front
 */
export type ListAllChallengeResponse =
	| {
			ok: true;
			message: string;
			data: Awaited<ReturnType<typeof prisma.challenge.findMany>>;
	  }
	| {
			ok: false;
			message: string;
			errors?: Record<string, string[]>;
	  };

export async function ListAllNewChallenge({
	userId,
}: {
	userId: string;
}): Promise<ListAllChallengeResponse> {
	if (!userId) {
		return {
			ok: false,
			message: "ID do usuário não fornecido.",
		};
	}

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
		const challenges = await prisma.challenge.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" }, // 👈 opcional: deixa ordenado
		});

		return {
			ok: true,
			message: "Desafios encontrados com sucesso.",
			data: challenges,
		};
	} catch (error) {
		console.error("Erro ao listar os desafios:", error);
		return {
			ok: false,
			message: "Falha ao listar os desafios, tente novamente mais tarde.",
		};
	}
}
