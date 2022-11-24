import { crudProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_CRUD_BASE_URL}users`;

export const updateUser = (payload) => {
	return crudProfeFlix.patch(`${BASE_URL}/update`, payload);
};

export const forgotPassword = (payload) => {
	return crudProfeFlix.post(`${BASE_URL}/forgot-password`, payload);
};

export const changePassword = (payload) => {
	return crudProfeFlix.patch(`${BASE_URL}/change-password`, payload);
};
