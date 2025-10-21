const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();
	return (
		<div>
			<footer className="bg-gray-800 border border-gray-700 py-4">
				<div className="container-app">
					<p className="text-sm text-gray-400 text-center">
						MaxiBills {currentYear} - Desenvolvido por{" "}
						<strong>Matheus Vinicius com</strong> <strong>React</strong> &{" "}
						<strong>TypeScript</strong>
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
