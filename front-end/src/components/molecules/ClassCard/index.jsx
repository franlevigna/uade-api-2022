import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Rating,
	Typography,
} from '@mui/material';

export const ClassCard = ({
	name,
	professorName,
	duration,
	type,
	rating,
	cost,
	frequency,
}) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color='text.secondary'
					gutterBottom
				>
					{professorName}
				</Typography>
				<Typography variant='h5' component='div'>
					{name}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color='text.secondary'>
					{type} - {frequency}
				</Typography>
				<Typography variant='body2'>
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Rating
					sx={{ flexGrow: 1 }}
					name='read-only'
					value={rating}
					readOnly
				/>
				<Button size='small'>Ver mas</Button>
				<Box sx={{ flexGrow: 1 }} />
				<Typography>{cost}</Typography>
			</CardActions>
		</Card>
	);
};
