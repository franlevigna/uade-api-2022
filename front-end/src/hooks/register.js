import { useMutation } from '@tanstack/react-query';
import { register } from '../services/register';
export const useRegister = () => {
	const {
		mutateAsync: registerMutation,
		isLoading: isRegisterLoading,
		error: registerError,
	} = useMutation(({ payload }) => register(payload));

	return { registerMutation, isRegisterLoading, registerError };
};
