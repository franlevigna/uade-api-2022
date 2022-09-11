import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../services/CRUD/users';

export const useUpdateUser = () => {
	const { mutateAsync: updateUserMutation, isLoading: isUpdateUserLoading } =
		useMutation(({ id, payload }) => updateUser(id, payload));

	return { updateUserMutation, isUpdateUserLoading };
};
