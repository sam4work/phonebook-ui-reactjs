import { ReactNode } from "react";
import { IContact } from "../../types";
import ContactCardContext from "../../contexts/ContactContext";
import ContactActions from "./Action";
import ContactTitle from "./Title";
import ContactImage from "./Image";


interface IContactCardProps {
	image?: ReactNode;
	info: ReactNode;
	contact: IContact;
}

const ContactCard = ({ image, info, contact }: IContactCardProps) => {
	return (
		<ContactCardContext.Provider value={{ contact }}>
			<article className="col-span-4 grid grid-cols-12 gap-2 px-3 py-2 rounded-md overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-600 border dark:bg-gray-800 border-gray-400 cursor-pointer group">
				<div className="col-span-2">{image}</div>
				<div className="col-span-10">{info}</div>
			</article>


		</ContactCardContext.Provider>
	);
};

ContactCard.Title = ContactTitle;
ContactCard.Image = ContactImage;
// ContactCard.Status = ContactStatus;
ContactCard.Actions = ContactActions;

export default ContactCard;
