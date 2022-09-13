import { Divider, Grid, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ClassCard } from '../../molecules/ClassCard';
import { FiltersDrawer } from '../../molecules/Drawer';
import queryString from 'query-string';
import { useGetClasses } from '../../../hooks/classes';
import { Loading } from '../../molecules/Loading';

export const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const container = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const initialQuery = searchParams.get('q');
	const location = useLocation();
	const parsedQuery = queryString.parse(location.search);
	const resetQueries = location.state?.resetQueries;

	const navigateTo = useNavigate();
	const { dataGetClasses, refetchGetClasess, isDataGetClassesLoading } =
		useGetClasses(parsedQuery);
	const handleFiltering = (querySearch) => {
		const newLocation = {
			pathname: '/class/search',
			search: querySearch,
		};
		navigateTo(newLocation);
	};

	const handleDrawerToggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		refetchGetClasess();
	}, [location.search]);

	return (
		<div ref={container} style={{ position: 'relative' }}>
			<FiltersDrawer
				{...{
					container,
					isOpen,
					handleDrawerToggle,
					handleFiltering,
					initialQuery,
					resetQueries,
					parsedQuery,
				}}
			>
				<Typography
					variant={'h4'}
				>{`Resultados para: ${initialQuery}`}</Typography>
				<Divider sx={{ marginBottom: '1rem' }} />
				<Grid
					container
					rowSpacing={{ xs: 2, sm: 2, md: 3 }}
					columnSpacing={{ xs: 2, sm: 2, md: 3 }}
				>
					{dataGetClasses?.data.map((c) => (
						<Grid key={c.id} item xs={12} sm={12} md={12}>
							<ClassCard
								{...{
									id: c.id,
									professorName: c.professor.name,
									name: c.name,
									cost: c.cost,
									frequency: c.frequency,
									duration: c.duration,
									rating: c.rating,
									type: c.type,
									description: c.description,
								}}
							/>
						</Grid>
					))}
				</Grid>
			</FiltersDrawer>
			<Loading loading={isDataGetClassesLoading} />
		</div>
	);
};
