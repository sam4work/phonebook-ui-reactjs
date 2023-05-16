import {
	EyeIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { IContact } from "../../types";
import { useContactCardContext } from "../../hooks/useContactCard";

interface IContactActionsProps {
	handleView: (contact: IContact) => void;
	handleDelete: (id: string) => void;
	handleUpdate: (id: string) => void;
}

const ContactActions = ({
	handleView,
	handleDelete,
	handleUpdate,
}: IContactActionsProps): JSX.Element => {
	const { contact } = useContactCardContext();

	return (
		<>
			<div className="mt-5 w-full  text-xs space-x-2  flex justify-end rounded-r ">
				<button
					type="button"
					onClick={() => handleView(contact)}
					className="border dark:border-gray-700 dark:text-gray-300 dark:hover:text-green-400 dark:hover:border-green-400 hover:bg-gray-900 hover:text-green-400 p-3 rounded-md"
					title={`Mark ${contact.first_name} as in contact list.`}
				>
					<EyeIcon
						className="h-4 w-4 hover:transition-all hover:duration-700 hover:ease-in-out hover:scale-125  "
					/>
				</button>

				<button
					type="button"
					onClick={() => handleUpdate(contact.id)}
					className="border dark:border-gray-700 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:border-yellow-400 hover:bg-gray-900 hover:text-yellow-400 p-3 rounded-md"
					title={`Edit ${contact.first_name} contact.`}
				>
					<PencilSquareIcon
						className="h-4 w-4 hover:transition-all hover:duration-700 hover:ease-in-out hover:scale-125"

					/>
				</button>

				<button
					type="button"
					className="border dark:border-gray-700 dark:text-gray-300 dark:hover:text-red-400 dark:hover:border-red-400  hover:bg-gray-900 hover:text-red-400 p-3 rounded-md"
					onClick={() => handleDelete(contact.id)}
					title={`Delete ${contact.first_name} from contact list.`}
				>
					<TrashIcon
						className="h-4 w-4 hover:transition-all hover:duration-700 hover:ease-in-out hover:scale-125"
					/>
				</button>
			</div>{" "}
		</>
	);
};

export default ContactActions;
