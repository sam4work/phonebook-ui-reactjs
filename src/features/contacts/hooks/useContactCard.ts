import { useContext } from "react";
import ContactCardContext from "../contexts/ContactContext";

export function useContactCardContext() {
	
	const context = useContext(ContactCardContext);

	if (!context) throw new Error("Unable to load product context.");
	return context;
}