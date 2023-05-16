import { HTMLProps, ReactNode } from "react";

interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
	errors?: string[];
	labelComponent?: ReactNode;
}

const Textarea = (props: ITextareaProps) => {
	return (
		<>
			<label
				htmlFor="description"
				className="block text-sm font-semibold leading-6 text-gray-900"
			>
				{props.labelComponent ?? props.label}
			</label>
			<div className="mt-2.5">
				<textarea
					name={props.name}
					id={props.id}
					rows={props.rows}
					className={
						`${props.errors ? " ring-red-500 " : ""}` +
						` dark:bg-gray-800 dark:text-gray-300 text-lg ` +
						" resize-none block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
					}
					defaultValue={props.defaultValue}
				/>
			</div>

			<p className="text-sm text-red-500">
				{props.errors ? props.errors[0] : ""}
			</p>
		</>
	);
};

export default Textarea;
