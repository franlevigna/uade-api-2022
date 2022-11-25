import { Divider, Grid, Typography } from '@mui/material';
import { useGetClasses } from '../../../hooks/classes';

import { ClassCard } from '../../molecules/ClassCard';
import { Hero } from '../../molecules/Hero';
import { Loading } from '../../molecules/Loading';

export const Home = () => {
	const { dataGetClasses, isDataGetClassesLoading } = useGetClasses();
	return (
		<>
			<Hero />
			<Typography variant='h6' gutterBottom>
				Clases disponibles
			</Typography>
			<Divider sx={{ marginBottom: '1rem' }} />
			<Grid
				container
				rowSpacing={{ xs: 2, sm: 2, md: 3 }}
				columnSpacing={{ xs: 2, sm: 2, md: 3 }}
			>
				<Loading loading={isDataGetClassesLoading} />
				{dataGetClasses?.data.data.map((c) => (
					<Grid key={c.id} item xs={12} sm={12} md={6}>
						<ClassCard
							{...{
								id: c.id,
								professorName: `${c.user.firstName} ${c.user.lastName}`,
								name: c.title,
								cost: c.cost,
								frequency: c.frequency,
								duration: c.duration,
								rating: c.averageRating,
								type: c.type,
								description: c.description,
								subject: c.subject,
								img: c.image,
							}}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};
