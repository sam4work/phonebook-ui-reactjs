import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/ImageUpload";
import Form from "@/components/Form";
import DropdownList from "@/components/DropdownList";
import useContact from "../hooks/useContact";
import Input from "@/components/Input";



const ContactCreate = (): JSX.Element => {
	const navigateTo = useNavigate();

	const { create, errors } = useContact();

	const types = [
		{
			name: "Selected Type",
			value: "",
		},
		{
			name: "Mobile",
			value: "mobile",
		},
		{
			name: "Landline",
			value: "landline",
		},
	];


	const handleCreateContact = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await create(
			new FormData(e.currentTarget)
		);

	};

	return (
		<>
			<div>
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-300">
								New Contact
							</h3>
							<p className="mt-1 text-sm text-gray-600">Create a new contact.</p>
							<p className="mt-1 text-sm text-red-500">
								{errors && Object.keys(errors).length
									? "Your form has one or more errors"
									: ""}
							</p>
						</div>
					</div>
					<div className="mt-5 md:col-span-2 md:mt-0">
						<Form onSubmit={handleCreateContact} encType="multipart/form-data">


							<div>
								<ImageUpload
									name="image"
									accept=".png,.jpg,.jpeg"
									errors={errors.image}
								/>
							</div>
							<div className="grid grid-cols-6 sm:grid-cols-12 gap-6">


								<div className="col-span-6">
									<Input
										label="First Name *"
										defaultValue={"Hindolo"}
										name="first_name"
										errors={errors.first_name}
									/>
								</div>

								<div className="col-span-6">
									<Input
										label="Last Name *"
										defaultValue={"Sam"}
										name="last_name"
										errors={errors.last_name}
									/>
								</div>


								<div className="col-span-6">
									<DropdownList
										label="Type *"
										options={types}
										name="type"
										errors={errors.type}
										defaultValue={types[0].value}
									/>
								</div>

								<div className="col-span-6">
									<Input
										label="Sim Number *"
										helperText="e164 PhoneNumber format"
										placeholder="E.g. +xxxxxxxxxxxx"
										type="tel"
										defaultValue={"+232506807157"}
										name="sim_number"
										pattern="[+]+[0-9]{12,16}"
										title="Enter "
										errors={errors.sim_number}
									/>
								</div>


							</div>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactCreate;
