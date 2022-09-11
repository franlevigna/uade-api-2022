import { useCookies } from 'react-cookie';
export const useUserSession = () => {
	const [authCookie, setAuthCookie, removeAuthCookie] = useCookies([
		'access_token',
	]);

	return {
		isLogged: Boolean(authCookie.access_token),
		storeAuthToken: (token) => [
			setAuthCookie('access_token', token, { path: '/', secure: true }),
		],
		logOut: () => {
			removeAuthCookie('access_token');
		},
	};
};
