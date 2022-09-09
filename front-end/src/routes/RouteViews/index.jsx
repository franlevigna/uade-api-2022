import { Route, Routes } from 'react-router-dom';
import { Home } from '../../components/pages/Home';
import { Login } from '../../components/pages/Login';
import { Register } from '../../components/pages/Register';
import { SearchResults } from '../../components/pages/SearchReults';
import { UserProfile } from '../../components/pages/UserProfile';
import { ProtectedRoute } from '../ProtectedRoute';

export const RouteViews = () => {
	return (
		<Routes>
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<Home />} />
			<Route element={<ProtectedRoute />}>
				<Route path='/profile' element={<UserProfile />} />
				<Route path='/search' element={<SearchResults />} />
			</Route>
		</Routes>
	);
};
