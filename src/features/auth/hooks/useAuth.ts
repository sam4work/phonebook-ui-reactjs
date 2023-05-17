import { IErrorObject } from "@/features/contacts/types"
import apiClient from "@/lib/axiosClient"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'



interface IAuthCredentialProps {
	email:string,
	password:string,
	name?:string,
	password_confirmation?:string,
}

const useAuth = (middleware:string,redirectPath?:string) => {

	const navigateTo = useNavigate();
	const [errors, setErrors] = useState<IErrorObject>({});


const {data:user, error, mutate } = useSWR("/api/user",async () => {
	try{
		return (await apiClient.get("/api/user")).data
	}catch(e){
		if(isAxiosError(e)) throw e
	}
})




	const csrf = () => apiClient.get("sanctum/csrf-cookie");

	const register = async (data : FormData) => {
		await csrf()
		try {
			await apiClient.post("/register", data)
			mutate()
		} catch (e) {
			if (isAxiosError(e) && e.response) {
				setErrors(e.response.data.errors)
				throw e
			}
		}

	}

	const login = async (data : FormData) => {
		await csrf()
		try {
			const result = await apiClient.post("/login", data)

			if(result.status === 204) mutate()

		} catch (e) {

			if (isAxiosError(e) && e.response) {
				console.log(e.response.data)
				setErrors(e.response.data.errors)
				throw e
			}
		}
	}

	const logout = async () => {
		if (!error) {
			await apiClient.post("/logout").then(() => mutate())
		}
		window.location.pathname = "/login"
	}


	useEffect(() => {

		// Redirect to dashboard if user is already authenticated
		if (middleware === "public" && redirectPath && user) {
			navigateTo(redirectPath ?? "/dashboard")
		}
	
		// Log user out when unauthorized
		if (middleware === "auth" && error)  logout()	
		
	}, [user,error])


		return {
			login,
			user,
			error,
			errors,
			logout,
			register
		}
}

export default useAuth