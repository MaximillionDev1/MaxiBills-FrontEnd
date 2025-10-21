/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const navigate = useNavigate();
	const { signWithGoogle, authState } = useAuth();

	const handleLogin = async () => {
		try {
			await signWithGoogle();
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	useEffect(() => {
		if (authState.user && !authState.loading) {
			navigate("/dashboard");
		}
	}, [authState.user, authState.loading, navigate]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 ">
				<header>
					<h1 className="text-center text-3xl font-extrabold text-gray-900">
						Maxibills
					</h1>
					<p className="mt-2 text-center textt-sm text-gray-600 ">
						Sua vida financeira, simples e no controle.
					</p>
				</header>

				<main className="mt-8 bg-white py-8 shadow-md rounded-lg sm:px-10 space-y-px">
					<section className="mb-6">
						<h2 className="text-lg font-medium text-gray-900">
							{" "}
							Faca login para continuar
						</h2>
						<p className="mt-1 text-sm text-gray-600">
							Acesse sua conta para comecar a gerenciar suas financas
						</p>
					</section>
					<GoogleLoginButton onClick={handleLogin} isLoading={false} />
					{authState.error && (
						<div className="bg-red-50 text-center text-red-700 mt-4">
							<p>{authState.error}</p>
						</div>
					)}
					<footer className="mt-6">
						<p className="mt-1 text-sm text-gray-600 text-center">
							Ao fazer login, voce concorda com nossos termos de uso e politica
							de privacidade
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
};

export default Login;
