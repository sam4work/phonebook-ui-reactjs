import { AxiosHeaderValue } from "axios";


export interface IErrorObject {
	[key: string]: string[];
}

export interface IPaginatedResponse {
	data: IContact[],
	links: {
		label: string;
		url: string | null;
		active: boolean;
	}[],
	from: string,
	first_page_url: string,
	last_page: string,
	last_page_url: string,
	total: string,
	current_page: string,
	per_page: string,
}


export interface IContact {
	id: string;
	first_name: string;
	last_name:string;
	date_for_humans: string;
	image?: string;
	phone: IPhoneNumber[]
}


export interface IPhoneNumber {
	id: string,
	type: string,
	sim_number: string,
	registered: boolean,
}

export interface IApiRequest {
	url : string
	method : string
	data? : {[key:string]: FormDataEntryValue | null},
	headers? : {[key:string] : AxiosHeaderValue}
	params? : {[key:string] : string}
}