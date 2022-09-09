import { authProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}auth/register`;

export const register = (payload) => {
	return authProfeFlix.post(BASE_URL, payload);
};
