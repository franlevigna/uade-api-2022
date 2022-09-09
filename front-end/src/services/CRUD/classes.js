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
