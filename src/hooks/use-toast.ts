"use client";

import { toast as sonner } from "sonner";

export function useToast() {
	return {
		success: (msg: string, description?: string) =>
			sonner.success(msg, { description }),
		error: (msg: string, description?: string) =>
			sonner.error(msg, { description }),
		info: (msg: string, description?: string) =>
			sonner.info(msg, { description }),
		warning: (msg: string, description?: string) =>
			sonner.warning(msg, { description }),
		// acesso direto caso precise de mais controle
		raw: sonner,
	};
}
