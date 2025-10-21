import { CreditCard, List, TrendingUp, Wallet } from "lucide-react";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";

interface Feature {
	icon: JSX.Element;
	title: string;
	description: string;
}

const Home = () => {
	const navigate = useNavigate();
	const features: ReadonlyArray<Feature> = [
		{
			icon: <Wallet className="w-8 h-8 text-primary-500" />,
			title: "Controle Financeiro",
			description:
				"Gerencie suas receitas e despesas em um só lugar, com uma interface simples e eficiente.",
		},
		{
			icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
			title: "Relatórios",
			description:
				"Visualize seus gastos com gráficos claros e entenda exatamente para onde seu dinheiro está indo.",
		},
		{
			icon: <List className="w-8 h-8 text-primary-500" />,
			title: "Categorias Personalizadas",
			description:
				"Crie categorias e organize suas transações do seu jeito, facilitando a análise financeira.",
		},
		{
			icon: <CreditCard className="w-8 h-8 text-primary-500" />,
			title: "Transações Ilimitadas",
			description:
				"Registre quantas transações quiser e mantenha um histórico completo das suas finanças.",
		},
	];

	return (
		<div className="bg-gray-950 min-h-screen">
			<div className="container-app">
				<section className="sections">
					<div className="grid-features gap-12 items-center">
						<div>
							<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
								Gerencie suas financas com o{" "}
								<span className="text-primary-500">MaxiBills</span>{" "}
							</h1>
							<p className="text-lg text-white mb-8">
								Sua vida financeira, simples e no seu ritmo.Seu painel de
								controle financeiro. By dev, for dev.
							</p>
							<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
								<Button
									className="text-center px-6 py-3"
									onClick={() => navigate("/login")}
								>
									Comecar agora
								</Button>
							</div>
						</div>
					</div>
				</section>

				<section className="sections bg-gray-900 rounded-xl">
					<div className="container-app">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-white mb-4">
								Recursos do MaxiBills
							</h2>
							<p className="text-lg text-white max-w-2xl mx-auto">
								Organize, visualize e cuide do seu dinheiro com facilidade
							</p>
						</div>
						<div className="grid-features lg:grid-cols-4 gap-8">
							{features.map((feature) => (
								<div
									key={feature.title}
									className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
								>
									<div className="mb-4 bg-primary-500/10 rounded-full inline-block">
										{feature.icon}
									</div>
									<h3 className="text-xl font-semibold text-white mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-400">{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>
				<section>
					<div className="bg-gray-900 p-8 md:p-12 rounded-xl text-center flex flex-col justify-center border border-gray-700 ">
						<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
							Domine suas finanças com praticidade
						</h2>
						<p className="text-white text-opacity-90 max-w-2xl mx-auto mb-8">
							Use o MaxiBills hoje mesmo e assuma o controle dos seus gastos de
							forma simples e gratuita.
						</p>
						<Button
							className="mx-auto px-6 py-3"
							onClick={() => navigate("/login")}
						>
							Criar conta gratuita
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
