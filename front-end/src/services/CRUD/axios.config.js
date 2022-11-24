import axios from 'axios';
import { getCookie } from '../../utils';

export const crudProfeFlix = axios.create();

crudProfeFlix.interceptors.request.use(function (config) {
	const accessToken = getCookie('accessToken');
	config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
	return config;
});
