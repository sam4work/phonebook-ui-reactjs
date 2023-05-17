import { CheckCircleIcon, CircleStackIcon, PlusCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import useContact from "../hooks/useContact"
import { useEffect, useState } from "react"
import { IContact, IPhoneNumber } from "../types"
import ContactCard from "../components/contact-card"
import Modal from "@/components/Modal"
import Pagination from "@/components/Pagination"
import PhoneNumbers from "../components/PhoneNumbers"
import { toast } from "react-toastify"
import SearchInput from "@/components/SearchInput"

const Contacts = (): JSX.Element => {
	const { contacts, get, remove } = useContact()
	const navigateTo = useNavigate();

	const [modalContent, setModalContent] = useState<IContact>();
	const [open, setOpen] = useState(false);

	const [searchParams] = useSearchParams();




	const handleDelete = async (id: string) => {
		if (confirm("Do you want to delete contact ?")) {
			if ((await remove(id))) {
				toast('Contact deleted successfully!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}
		}
	};

	const viewModal = (contact: IContact) => {
		setModalContent(contact);
		setOpen(!open);
	};

	const handleUpdate = (id: string) => {
		navigateTo(`/dashboard/contacts/${id}/edit`);
	};


	const loadContacts = async () => {
		await get();
	}



	useEffect(() => {
		loadContacts()
	}, [])

	useEffect(() => {
		(async () => {
			const currentParams: { [key: string]: string } = {
				...Object.fromEntries(searchParams.entries()),
			};

			await get(currentParams ?? null);

		})();

	}, [searchParams]);

	return (
		<>
			<section className="max-w-6xl mx-auto border flex flex-col">
				<h2 className="flex items-center justify-center gap-1 text-2xl font-bold p-2 text-gray-900 dark:text-gray-300">
					<CircleStackIcon className="h-6 w-6  animate-pulse" />
					Phone Book App
				</h2>

				<div className="bg-gray-200 dark:bg-gray-800 grid grid-cols-12 gap-4 items-center px-4 py-2 ">

					<div className="col-span-6">
						<h3 className="text-xl font-semibold">Contacts</h3>
					</div>

					<div className="col-span-6 text-right">
						<Link
							to="/dashboard/contacts/create"
							className="inline-flex  justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
						>

							<span className="flex justify-center items-center gap-1 ">
								<PlusCircleIcon className="h-4 w-4" />
								Add new contact
							</span>

						</Link>
					</div>

				</div>

				<section className="grid sm:grid-cols-8 lg:grid-cols-12 gap-4 p-4">
					<div className="col-span-full">
						<SearchInput placeholder="Search by name or phone number." />
					</div>

					{
						contacts ?
							<>
								{
									contacts.data.map((contact: IContact) => (
										<ContactCard
											key={`contact-0${contact.id}`}
											contact={contact}
											image={<ContactCard.Image />}
											info={
												<>
													<ContactCard.Title />
													<ContactCard.Actions
														handleView={viewModal}
														handleUpdate={handleUpdate}
														handleDelete={handleDelete}
													/>
												</>
											}
										/>
									))
								}



							</>
							: null


					}


					<Modal
						open={open}
						setOpen={setOpen}
						title={<span>{modalContent?.first_name} {modalContent?.last_name}</span>}
						children={<div>{JSON.stringify(modalContent)}</div>}
						icon={
							modalContent && modalContent.phone ? (
								<CheckCircleIcon
									className="h-6 w-6 text-green-600"
									aria-hidden="true"
								/>
							) : (
								<QuestionMarkCircleIcon
									className="h-6 w-6 text-red-600"
									aria-hidden="true"
								/>
							)
						}
					/>

				</section>

				<section className="">

					{
						contacts ?
							<Pagination
								links={contacts.links}
								extras={{
									from: contacts.from,
									first_page_url: contacts.first_page_url,
									last_page: contacts.last_page,
									last_page_url: contacts.last_page_url,
									total: contacts.total,
									current_page: contacts.current_page,
									per_page: contacts.per_page,
									current_total: contacts.data.length.toString(),
								}}
							/>
							: null


					}


					<Modal
						open={open}
						setOpen={setOpen}
						title={<span>{modalContent?.first_name} {modalContent?.last_name}</span>}
						children={<PhoneNumbers data={modalContent?.phone ?? []} />}
						icon={
							modalContent && modalContent.phone ? (
								<CheckCircleIcon
									className="h-6 w-6 text-green-600"
									aria-hidden="true"
								/>
							) : (
								<QuestionMarkCircleIcon
									className="h-6 w-6 text-red-600"
									aria-hidden="true"
								/>
							)
						}
					/>

				</section>




			</section>
		</>
	)
}



export default Contacts