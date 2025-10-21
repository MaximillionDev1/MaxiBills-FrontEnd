import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariants = "primary" | "outline" | "secondary" | "sucess" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariants;
	fullWidth?: boolean;
	isLoading?: boolean;
}

const Button = ({
	children,
	variant = "primary",
	fullWidth = false,
	isLoading = false,
	className,
	disabled,
	...rest
}: ButtonProps) => {
	const variantClasses = {
		primary:
			"bg-primary-500 text[#051626] font-semibold hover:bg-primary-600 active:translate-y-0",
		outline:
			"border border-primary-500 text-primary-500 hover:bg-primary-500/10",
		secondary: "bg-gray-800 text-white hover:bg-gray-700",
		sucess: "bg-green-500 text-[#051626] hover:brightness-90",
		danger: "bg-red-500 text-white hover:brightness-90",
	};

	const renderLoading = () => {
		return (
			<div className="flex items-center justify-center">
				<svg
					className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<title>Loading spinner</title>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93-6.364A8.001 8.001 0 0112 4V0c-3.314 0-6.264 1.794-7.93 4.636l3.86 1.364z"
					></path>
				</svg>
				{children}
			</div>
		);
	};

	return (
		<button
			type="button"
			className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center ${variantClasses[variant]}${isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""}${className}${fullWidth ? "w-full" : ""}`}
			disabled={isLoading || disabled}
			{...rest}
		>
			{isLoading ? renderLoading() : children}
		</button>
	);
};

export default Button;
