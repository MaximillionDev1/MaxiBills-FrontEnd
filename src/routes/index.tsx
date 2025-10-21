import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer, type ToastContainerProps } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import TransactionForm from "../pages/TransactionForm";
import Transactions from "../pages/Transactions";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
	const toastConfig: ToastContainerProps = {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		newestOnTop: false,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		draggable: true,
		pauseOnHover: true,
		theme: "dark",
	};

	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<Login />}></Route>

					<Route element={<PrivateRoutes />}>
						<Route element={<AppLayout />}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/transacoes" element={<Transactions />} />
							<Route path="/transacoes/nova" element={<TransactionForm />} />
						</Route>
					</Route>
					<Route path="*" element={<h2>Pagina nao encontrada 404</h2>} />
				</Routes>
				<ToastContainer {...toastConfig} />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
