import { Navigate, Outlet } from 'react-router-dom';
import { useUserSession } from '../../hooks/userSession';

export const AuthlessRoute = () => {
	const { isLogged } = useUserSession();
	return !isLogged ? <Outlet /> : <Navigate to='/' replace />;
};
