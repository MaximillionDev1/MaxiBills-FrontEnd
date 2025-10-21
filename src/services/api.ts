import axios, {
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";
import { firebaseAuth } from "../config/firebase";
import type { MonthlyItem } from "../types/transactions";

export const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000, // 10 segundos
});

api.interceptors.request.use(
	async (
		config: InternalAxiosRequestConfig,
	): Promise<InternalAxiosRequestConfig> => {
		const user = firebaseAuth.currentUser;

		if (user) {
			try {
				const token = user.getIdToken();
				config.headers.set("Authorization", `Bearer ${await token}`);
			} catch (error) {
				console.error("Error getting token:", error);
			}
		}

		return config;
	},
);

export const getTransactionMonthly = async (
	month: number,
	year: number,
	months?: number,
): Promise<{ history: MonthlyItem[] }> => {
	const response = await api.get("/transaction/historical", {
		params: { month, year, months },
	});

	return response.data;
};
