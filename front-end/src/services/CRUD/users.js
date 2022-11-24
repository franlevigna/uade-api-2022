import { crudProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_CRUD_BASE_URL}users`;

export const updateUser = (payload) => {
	return crudProfeFlix.patch(`${BASE_URL}/update`, payload);
};
