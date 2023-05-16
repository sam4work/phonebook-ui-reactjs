import { PhotoIcon } from "@heroicons/react/24/outline";
import { useContactCardContext } from "../../hooks/useContactCard";

const ContactImage = (): JSX.Element => {
	const { contact } = useContactCardContext();
	return (
		<>
			{contact.image ? (
				<img
					className="object-cover"
					src={`${import.meta.env.VITE_BASE_API_URL}/api/${contact.image}`}
					alt={`${contact.first_name}`}
				/>
			) : (
				<PhotoIcon className="h-full w-full text-gray-300" />
			)}
		</>
	);
};

export default ContactImage;
