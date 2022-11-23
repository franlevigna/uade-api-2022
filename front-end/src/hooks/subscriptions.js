import { useMutation } from '@tanstack/react-query';
import { hireClass, updateHiredClass } from '../services/CRUD/subscriptions';

export const useHireClass = () => {
	const { mutateAsync: hireClassMutation, isLoading: isHireClassLoading } =
		useMutation(({ payload }) => hireClass(payload));
	return { hireClassMutation, isHireClassLoading };
};

export const useUpdateHiredClass = () => {
	const {
		mutateAsync: updateHiredClassMutation,
		isLoading: isUpdateHiredClassLoading,
	} = useMutation(({ id, payload }) => updateHiredClass(id, payload));
	return { updateHiredClassMutation, isUpdateHiredClassLoading };
};
