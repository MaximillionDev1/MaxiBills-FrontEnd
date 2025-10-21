import { ChevronDown } from "lucide-react";
import { type ReactNode, type SelectHTMLAttributes, useId } from "react";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	icon?: ReactNode;
	fullWidth?: boolean;
	options: SelectOption[];
}

const Select = ({
	label,
	error,
	icon,
	fullWidth = true,
	options,
	className = "",
	id,
	...rest
}: SelectProps) => {
	const selectId = useId();

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4 relative`}>
			{label && (
				<label className="block text-sm mb-2" htmlFor={selectId}>
					{label}{" "}
				</label>
			)}
			<div className="relative">
				{icon && (
					<div className="absolute inset-y-0 top-6 left-0 pl-2 flex items-center text-gray-400">
						{icon}
					</div>
				)}
			</div>
			<select
				id={selectId}
				{...rest}
				className={`block w-full bg-gray-800 py-3 pl-10 pr-4 rounded-xl text-gray-50 text-sm ${error ? "border border-red-600 " : "border border-gray-700"}
					${error ? "focus:border-red-500" : "focus:border-primary-500"} outline-none appearance-none`}
			>
				{options.map((options) => (
					<option key={options.value} value={options.value}>
						{options.label}
					</option>
				))}
			</select>
			<div className="absolute inset-y-0 top-6 right-0 flex items-center pr-3">
				<ChevronDown className="w-5 h-5 text-gray-50" />
			</div>
			{error && <p className="text-red-600 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Select;
