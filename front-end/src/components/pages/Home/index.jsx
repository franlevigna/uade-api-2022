import { Divider, Grid, Typography } from '@mui/material';
import { useGetClasses } from '../../../hooks/classes';

import { ClassCard } from '../../molecules/ClassCard';
import { Hero } from '../../molecules/Hero';

export const Home = () => {
	const { dataGetClasses } = useGetClasses();
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
				{dataGetClasses?.data.map((c) => (
					<Grid key={c.id} item xs={12} sm={6} md={4}>
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
		</>
	);
};
