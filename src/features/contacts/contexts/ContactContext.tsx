import { createContext } from "react";
import { IContact } from "../types";

const ContactCardContext = createContext<{ contact: IContact } | null>(null);


export default ContactCardContext;
