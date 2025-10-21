import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectProps {
	month: number;
	year: number;
	onMonthChange: (month: number) => void;
	onYearChange: (year: number) => void;
}

const monthNames: readonly string[] = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

const MonthYearSelect = ({
	month,
	onMonthChange,
	onYearChange,
	year,
}: MonthYearSelectProps) => {
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from(
		{ length: 11 },
		(_, i) => currentYear - 5 + i,
	);

	const handleNextMonth = (): void => {
		if (month === 12) {
			onMonthChange(1);
			onYearChange(year + 1);
		} else {
			onMonthChange(month + 1);
		}
	};

	const handlePrevMonth = (): void => {
		if (month === 1) {
			onMonthChange(12);
			onYearChange(year - 1);
		} else {
			onMonthChange(month - 1);
		}
	};

	return (
		<div className="flex items-center justify-between bg-gray-900 rounded-lg p-3  border border-gray-700">
			<button
				type="button"
				className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
				aria-label="Mes anterior"
				onClick={handlePrevMonth}
			>
				<ChevronLeft />
			</button>
			<div className="flex gap-4">
				<label htmlFor="month-select" className="sr-only">
					Selecionar mes
				</label>
				<select
					value={month}
					id="month-select"
					onChange={(e) => onMonthChange(Number(e.target.value))}
					className="bg-gray-800 border border-gray-700 rounded-md px-3 text-sm font-medium text-gray-100 focus: outline-none focus: ring-2 ring-primary-500 cursor-pointer"
				>
					{monthNames.map((name, index) => (
						<option key={name} value={index + 1}>
							{name}
						</option>
					))}
				</select>

				<label htmlFor="year-select" className="sr-only">
					Selecionar ano
				</label>
				<select
					value={year}
					id="year-select"
					onChange={(e) => onYearChange(Number(e.target.value))}
					className="bg-gray-800 border border-gray-700 rounded-md px-3 text-sm font-medium text-gray-100 focus: outline-none focus: ring-2 ring-primary-500 cursor-pointer"
				>
					{years.map((name) => (
						<option key={name} value={name}>
							{name}
						</option>
					))}
				</select>
			</div>
			<button
				type="button"
				className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer "
				aria-label="Proximo mes"
				onClick={handleNextMonth}
			>
				<ChevronRight />
			</button>
		</div>
	);
};

export default MonthYearSelect;
