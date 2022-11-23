import { crudProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_CRUD_BASE_URL}lessons`;

export const getClasses = (parsedQuery) => {
	const params = {
		title: parsedQuery?.q || null,
		type: parsedQuery?.classType || null,
		frequency: parsedQuery?.frequency || null,
		ratingg: parsedQuery?.rating || null,
		subject: parsedQuery?.subject || null,
	};
	return crudProfeFlix.get(`${BASE_URL}/search`, { params });
};

export const getClassByID = (classID) => {
	return crudProfeFlix.get(`${BASE_URL}/${classID}`);
};

export const createClass = (payload) => {
	return crudProfeFlix.post(`${BASE_URL}/create`, payload);
};

export const updateClass = (classID, payload) => {
	return crudProfeFlix.patch(`${BASE_URL}/update/${classID}`, payload);
};

export const deleteClass = (classID) => {
	return crudProfeFlix.delete(`${BASE_URL}/delete/	${classID}`);
};

export const getClassesByUser = (userID) => {
	return crudProfeFlix.get(`${BASE_URL}/user/${userID}`);
};

export const getStudentsByProfessorId = (userID) => {
	return crudProfeFlix.get(`${BASE_URL}/professor/${userID}/students`);
};
