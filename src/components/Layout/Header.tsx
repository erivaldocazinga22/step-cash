import { Target } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
						<Target className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="font-playfair text-xl font-bold text-primary">
						StepCash
					</span>
				</div>

				<nav className="hidden md:flex items-center space-x-6">
					<Link
						href="#como-funciona"
						className="text-sm font-medium hover:text-primary transition-colors"
					>
						Como Funciona
					</Link>
					<Link
						href="#contato"
						className="text-sm font-medium hover:text-primary transition-colors"
					>
						Contato
					</Link>
					<Link
						href="/policies"
						className="text-sm font-medium hover:text-primary transition-colors"
					>
						Políticas
					</Link>
					<ThemeToggle />
					<Button asChild>
						<Link href="/dashboard">Entrar</Link>
					</Button>
				</nav>
			</div>
		</header>
	);
}
