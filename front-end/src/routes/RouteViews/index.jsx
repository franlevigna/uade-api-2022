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
import { EditClass } from '../../components/pages/EditClass';
import { ForgotPassword } from '../../components/pages/ForgotPassword';
import { AuthlessRoute } from '../AuthlessRoute';

export const RouteViews = () => {
	return (
		<Routes>
			<Route element={<AuthlessRoute />}>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Route>
			<Route path='/' element={<Home />} />
			<Route path='/class/search' element={<SearchResults />} />
			<Route element={<ProtectedRoute />}>
				<Route path='/class/:classID' element={<ClassDetail />} />
				<Route path='/class/create' element={<CreateClass />} />
				<Route path='/class/edit/:classID' element={<EditClass />} />
				<Route path='/user/classes' element={<UserClasses />} />
				<Route path='/user/profile' element={<UserProfile />} />
			</Route>
		</Routes>
	);
};
