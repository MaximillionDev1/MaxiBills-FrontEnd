import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import MonthYearSelect from "../components/MonthYearSelect";
import {
	deleteTransaction,
	getTransaction,
} from "../services/transactionService";
import { type Transaction, TransactionType } from "../types/transactions";
import { formatCurrency, formatDate } from "../utils/formatter";

const Transactions = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [loading, setLoading] = useState<boolean>(false);
	const [deletingID, setDeletingId] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [filteredTransactions, setFilteredTransactions] = useState<
		Transaction[]
	>([]);
	const [searchText, setSearchText] = useState<string>("");

	const fetchTransactions = async (): Promise<void> => {
		try {
			setLoading(true);
			setError("");
			const data = await getTransaction({ month, year });
			setTransactions(data);
			setFilteredTransactions(data);
		} catch (error) {
			setError("Erro ao buscar transações");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string): Promise<void> => {
		try {
			setDeletingId(id);
			await deleteTransaction(id);
			toast.success("Transação excluída com sucesso");
			setFilteredTransactions((prev) => prev.filter((t) => t.id !== id));
		} catch (error) {
			console.error(error);
			toast.error("Erro ao excluir transação");
		} finally {
			setDeletingId("");
		}
	};

	const confirmDelete = (id: string): void => {
		if (window.confirm("Tem certeza que deseja excluir essa transação?")) {
			handleDelete(id);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, [month, year]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
		setFilteredTransactions(
			transactions.filter((transaction) =>
				transaction.description
					.toUpperCase()
					.includes(event.target.value.toUpperCase()),
			),
		);
	};

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
				<Link
					to="/transacoes/nova"
					className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
				>
					<Plus className="ml-2 w-4 h-4" />
					Nova transação
				</Link>
			</div>
			<Card className="mb-6">
				<MonthYearSelect
					month={month}
					onMonthChange={setMonth}
					onYearChange={setYear}
					year={year}
				></MonthYearSelect>
			</Card>
			<Card className="mb-6">
				<Input
					placeholder="Buscar Transações..."
					icon={<Search className="w-4 h-4" />}
					fullWidth
					onChange={handleSearchChange}
					value={searchText}
				/>
			</Card>

			<Card className="overflow-hidden">
				{loading ? (
					<div className="flex items-center justify-center">
						<div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
					</div>
				) : error ? (
					<div className=" p-8 text-center">
						<AlertCircle className="w-12 h--12 text-red-500 mx-auto mb-4" />
						<p>{error}</p>
						<Button onClick={fetchTransactions} className="mx-auto mt-6">
							Tentar novamente
						</Button>
					</div>
				) : transactions?.length === 0 ? (
					<div className=" text-center py-12">
						<p className="text-gray-500 mb-4">Nenhuma transacao encontrada</p>
						<Link
							to="/transacoes/nova"
							className="w-fit mx-auto mt-6 bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
						>
							<Plus className="ml-2 w-4 h-4" />
							Nova transação
						</Link>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="divide-y divide-gray-700 min-h-full w-full">
							<thead>
								<tr>
									<th
										scope="col"
										className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase "
									>
										Descrição
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase "
									>
										Data
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase "
									>
										Categoria
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase "
									>
										Valor
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase "
									>
										{" "}
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-700">
								{filteredTransactions.map((transaction) => (
									<tr key={transaction.id} className="hover:bg-gray-800">
										<td className="px-3 py-4 text-gray-400 whitespace-nowrap">
											<div className="flex items-center">
												<div className="mr-2">
													{transaction.type === TransactionType.INCOME ? (
														<ArrowUp className="w-4 h-4 text-primary-500" />
													) : (
														<ArrowDown className="w-4 h-4 text-red-500" />
													)}
												</div>
												<span className=" text-sm font-medium text-gray-50">
													{transaction.description}
												</span>
											</div>
										</td>
										<td className="px-3 py-4 text-gray-400 whitespace-nowrap">
											{formatDate(transaction.date)}
										</td>
										<td className="px-3 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div
													className="w-2 h-2 rounded-full mr-0"
													style={{
														backgroundColor: transaction.category.color,
													}}
												/>
												<span className="text-sm text-gray-400">
													{transaction.category.name}
												</span>
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap">
											<span
												className={`${transaction.type === TransactionType.INCOME ? "text-primary-500" : "text-red-500"}`}
											>
												{formatCurrency(transaction.amount)}
											</span>
										</td>
										<td className="px-3 py-4 whitespace-nowrap cursor-pointer">
											<button
												type="button"
												onClick={() => confirmDelete(transaction.id)}
												className="text-red-500 hover:text-red-400 rounded-full"
												disabled={deletingID === transaction.id}
											>
												{deletingID === transaction.id ? (
													<span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
												) : (
													<Trash2 className="w-4 h-4" />
												)}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Card>
		</div>
	);
};

export default Transactions;
