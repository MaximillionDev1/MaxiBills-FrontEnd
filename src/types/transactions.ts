import type { Category, CategorySummary } from "./category";

export const TransactionType = {
	EXPENSE: "expense",
	INCOME: "income",
} as const;

export type TransactionType =
	(typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
	id: string;
	userId: string;
	amount: number;
	description: string;
	date: string | Date;
	categoryId: string;
	category: Category;
	type: TransactionType;
	createdAt: string | Date;
	updatedAt: string | Date;
}

export interface CreateTransactionDTO {
	description: string;
	amount: number;
	date: Date | string;
	categoryId: string;
	type: TransactionType;
}

export interface TransactionFilter {
	month: number;
	year: number;
	categoryId?: string;
	type?: TransactionType;
}

export interface TransactionSummary {
	month: number;
	year: number;
	totalIncome: number;
	totalExpense: number;
	balance: number;
	expenseByCategory: CategorySummary[];
}

export interface MonthlyItem {
	name: string;
	expense: number;
	income: number;
}
