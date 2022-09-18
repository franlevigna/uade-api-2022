import { useQuery, useMutation } from '@tanstack/react-query';
import {
	getClassByID,
	getClasses,
	createClass,
	getClassesByUser,
	updateClass,
	deleteClass,
	hireClass,
	reviewClass,
	updateReview,
	getReviewsByProfessorID,
	getUserNotifications,
} from '../services/CRUD/classes';

export const useGetClasses = (parsedQuery) => {
	const {
		refetch: refetchGetClasess,
		data: dataGetClasses,
		isLoading: isDataGetClassesLoading,
		error,
	} = useQuery(
		parsedQuery ? ['getClasses', parsedQuery] : ['getClasses'],
		() => getClasses(parsedQuery),
		{
			enabled: true,
		}
	);
	return {
		refetchGetClasess,
		dataGetClasses,
		isDataGetClassesLoading,
		error,
	};
};

export const useGetClassByID = (classID) => {
	const {
		refetch: refetchGetClassByID,
		data: dataGetClassByID,
		isLoading: isDataGetClassByIDLoading,
		error,
	} = useQuery(['getClass', classID], () => getClassByID(classID), {
		enabled: true,
	});
	return {
		refetchGetClassByID,
		dataGetClassByID,
		isDataGetClassByIDLoading,
		error,
	};
};

export const useCreateClass = () => {
	const {
		mutateAsync: createClassMutation,
		isLoading: isCreateClassLoading,
	} = useMutation(({ payload }) => createClass(payload));

	return {
		createClassMutation,
		isCreateClassLoading,
	};
};

export const useUpdateClass = () => {
	const {
		mutateAsync: updateClassMutation,
		isLoading: isUpdateClassLoading,
	} = useMutation(({ id, payload }) => updateClass(id, payload));

	return {
		updateClassMutation,
		isUpdateClassLoading,
	};
};

export const useDeleteClass = () => {
	const {
		mutateAsync: deleteClassMutation,
		isLoading: isDeleteClassLoading,
	} = useMutation(({ id }) => deleteClass(id));

	return {
		deleteClassMutation,
		isDeleteClassLoading,
	};
};

export const useHireClass = () => {
	const { mutateAsync: hireClassMutation, isLoading: isHireClassLoading } =
		useMutation(({ payload }) => hireClass(payload));
	return { hireClassMutation, isHireClassLoading };
};

export const useReviewClass = () => {
	const {
		mutateAsync: reviewClassMutation,
		isLoading: isReviewClassLoading,
	} = useMutation(({ payload }) => reviewClass(payload));
	return { reviewClassMutation, isReviewClassLoading };
};

export const useGetReviewsByProfessorID = (proffesorID) => {
	const {
		refetch: refetchGetReviewsByProffesorID,
		data: dataGetReviewsByProfessorID,
		isLoading: isGetReviewsByProfessorIDLoading,
	} = useQuery(
		['getReviewsByProffesor', proffesorID],
		() => getReviewsByProfessorID(proffesorID),
		{
			enabled: true,
		}
	);

	return {
		refetchGetReviewsByProffesorID,
		dataGetReviewsByProfessorID,
		isGetReviewsByProfessorIDLoading,
	};
};

export const useUpdateReview = () => {
	const {
		mutateAsync: updateReviewsMutation,
		isLoading: isUpdateReviewLoading,
	} = useMutation(({ id, payload }) => updateReview(id, payload));
	return { updateReviewsMutation, isUpdateReviewLoading };
};

export const useGetClassesByUser = (userID, userRole) => {
	const {
		refetch: refetchGetClassByUser,
		data: dataGetClassByUser,
		isLoading: isDataGetClassByUserLoading,
		error,
	} = useQuery(
		['getClass', userID, userRole],
		() => getClassesByUser(userID, userRole),
		{
			enabled: true,
		}
	);
	return {
		refetchGetClassByUser,
		dataGetClassByUser,
		isDataGetClassByUserLoading,
		error,
	};
};

export const useGetNotificationsByUser = (userID) => {
	const {
		refetch: refetchGetNotificationsByUser,
		data: dataGetNotificationsByUser,
		isLoading: isDataGetNotificationsByUserLoading,
		error,
	} = useQuery(
		['getNotifications', userID],
		() => getUserNotifications(userID),
		{
			enabled: true,
		}
	);
	return {
		refetchGetNotificationsByUser,
		dataGetNotificationsByUser,
		isDataGetNotificationsByUserLoading,
		error,
	};
};
