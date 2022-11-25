import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Rating,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import { textMapper } from '../../../utils/enums';
import imageFallback from '../../../../assets/lesson.png';

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
	img,
}) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent sx={{ position: 'relative' }}>
				<Grid container columnSpacing={3}>
					<Grid
						sm={3}
						item
						sx={{
							display: {
								xs: 'none',
								sm: 'unset',
								alignSelf: 'stretch',
							},
						}}
					>
						<CardMedia
							component='img'
							sx={{ height: '100%' }}
							image={img || imageFallback}
							alt=''
						/>
					</Grid>
					<Grid item>
						<Stack>
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
						</Stack>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Rating
					sx={{ flexGrow: 1 }}
					name='read-only'
					value={rating ? parseInt(rating) : 0}
					readOnly
					precision={0.5}
				/>

				<Box sx={{ flexGrow: 1 }} />
				<Typography mr={1}>
					{cost.toString().includes('$') ? cost : `$${cost}`}
				</Typography>
			</CardActions>
		</Card>
	);
};
