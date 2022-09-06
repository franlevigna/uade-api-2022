import { Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ClassCard } from '../../molecules/ClassCard';
import { Hero } from '../../molecules/Hero';
export const GridWrapper = styled('div')`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-auto-rows: 1fr;
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
`;

const classes = [
	{
		id: 'c65f5852-b2f8-4c14-a07c-f143883c8222',
		professorName: 'Lion Jouhandeau',
		name: 'Reyna Inde',
		cost: '$76.93',
		frequency: 'semanal',
		duration: 1,
		rating: 1,
	},
	{
		id: '0015f21b-148e-4a53-af4c-bf622638b9e6',
		professorName: 'Andi Burk',
		name: 'Ilka Johannes',
		cost: '$29.88',
		frequency: 'mensual',
		duration: 2,
		rating: 2,
	},
	{
		id: 'e646d746-f934-4784-9efe-d04a925f5930',
		professorName: 'Tanney Hinchon',
		name: 'Llewellyn Christescu',
		cost: '$84.91',
		frequency: 'bi-semanal',
		duration: 3,
		rating: 3,
	},
	{
		id: 'e54513a2-e4a9-4eff-9ea5-4091af77deab',
		professorName: 'Eden Deaconson',
		name: 'Stefa Holme',
		cost: '$8.02',
		frequency: 'unica',
		duration: 4,
		rating: 4,
	},
];

export const Home = () => {
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
				{classes.map((c) => (
					<Grid key={c.id} item xs={12} sm={6} md={4}>
						<ClassCard
							{...{
								id: c.id,
								professorName: c.professorName,
								name: c.name,
								cost: c.cost,
								frequency: c.frequency,
								duration: c.duration,
								rating: c.rating,
							}}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};
