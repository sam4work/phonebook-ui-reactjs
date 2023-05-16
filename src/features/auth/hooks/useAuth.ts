import apiClient from "@/lib/axiosClient"
import { isAxiosError } from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'


interface IUseAuthProps {
	middleware: string,
	redirectPath?:  string
}

interface IAuthCredentialProps {
	email:string,
	password:string,
	name?:string,
	password_confirmation?:string,
}

const useAuth = (middleware:string,redirectPath?:string) => {

	const navigateTo = useNavigate();

const {data:user, error, mutate } = useSWR("/api/user",async () => {
	try{
		return (await apiClient.get("/api/user")).data
	}catch(e){
		if(isAxiosError(e)) throw e
	}
})




	const csrf = () => apiClient.get("sanctum/csrf-cookie");



	const login = async ({email,password} : IAuthCredentialProps,setErrors: (e: string) => void) => {
		await csrf()
		try {
			const loginResponse = await apiClient.post("/login", {email,password})
			mutate()
		} catch (e) {

			if (isAxiosError(e) && e.response) {
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
			logout
		}
}

export default useAuth