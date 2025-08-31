import { RegisterForm } from "@/components/forms/register-user.form";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<div className="h-screen flex flex-col">
			<div className="flex-1 flex items-center justify-center">
				<div className="max-w-sm flex flex-col gap-6">
					<div>
						<h1 className="text-2xl font-bold mb-2">
							Crie sua conta 🚀
						</h1>
						<p className="text-neutral-500 mb-2">
							Cadastre-se para começar a gerenciar seus projetos
							de forma simples e eficiente.
						</p>
					</div>
					<RegisterForm />
					<Link href="/sign-in" className="text-center group">
						Bem-vindo de volta!{" "}
						<strong className="group-hover:underline">
							Faça login
						</strong>
					</Link>
				</div>
			</div>
		</div>
	);
}