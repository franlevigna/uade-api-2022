import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Rating,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { textMapper } from '../../../utils/enums';

export const ClassCard = ({
	id,
	name,
	professorName,
	duration,
	type,
	rating,
	cost,
	frequency,
	description,
	subject,
}) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent sx={{ position: 'relative' }}>
				<Button
					sx={{
						position: 'absolute',
						top: 'initial',
						right: '1rem',
					}}
					component={Link}
					size='small'
					to={`/class/${id}`}
				>
					Ver mas
				</Button>
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
				<Typography sx={{ mb: 1.5 }} color='text.disabled'>
					{subject}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color='text.secondary'>
					{`${duration}hs`} - {textMapper[frequency]} -{' '}
					{textMapper[type]}
				</Typography>
				<Typography noWrap variant='body2'>
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Rating
					sx={{ flexGrow: 1 }}
					name='read-only'
					value={rating}
					readOnly
					precision={0.5}
				/>

				<Box sx={{ flexGrow: 1 }} />
				<Typography mr={1}>
					{cost.includes('$') ? cost : `$${cost}`}
				</Typography>
			</CardActions>
		</Card>
	);
};
