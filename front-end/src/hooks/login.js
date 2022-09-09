import { useMutation } from '@tanstack/react-query';
import { login } from '../services/Auth/login';

export const useLogin = () => {
	const {
		mutateAsync: loginMutation,
		isLoading: isLoginLoading,
		error: loginError,
	} = useMutation(({ payload }) => login(payload));

	return { loginMutation, isLoginLoading, loginError };
};
