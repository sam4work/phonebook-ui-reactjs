import { FormEvent, useEffect } from "react";
import Input from "@/components/Input";
import Form from "@/components/Form";
import { useNavigate, useParams } from "react-router-dom";
import DropdownList from "@/components/DropdownList";
import LoadingScreen from "@/components/LoadingScreen";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import useContact from "../hooks/useContact";
import Button from "@/components/Button";
import usePhoneNumber from "../hooks/usePhoneNumber";
import { ToastOptions, toast } from "react-toastify";


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

const ContactEdit = (): JSX.Element => {
	const navigateTo = useNavigate();

	const { contacts: contact, get, update, errors } = useContact();
	const { update: updatePhoneNumber, errors: errorsPhoneNumber } = usePhoneNumber();
	const { slug } = useParams();


	const handleUpdateContact = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (contact && Object.keys(contact.data[0]).includes("id")) {

			const data = new FormData(e.currentTarget)


			if (data.has("first_name") && data.has("last_name")) {
				const result = await update({ id: contact.data[0].id, }, data);
				if (result.status === 204) notifyUser();
				return;
			}

			if (data.has("type") && data.has("sim_number")) {

				data.append('id', e.currentTarget.name)
				const result = await updatePhoneNumber({ id: e.currentTarget.name, }, data);
				if (result.status === 204) notifyUser();
				return
			}
		}

	};


	const notifyUser = (message?: string, options?: ToastOptions) => {
		toast(message ?? ' Update successful!', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
			...options
		});
	}


	const loadData = async () => {
		await get({}, `/${slug}`)
	}

	useEffect(() => {
		loadData()
	}, []);

	return (
		<>
			{contact && contact.data ? (
				<div className="space-y-10">

					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<div>
									<Button
										className={"h-6 w-6"}
										title={"Go Back"}
										onClick={() => navigateTo("/dashboard/contacts")}
										type="button"
									>
										<ArrowLeftCircleIcon className="h-6 w-6 text-green-500 " />
									</Button>
								</div>
								<h3 className="text-base font-semibold leading-6 text-gray-900">
									Update Contact
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									Update an existing contact.
								</p>
								<p className="mt-1 text-sm text-red-500">
									{errors && Object.keys(errors).length
										? "Your form has one or more errors"
										: ""}
								</p>
							</div>
						</div>
						<div className="mt-5 md:col-span-2 md:mt-0 space-y-5">
							<Form
								id="contact-update-form"
								buttonName="Update"
								onSubmit={handleUpdateContact}
							>
								<div className="grid grid-cols-6 sm:grid-cols-12 gap-6">

									<div className="col-span-6">
										<Input
											label="First Name *"
											defaultValue={contact.data[0].first_name}
											name="first_name"
											errors={errors.first_name}
											id="first_name"
											required
										/>
									</div>

									<div className="col-span-6">
										<Input
											label="Last Name *"
											defaultValue={contact.data[0].last_name}
											name="last_name"
											errors={errors.last_name}
											required

										/>
									</div>

								</div>

							</Form>


						</div>
					</div >



					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-base font-semibold leading-6 text-gray-900">
									Update Phone numbers
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									Update existing phone numbers.
								</p>
								<p className="mt-1 text-sm text-red-500">
									{errorsPhoneNumber && Object.keys(errorsPhoneNumber).length
										? "Your form has one or more errors"
										: ""}
								</p>
							</div>
						</div>

						<div className="mt-5 md:col-span-2 md:mt-0 space-y-5">

							<div className="space-y-5 divide-y">
								{
									contact.data && contact.data[0].phone ?
										contact.data[0].phone.map((phoneNumber, idx: number) => (
											<Form
												id="phone-number-update-form"
												name={phoneNumber.id}
												onSubmit={handleUpdateContact}
												buttonName="Update"
												key={phoneNumber.sim_number} className="">


												<h3 className="text-white text-xs bg-gray-900 inline-block py-1 px-2 rounded-md">{idx + 1} / {contact.data[0].phone.length}</h3>
												<div className="grid grid-cols-12 gap-4 items-end ">
													<div className="col-span-6">
														<DropdownList
															label="Type *"
															options={types}
															name={`type`}
															defaultValue={phoneNumber.type}
															errors={errorsPhoneNumber.type}

														/>
													</div>

													<div className="col-span-6">
														<Input
															label="Sim Number *"
															helperText="e164 PhoneNumber format"
															placeholder="E.g. +xxxxxxxxxxxx"
															type="tel"
															defaultValue={phoneNumber.sim_number}
															name={`sim_number`}
															pattern="[+]+[0-9]{10,16}"
															title="Enter "
															errors={errorsPhoneNumber.sim_number}
														/>
													</div>


												</div>


											</Form>
										)) : null
								}
							</div>


						</div>
					</div >


				</div >
			) : (
				<LoadingScreen />
			)}
		</>
	);
};

export default ContactEdit;
