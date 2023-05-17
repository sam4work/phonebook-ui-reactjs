import { PhoneIcon } from "@heroicons/react/20/solid";
import { useContactCardContext } from "../../hooks/useContactCard";

const ContactTitle = (): JSX.Element => {
	const { contact } = useContactCardContext();
	return (
		<div className="flex flex-col items-end">
			<h4 className="text-lg text-gray-900 dark:text-gray-200">
				{contact.first_name} {contact.last_name}
			</h4>
			<h5 className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
				<PhoneIcon className="h-4 w-4" /> <pre>{contact.phone[0].sim_number}</pre>
			</h5>
		</div>
	);
};

export default ContactTitle;
