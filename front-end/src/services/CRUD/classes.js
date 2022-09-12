import { userRoles } from '../../utils/enums';
import { crudProfeFlix } from './axios.config';

const BASE_URL = `${import.meta.env.VITE_CRUD_BASE_URL}classes`;

export const getClasses = (parsedQuery) => {
	const params = {
		name_like: parsedQuery?.q || null,
		type: parsedQuery?.classType || null,
		frequency: parsedQuery?.frequency || null,
		rating_gte: parsedQuery?.rating || null,
	};
	return crudProfeFlix.get(BASE_URL, { params });
};

export const getClassByID = (classID) => {
	return crudProfeFlix.get(`${BASE_URL}/${classID}`);
};

export const createClass = (payload) => {
	return crudProfeFlix.post(BASE_URL, payload);
};

export const getClassesByUser = (userID, userRole) => {
	const professorParams = {
		'professor.id': userID,
	};
	const studentParms = {
		_embed: 'students',
		id: userID,
	};
	const params =
		userRole === userRoles.PROFESSOR ? professorParams : studentParms;
	return crudProfeFlix.get(BASE_URL, { params });
};
