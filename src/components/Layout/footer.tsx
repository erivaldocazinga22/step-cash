import { Target } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t pt-12 pb-4 px-4">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center space-x-2 mb-4 md:mb-0">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<Target className="h-5 w-5 text-primary-foreground" />
						</div>
						<span className="font-playfair text-xl font-bold text-primary">
							StepCash
						</span>
					</div>

					<div className="flex space-x-6 text-sm text-muted-foreground">
						<Link
							href="/policies"
							className="hover:text-primary transition-colors"
						>
							Políticas de Privacidade
						</Link>
						<Link
							href="#contato"
							className="hover:text-primary transition-colors"
						>
							Contato
						</Link>
						<Link
							href="https://github.com/erivaldocazinga22"
							target="_blank"
							className="hover:text-primary transition-colors"
						>
							GitHub
						</Link>
					</div>
				</div>

				<div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
					<p>
						&copy; 2024 StepCash. Transformando sonhos em realidade,
						um passo de cada vez.
					</p>
				</div>
			</div>
		</footer>
	);
}
