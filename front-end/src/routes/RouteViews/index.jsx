import { Route, Routes } from 'react-router-dom';
import { ClassDetail } from '../../components/pages/ClassDetail';
import { Home } from '../../components/pages/Home';
import { Login } from '../../components/pages/Login';

import { Register } from '../../components/pages/Register';
import { SearchResults } from '../../components/pages/SearchReults';
import { UserProfile } from '../../components/pages/UserProfile';
import { ProtectedRoute } from '../ProtectedRoute';

import { CreateClass } from '../../components/pages/CreateClass';
import { UserClasses } from '../../components/pages/UserClasses';

export const RouteViews = () => {
	return (
		<Routes>
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<Home />} />
			<Route element={<ProtectedRoute />}>
				<Route path='/user/profile' element={<UserProfile />} />
				<Route path='/class/search' element={<SearchResults />} />
				<Route path='/class/:classID' element={<ClassDetail />} />
				<Route path='/class/create' element={<CreateClass />} />
				<Route path='/user/classes' element={<UserClasses />} />
			</Route>
		</Routes>
	);
};
