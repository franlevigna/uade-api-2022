import { useQuery } from '@tanstack/react-query';
import { getClasses } from '../services/CRUD/classes';

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
