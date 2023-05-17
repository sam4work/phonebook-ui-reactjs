import React, { HTMLProps, useRef, useState } from "react";

interface IImageInputProps extends HTMLProps<HTMLInputElement> {
	setTodoImage?: (file: File) => void;
	setError?: (error: string[]) => void;
	errors: string[];
	defaultImageUrl?: string;
}

const ImageUpload = (props: IImageInputProps) => {
	const imageInput = useRef<HTMLInputElement>(null);
	const [temporaryUploadedImage, setTemporaryUploadedImage] = useState("");
	const [error, setError] = useState("");

	const handleSelectedImage = () => {
		imageInput.current?.click();
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(e.target.files[0])
		setError("");
		if (!e.target.files) {
			return;
		}

		if (e.target.files[0].size > 5000000) {
			// set_file_err(true);
			setError("Image size must be 5MB or less.");
		} else if (
			e.target.files[0].type !== "image/png" &&
			e.target.files[0].type !== "image/jpg" &&
			e.target.files[0].type !== "image/jpeg"
		) {
			// set_file_err(true);
			setError("Image type must be png, jpg or jpeg.");
			console.log(e.target.files[0]);
			return;
		}
		// props.setTodoImage(e.target.files[0]);
		setTemporaryUploadedImage(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<>
			<label className="block text-sm font-medium leading-6 text-gray-900">
				{props.label}
			</label>
			<div className="mt-2 flex items-center">
				<div
					className={
						`${error ? " ring ring-red-500 " : ""}` +
						"inline-block h-20 w-20 overflow-hidden rounded-full bg-gray-100"
					}
				>
					{temporaryUploadedImage ? (
						<img
							className="h-full object-cover object-center w-full rounded-full"
							src={temporaryUploadedImage}
							alt="Logo"
						/>
					) : (
						<>
							{props.defaultImageUrl ? (
								<img
									className="h-full object-cover object-center w-full rounded-full"
									src={`${import.meta.env.VITE_BASE_API_URL}/api/${props.defaultImageUrl
										}`}
									alt="Logo"
								/>
							) : (
								<svg
									className="h-full w-full text-gray-300"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
								</svg>
							)}
						</>
					)}
				</div>
				<input
					ref={imageInput}
					onChange={handleImageChange}
					type="file"
					name={props.name}
					className="hidden"
					accept={props.accept}
				/>
				<button
					type="button"
					onClick={handleSelectedImage}
					className="ml-5 rounded-md border border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-300 bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
				>
					<span className={`${error ? "text-red-500" : ""}`}>
						{temporaryUploadedImage === "" ? "Upload Image" : "Change Image"}
					</span>
				</button>
			</div>
			<p className="text-sm text-red-500">
				{error ? error : props.errors ? props.errors[0] : ""}
			</p>
		</>
	);
};

export default ImageUpload;
