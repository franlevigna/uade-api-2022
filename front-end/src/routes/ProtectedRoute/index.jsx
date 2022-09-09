import { Outlet } from 'react-router-dom';
import { useUserSession } from '../../hooks/userSession';
import { Login } from '../../components/pages/Login';

export const ProtectedRoute = () => {
	const { isLogged } = useUserSession();
	return isLogged ? <Outlet /> : <Login />;
};
