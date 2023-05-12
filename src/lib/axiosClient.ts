import axios from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_API_URL,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		"Accept": "application/json",
	},
	withCredentials: true,
});

export default apiClient;
