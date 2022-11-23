import { useMutation, useQuery } from '@tanstack/react-query';
import {
	getReviewsByProfessorID,
	getUserNotifications,
	reviewClass,
	updateReview,
} from '../services/CRUD/reviews';

export const useReviewClass = () => {
	const {
		mutateAsync: reviewClassMutation,
		isLoading: isReviewClassLoading,
	} = useMutation(({ payload }) => reviewClass(payload));
	return { reviewClassMutation, isReviewClassLoading };
};

export const useGetReviewsByProfessorID = () => {
	const {
		refetch: refetchGetReviewsByProffesorID,
		data: dataGetReviewsByProfessorID,
		isLoading: isGetReviewsByProfessorIDLoading,
	} = useQuery(['getReviewsByProffesor'], () => getReviewsByProfessorID(), {
		enabled: true,
	});

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

export const useGetNotificationsByUser = (userID) => {
	const {
		refetch: refetchGetNotificationsByUser,
		data: dataGetNotificationsByUser,
		isLoading: isDataGetNotificationsByUserLoading,
		error,
	} = useQuery(['getNotifications', userID], () => getUserNotifications(), {
		enabled: true,
	});
	return {
		refetchGetNotificationsByUser,
		dataGetNotificationsByUser,
		isDataGetNotificationsByUserLoading,
		error,
	};
};
