import { createContext, useContext, useEffect, useState } from 'react';

import { Storage } from '../../utils/storage';
import { USER_INFO } from '../../utils/storage/keyNames';

const initialData = {
	user: {
		firstName: '',
		lastName: '',
		email: '',
		telNumber: '',
		userType: '',
	},
};
const [userCache, saveUserInCache] = Storage(USER_INFO, true);
const UserProfileCtx = createContext(userCache || initialData.user);
export const UserProfileProvider = ({ children }) => {
	const [user, setUser] = useState(userCache);

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
