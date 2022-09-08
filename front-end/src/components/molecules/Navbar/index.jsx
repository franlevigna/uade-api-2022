import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserSession } from '../../../hooks/userSession';

export const Navbar = () => {
	const { isLogged } = useUserSession();
	const navigateTo = useNavigate();

	const handleRegisterRedirection = () => {
		navigateTo('/register');
	};
	const handleLoginRedirection = () => {
		navigateTo('/login');
	};
	return (
		<AppBar>
			<Toolbar>
				<Typography>
					<img
						height='40 px'
						alt='Profe flix'
						src='\assets\profeFlix.svg'
					></img>
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				{!isLogged && (
					<Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
						<Button onClick={handleLoginRedirection}>
							Iniciar Sesion
						</Button>
						<Button onClick={handleRegisterRedirection}>
							Registrarse
						</Button>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
};
