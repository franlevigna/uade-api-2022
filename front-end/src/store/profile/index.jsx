import { createContext, useContext, useEffect, useState } from 'react';
import { useUserSession } from '../../hooks/userSession';

import { Storage } from '../../utils/storage';
import { USER_INFO } from '../../utils/storage/keyNames';

const initialData = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	userType: '',
};
const [userCache, saveUserInCache, removeUser] = Storage(USER_INFO, true);
const UserProfileCtx = createContext(userCache || initialData.user);
export const UserProfileProvider = ({ children }) => {
	const [user, setUser] = useState(userCache);
	const { isLogged } = useUserSession();

	useEffect(() => {
		if (user?.email) {
			saveUserInCache(user);
		}
	}, [user]);

	useEffect(() => {
		if (userCache && !user) {
			setUser(userCache);
		}
	}, []);

	useEffect(() => {
		if (!isLogged) {
			removeUser();
			setUser(initialData);
		}
	}, [isLogged]);

	return (
		<UserProfileCtx.Provider value={{ user, setUser }}>
			{children}
		</UserProfileCtx.Provider>
	);
};

export const useUserProfile = () => {
	const { user, setUser } = useContext(UserProfileCtx);
	return {
		user,
		setUserData: (newData) => {
			setUser((prev) => ({ ...prev, ...newData }));
		},
	};
};
