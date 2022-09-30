import { userRoles } from '../../utils/enums';
import { crudProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_CRUD_BASE_URL}classes`;

export const getClasses = (parsedQuery) => {
	const params = {
		name_like: parsedQuery?.q || null,
		type: parsedQuery?.classType || null,
		frequency: parsedQuery?.frequency || null,
		rating_gte: parsedQuery?.rating || null,
		subject_like: parsedQuery?.subject || null,
		status: 'published',
		_sort: 'id',
		_order: 'desc',
	};
	return crudProfeFlix.get(BASE_URL, { params });
};

export const getClassByID = (classID) => {
	const params = {
		_embed: ['classes_students', 'classes_reviews'],
	};
	return crudProfeFlix.get(`${BASE_URL}/${classID}`, { params });
};

export const createClass = (payload) => {
	return crudProfeFlix.post(BASE_URL, payload);
};

export const updateClass = (classID, payload) => {
	return crudProfeFlix.patch(`${BASE_URL}/${classID}`, payload);
};

export const deleteClass = (classID) => {
	return crudProfeFlix.delete(`${BASE_URL}/${classID}`);
};

export const getClassesByUser = (userID, userRole) => {
	const urlPath = userRole === userRoles.PROFESSOR ? 'professor' : 'student';

	return crudProfeFlix.get(`${BASE_URL}/${urlPath}/${userID}`);
};

export const getStudentsByProfessorId = (userID) => {
	return crudProfeFlix.get(`${BASE_URL}/professor/${userID}/students`);
};

export const hireClass = (payload) => {
	return crudProfeFlix.post(`${BASE_URL}_students`, payload);
};

export const updateHiredClass = (classID, payload) => {
	return crudProfeFlix.patch(`${BASE_URL}_students/${classID}`, payload);
};

export const reviewClass = (payload) => {
	return crudProfeFlix.post(`${BASE_URL}_reviews`, payload);
};

export const updateReview = (reviewID, payload) => {
	return crudProfeFlix.patch(`${BASE_URL}_reviews/${reviewID}`, payload);
};

export const getReviewsByProfessorID = (proffesorID) => {
	return crudProfeFlix.get(`${BASE_URL}_reviews/professor/${proffesorID}`);
};

// Now is checking if any comment is in status blocked, later should be in user endpoint
export const getUserNotifications = (userID) => {
	return crudProfeFlix.get(
		`${BASE_URL}_reviews?userId=${userID}&comment.status=blocked&_expand=class`
	);
};
