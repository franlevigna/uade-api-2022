import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_BASE_URL}auth/register`;

export const register = (payload) => {
	return axios.post(BASE_URL, payload);
};
