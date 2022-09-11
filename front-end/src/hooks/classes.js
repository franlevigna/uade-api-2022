import {
	useQuery,
	useMutation
} from '@tanstack/react-query';
import {
	getClassByID,
	getClasses,
	createClass
} from '../services/CRUD/classes';

export const useGetClasses = (parsedQuery) => {
	const {
		refetch: refetchGetClasess,
		data: dataGetClasses,
		isLoading: isDataGetClassesLoading,
		error,
	} = useQuery(
		parsedQuery ? ['getClasses', parsedQuery] : ['getClasses'],
		() => getClasses(parsedQuery), {
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
	} = useMutation(({
		payload
	}) => createClass(payload));

	return {
		createClassMutation,
		isCreateClassLoading
	};
}