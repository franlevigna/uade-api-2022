import axios from 'axios';
import { getCookie } from '../../utils';

export const crudProfeFlix = axios.create();
const accessToken = getCookie('accessToken');
console.log(accessToken);
crudProfeFlix.interceptors.request.use(function (config) {
	const accessToken = getCookie('accessToken');
	config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
	return config;
});
