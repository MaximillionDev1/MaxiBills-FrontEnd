import { ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Card from "../components/Card";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactionMonthly } from "../services/api";
import { getTransactionSummary } from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import { formatCurrency } from "../utils/formatter";

const initialSummary: TransactionSummary = {
	balance: 0,
	totalExpense: 0,
	totalIncome: 0,
	expenseByCategory: [],
	month: new Date().getMonth() + 1,
	year: new Date().getFullYear(),
};

import type { PieLabelProps } from "recharts/types/polar/Pie";

const Dashboard = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState(currentDate.getMonth() + 1);
	const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
	const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

	useEffect(() => {
		async function loadTransactionsSummary() {
			try {
				const response = await getTransactionSummary(month, year);
				console.log("Resposta da API:", response);

				setSummary(response);
			} catch (error) {
				console.error("Erro ao carregar o resumo das transações:", error);
				setSummary(initialSummary);
			}
		}

		loadTransactionsSummary();
	}, [month, year]);

	useEffect(() => {
		async function loadTransactionsMonthly() {
			const response = await getTransactionMonthly(month, year);

			console.log(response);
			setMonthlyItemsData(response.history);
		}

		loadTransactionsMonthly();
	}, [month, year]);

	const renderPieChartLabel = (props: PieLabelProps) => {
		const { percent, name, payload } = props;
		const categoryName = payload?.categoryName || name || "";
		const safePercent = percent ?? 0;
		return `${categoryName}: ${(safePercent * 100).toFixed(1)}%`;
	};

	const formatToolTipValue = (value: number | string): string => {
		return formatCurrency(typeof value === "number" ? value : 0);
	};

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start mb-6">
				<h1 className="text-xl font-bold mb-4 md:mb-0">Dashboard</h1>
				<MonthYearSelect
					month={month}
					year={year}
					onMonthChange={setMonth}
					onYearChange={setYear}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card
					icon={<Wallet size={20} className="text-primary-500" />}
					title="Saldo"
					hover
					glowEffect={summary.balance > 0}
				>
					<p
						className={`text-2xl font-semibold mt-2 *
					${summary.balance > 0 ? "text-primary-500" : "text-red-300"}
					`}
					>
						{formatCurrency(summary.balance)}
					</p>
				</Card>

				<Card
					icon={<ArrowUp size={20} className="text-primary-500" />}
					title="Receitas"
					hover
				>
					<p className="text-2xl font-semibold mt-2 text-primary-500 ">
						{formatCurrency(summary.totalIncome)}
					</p>
				</Card>

				<Card
					icon={<Wallet size={20} className="text-red-600" />}
					title="Despesas"
					hover
				>
					<p className="text-2xl font-semibold mt-2 text-red-600">
						{formatCurrency(summary.totalExpense)}
					</p>
				</Card>
			</div>
			<div className="grid grid-col-span-1 lg:grid-cols-2 gap-6 mb-6 mt-03">
				<Card
					icon={<TrendingUp size={20} className="text-primary-500" />}
					title="Despesas por Categoria"
					className="min-h-80 mt-4"
				>
					{summary.expenseByCategory.length > 0 ? (
						<div className="h-72 mt-4">
							<ResponsiveContainer>
								<PieChart>
									<Pie
										data={summary.expenseByCategory}
										cx="50%"
										cy="50%"
										outerRadius={80}
										dataKey="amount"
										nameKey="categoryName"
										label={renderPieChartLabel}
									>
										{summary.expenseByCategory.map((entry) => (
											<Cell key={entry.categoryId} fill={entry.categoryColor} />
										))}
									</Pie>
									<Tooltip formatter={formatToolTipValue} />
								</PieChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div className="flex items-center justify-center h-64 text-gray-500">
							Nenhuma despesa registrada nesse periodo
						</div>
					)}
				</Card>
				<Card
					icon={<Calendar size={20} className="text-primary-500" />}
					title="Histórico Mensal"
					className="min-h-80 p-2.5 mt-4"
				>
					<div className="h-72 mt-4">
						{monthlyItemsData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={monthlyItemsData} margin={{ left: 40 }}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="rgba(255,255,255,0.1)"
									/>
									<XAxis
										dataKey="name"
										stroke="#94a3b8"
										tick={{ style: { textTransform: "capitalize" } }}
									/>
									<YAxis
										stroke="#94a3b8"
										tickFormatter={formatCurrency}
										tick={{ style: { fontSize: 14 } }}
									/>
									<Tooltip
										formatter={formatCurrency}
										contentStyle={{
											backgroundColor: "#1a1a1a",
											borderColor: "#2a2a2a",
										}}
										labelStyle={{ color: "#f8f8f8" }}
									/>
									<Legend />
									<Bar
										dataKey="expenses"
										name="Despesas"
										fill="#ff6384"
										activeBar={<Rectangle fill="pink" stroke="blue" />}
									/>
									<Bar
										dataKey="income"
										name="Receitas"
										fill="#37e359"
										activeBar={<Rectangle fill="gold" stroke="purple" />}
									/>
								</BarChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-64 text-gray-500">
								Nenhuma despesa registrada nesse periodo
							</div>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
