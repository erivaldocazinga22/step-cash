import { Separator } from "@radix-ui/react-separator";

import { SignInForm } from "@/components/forms/sign-in.form";
import {
	SocialButtonGithub,
	SocialButtonGoogle,
} from "@/components/Layout/social-buttons";

export default async function SignInPage() {
	return (
		<main className="h-screen flex flex-col gap-6 md:flex-row-reverse">
			<div className="flex-1 flex md:items-center justify-center px-4">
				<div className="flex flex-col gap-6">
					<div>
						<h1 className="text-2xl font-bold mb-2">
							Bem-vindo de volta 👋
						</h1>
						<p className="text-neutral-500 mb-2">
							Faça login para começar a gerenciar seus projetos.
						</p>
					</div>
					<SignInForm />
					<div className="space-y-4">
						<div className="flex items-center gap-2 mb-5">
							<Separator
								orientation="horizontal"
								className="h-1 w-full"
							/>
							<span className="text-sm text-neutral-600">Ou</span>
							<Separator
								orientation="horizontal"
								className="h-1 w-full"
							/>
						</div>
						<SocialButtonGoogle />
						<SocialButtonGithub />
					</div>
				</div>
			</div>
		</main>
	);
}
