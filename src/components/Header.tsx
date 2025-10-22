import { Activity, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

interface navLink {
	name: string;
	path: string;
}

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { authState, signOut } = useAuth();

	const { pathname } = useLocation();

	const isAuthenticated: boolean = !!authState.user;

	const navLink: navLink[] = [
		{ name: "Dashboard", path: "/dashboard" },
		{ name: "Transaçoes", path: "/transacoes" },
	];

	const [avatarLoadError, setAvatarLoadError] = useState<boolean>(false);

	const handleSignOut = (): void => {
		setIsOpen(false);
		signOut();
	};

	const changeMenu = (): void => {
		setIsOpen(!isOpen);
	};

	const renderAvatar = () => {
		const user = authState?.user;
		if (!user) return null;

		if (user.photoURL && !avatarLoadError) {
			return (
				<img
					src={user.photoURL}
					alt={`foto de perfil do(a) ${user.displayName ?? ""}`}
					className="w-8 h-8 rounded-full border border-gray-700"
					onError={() => setAvatarLoadError(true)} // se falhar o carregamento, usa fallback
				/>
			);
		}

		// Fallback: iniciais dentro do círculo
		return (
			<div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
				{(user.displayName?.charAt(0) ?? "").toUpperCase()}
			</div>
		);
	};

	return (
		<header className="bg-gray-800 border-b border-gray-700">
			<div className="container-app">
				<div className="flex justify-between items-center py-4">
					{/*LOGO */}
					<Link
						to="/"
						className="flex gap-2 text-xl text-primary-500 items-center font-bold"
					>
						<Activity className="w-6 h-6" />
						MaxiBills
					</Link>
					{/*MENU DESKTOP */}
					{isAuthenticated && (
						<nav className="hidden md:flex space-x-3">
							{navLink.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									className={
										pathname === link.path
											? "text-primary-500 bg-primary-500/10 rounded-md h-10 px-3 py-2"
											: "text-gray-400 px-3 py-2 hover:text-primary-500 hover:bg-primary-500/5 rounded-md"
									}
								>
									{link.name}
								</Link>
							))}
						</nav>
					)}
					<div className="hidden md:flex items-center space-x-4">
						{isAuthenticated ? (
							<div className="flex items-center space-x-4">
								{/* AVATAR*/}
								<div className="flex items-center space-x-2">
									{renderAvatar()}
									<span className="text-sm font-medium">
										{authState.user?.displayName}
									</span>
								</div>
								<button
									type="button"
									onClick={handleSignOut}
									className=" hover:text-red-300 hover:bg-red-800 p-2 rounded-full transition-colors cursor-pointer"
								>
									<LogOut className="text-gray-200" />
								</button>
							</div>
						) : (
							<div>
								<Link to="/login">
									<LogIn className="bg-primary-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all" />
								</Link>
							</div>
						)}
					</div>
					{/*MENU MOBILE */}
					<div className="md:hidden flex items-center">
						<button
							type="button"
							className="text-gray-400 p-2 rounded-lg hover:bg-gray-800 transition-colors"
							onClick={changeMenu}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div>
					<div>
						{isAuthenticated ? (
							<>
								<nav className="space-y-1">
									{navLink.map((link) => (
										<Link
											to={link.path}
											key={link.path}
											className={`block p-5 rounded-lg ${
												pathname === link.path
													? "text-primary-500 bg-primary-500/10 font-medium"
													: "text-gray-400 hover:text-primary-500 hover:bg-primary-500/5"
											}`}
											onClick={() => setIsOpen(false)}
										>
											{link.name}
										</Link>
									))}
								</nav>
								<div className="flex items-center justify-between p-4 border-t border-gray-700">
									<div className="flex items-center space-x-2">
										{renderAvatar()}
										<span className="text-sm font-medium">
											{authState.user?.displayName}
										</span>
									</div>
									<button
										type="button"
										onClick={handleSignOut}
										className="text-gray-400 hover:text-red-700 p-2 rounded-full hover:bg-red-200 transition-colors"
									>
										<LogOut size={20} />
									</button>
								</div>
							</>
						) : (
							<Link
								to="/login"
								onClick={() => setIsOpen(false)}
								className="bg-primary-500 text-gray-800 font-semibold px-5 py-2.5 flex items-center justify-center hover:bg-primary-600"
							>
								Entrar
							</Link>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
