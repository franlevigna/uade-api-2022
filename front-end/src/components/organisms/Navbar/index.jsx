import { AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useUserSession } from '../../../hooks/userSession';
import { SearchInput } from '../../molecules/Search';

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
				<Link component={RouterLink} to='/'>
					<img
						height='40 px'
						alt='Profe flix'
						src='\assets\profeFlix.svg'
					></img>
				</Link>

				<Box sx={{ flexGrow: 1 }} />
				<SearchInput />
				<Box sx={{ flexGrow: 1 }} />
				{!isLogged && (
					<Box sx={{ display: { xs: 'block', md: 'flex' } }}>
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
