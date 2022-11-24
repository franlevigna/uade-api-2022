import { useMutation, useQuery } from '@tanstack/react-query';
import {
	getProffesorHirings,
	hireClass,
	updateHiredClass,
} from '../services/CRUD/subscriptions';

export const useGetStudentsByProfessor = (userID) => {
	const {
		refetch: refetchGetStudentsByProfessor,
		data: dataGetStudentsByProfessor,
		isLoading: isDataGetStudentsByProfessorLoading,
		error,
	} = useQuery(['getStudentsBy', userID], () => getProffesorHirings(), {
		enabled: true,
	});
	return {
		refetchGetStudentsByProfessor,
		dataGetStudentsByProfessor,
		isDataGetStudentsByProfessorLoading,
		error,
	};
};
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
