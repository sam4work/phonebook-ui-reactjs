import { HTMLProps } from "react";

interface IInputProps extends HTMLProps<HTMLInputElement> {
	errors?: string[];
	helperText?: string;
	showErrorMessage?: boolean
}
const Input = (props: IInputProps) => {

	return (
		<>
			{props.label ? (
				<label
					htmlFor={props.id}
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					{props.label} <span className="text-xs text-gray-400">{props.helperText}</span>
				</label>
			) : null}
			<input
				type={props.type ?? "text"}
				name={props.name}
				placeholder={props.placeholder}
				pattern={props.pattern}
				title={props.title}
				defaultValue={props.defaultValue}
				id={props.id}
				autoComplete={props.autoComplete}
				required={props.required}
				className={
					`${props.errors ? " ring-red-500 " : ""}` +
					` dark:bg-gray-800 dark:text-gray-300 text-lg ` +
					"mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
				}
			/>
			{
				props.showErrorMessage ?
					<p className="text-sm text-red-500">
						{props.errors ? props.errors[0] : ""}
					</p>
					: null
			}
		</>
	);
};

export default Input;
