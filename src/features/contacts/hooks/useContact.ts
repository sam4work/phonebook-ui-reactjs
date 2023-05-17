
import { useState } from "react";
import apiClient from "@src/lib/axiosClient";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { IErrorObject, IPaginatedResponse } from "../types";


const RESOURSE_URL = "/api/contacts"


const useContact = () => {


const [searchParams] =  useSearchParams()
const [errors, setErrors] = useState<IErrorObject>({});
const [isLoading, setIsLoading] = useState<boolean>(true);
const [contacts, setContacts] = useState<IPaginatedResponse>();



const makeApiRequest = async (params: AxiosRequestConfig  ) => {
	setIsLoading(true)
	setErrors({})
	try {
		return 	await apiClient({...params})
	} catch (e) {
		if (isAxiosError(e)) {
			setErrors(e.response?.data.errors)
		}
		throw e
	}finally{
		setIsLoading(false)
	}
}

// Create New Contact
const get = async (params : {[key:string] : string} = {},url  = "") => {

	const res = await makeApiRequest({
		url : RESOURSE_URL+url,
		method : "GET",
		params : params
	})

	setContacts(res.data)
	
}

// Create New Contact
const create = async ( data : FormData  ) => {

	await makeApiRequest({
		url : `${RESOURSE_URL}`,
		method : "POST",
		data : data,
		headers: {
			"Content-Type": "application/json"
		}
	});
}

// Update Existing Contact
const update = async (contact : {[key:string] : string | number} , data : FormData ) => {

return await makeApiRequest({
	url : `${RESOURSE_URL}/${contact.id}`,
	method : "PUT",
	data: data,
	headers: {
		"Content-Type": "application/json"
	}
});


}

// Delete Contact
const remove = async (id : string) => {
		const result = await makeApiRequest({
			url:`${RESOURSE_URL}/${id}`,
			method : "DELETE",  
		});
		
		await get(
			Object.fromEntries(searchParams.entries()) ?? null
		)

		return result;

}

	return {
		contacts,
		remove,
		create,
		update,
		get,
		isLoading,
		errors
	}
}


export default useContact