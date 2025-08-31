import { z } from "zod";

export const changePasswordSchema = z
	.object({
		currentPassword: z
			.string()
			.min(8, "A senha atual deve ter pelo menos 8 caracteres"),
		newPassword: z
			.string()
			.min(8, "A nova senha deve ter pelo menos 8 caracteres"),
		confirmNewPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		path: ["confirmNewPassword"],
		message: "As senhas não coincidem",
	});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
