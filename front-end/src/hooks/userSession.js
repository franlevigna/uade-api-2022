import { useCookies } from 'react-cookie';
export const useUserSession = () => {
	const [authCookie, setAuthCookie, removeAuthCookie] = useCookies([
		'accessToken',
	]);

	return {
		isLogged: Boolean(authCookie.accessToken),
		storeAuthToken: (token) => [
			setAuthCookie('accessToken', token, { path: '/', secure: true }),
		],
		logOut: () => {
			removeAuthCookie('accessToken', { path: '/' });
		},
	};
};
