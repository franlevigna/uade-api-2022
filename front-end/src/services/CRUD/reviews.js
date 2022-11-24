import { crudProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_CRUD_BASE_URL}reviews`;
export const reviewClass = (payload) => {
	return crudProfeFlix.post(`${BASE_URL}/create`, payload);
};

export const updateReview = (reviewID, payload) => {
	return crudProfeFlix.patch(`${BASE_URL}/update/${reviewID}`, payload);
};

export const getReviewsByProfessorID = () => {
	return crudProfeFlix.get(`${BASE_URL}/professor`);
};

// Now is checking if any comment is in status blocked
export const getUserNotifications = () => {
	return crudProfeFlix.get(`${BASE_URL}/student`);
};
