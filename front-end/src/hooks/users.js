import { useMutation } from '@tanstack/react-query';

import {
	changePassword,
	forgotPassword,
	updateUser,
} from '../services/CRUD/users';

export const useUpdateUser = () => {
	const { mutateAsync: updateUserMutation, isLoading: isUpdateUserLoading } =
		useMutation(({ payload }) => updateUser(payload));

	return { updateUserMutation, isUpdateUserLoading };
};

export const useForgotPassword = () => {
	const {
		mutateAsync: forgotPasswordMutation,
		isLoading: isForgotPasswordLoading,
	} = useMutation(({ payload }) => forgotPassword(payload));

	return { forgotPasswordMutation, isForgotPasswordLoading };
};

export const useChangePassword = () => {
	const {
		mutateAsync: changePasswordMutation,
		isLoading: isChangePasswordLoading,
	} = useMutation(({ payload }) => changePassword(payload));

	return { changePasswordMutation, isChangePasswordLoading };
};
