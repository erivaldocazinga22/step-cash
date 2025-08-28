import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const playfair = Playfair_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-playfair",
});

export const metadata: Metadata = {
	title: "StepCash - Poupar nunca foi tão simples",
	description:
		"Defina a sua meta financeira, escolha o tempo e siga pequenos passos até alcançá-la.",
	generator: "StepCash",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt" className={`${inter.variable} ${playfair.variable}`}>
			<body className="font-sans antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster
						richColors
						position="top-right"
						closeButton
						visibleToasts={1}
					/>
				</ThemeProvider>
			</body>
		</html>
	);
}
