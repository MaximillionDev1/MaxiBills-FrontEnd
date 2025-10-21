import type {
	CreateTransactionDTO,
	Transaction,
	TransactionFilter,
	TransactionSummary,
} from "../types/transactions";
import { api } from "./api";

export const getTransaction = async (
	filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
	const response = await api.get<Transaction[]>("/transaction", {
		params: filter,
	});
	return response.data;
};

export const getTransactionSummary = async (
	month: number,
	year: number,
): Promise<TransactionSummary> => {
	const response = await api.get<TransactionSummary>("/transaction/summary", {
		params: {
			month,
			year,
		},
	});
	return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
	await api.delete(`/transaction/${id}`);
};

export const createTransaction = async (
	transactionData: CreateTransactionDTO,
): Promise<Transaction> => {
	const response = await api.post<Transaction>("/transaction", transactionData);
	return response.data;
};
