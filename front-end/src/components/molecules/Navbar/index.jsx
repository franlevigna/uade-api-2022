import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export const Navbar = () => {
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
				<Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
					<Button>Iniciar Sesion</Button>
					<Button>Registrarse</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
