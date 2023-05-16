import { HTMLProps, ReactNode } from "react";

interface IFormProps extends HTMLProps<HTMLFormElement> {
	children: ReactNode;
	inline?: boolean
	buttonName?: string;
}

const Form = (props: IFormProps) => {
	return (
		<form id={props.id} name={props.name} onSubmit={props.onSubmit} encType={props.encType ?? undefined}>
			<div className="shadow dark:shadow-gray-800 sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6  px-4 py-5 sm:p-6">{props.children}</div>
				{
					props.inline !== true ?

						<div className="dark:bg-gray-800 bg-gray-50 px-4 py-3 text-right sm:px-6">
							<button
								type="submit"
								className="inline-flex justify-center rounded-md bg-green-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
							>
								{props.buttonName ?? "Save"}
							</button>
						</div>
						: null
				}
			</div>
		</form>
	);
};

export default Form;
