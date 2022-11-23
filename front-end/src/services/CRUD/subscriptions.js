import { crudProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_CRUD_BASE_URL}subscriptions`;
export const hireClass = (payload) => {
	return crudProfeFlix.post(`${BASE_URL}/create`, payload);
};

export const updateHiredClass = (classID, payload) => {
	return crudProfeFlix.patch(`${BASE_URL}/update/${classID}`, payload);
};
