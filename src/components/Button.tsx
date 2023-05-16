import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Button = (props: IButtonProps) => {
	return (
		<>
			<button type={props.type ?? "submit"} {...props}>
				{props.children}{" "}
			</button>
		</>
	);
};

export default Button;
