import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';

export const Hero = () => {
	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				pt: 3,
				pb: 3,
			}}
		>
			<Container maxWidth='sm'>
				<Typography
					component='h1'
					variant='h2'
					align='center'
					color='text.primary'
					gutterBottom
				>
					<img
						height='150px'
						alt='Profe flix'
						src='\assets\profeFlix.svg'
					/>
				</Typography>
				<Typography
					variant='h5'
					align='center'
					color='text.secondary'
					paragraph
				>
					En esta aplicacion podras encontrar el profesor ideal, como
					asi tambien a tu alumno ideal
				</Typography>
			</Container>
		</Box>
	);
};
