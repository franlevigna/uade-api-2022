import {
	AppBar,
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
	useNavigate,
	Link as RouterLink,
	Link,
	useLocation,
} from 'react-router-dom';
import { useUserSession } from '../../../hooks/userSession';
import { useUserProfile } from '../../../store/profile';
import { SearchInput } from '../../molecules/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import SchoolIcon from '@mui/icons-material/School';

import { Nottifications } from '../../molecules/Notifications';
import { userRoles } from '../../../utils/enums';
export const Navbar = () => {
	const { isLogged, logOut } = useUserSession();
	const { user } = useUserProfile();
	const navigateTo = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		isDrawerOpen && toggleDrawer();
	}, [location]);

	const handleRegisterRedirection = () => {
		navigateTo('/register');
	};
	const handleLoginRedirection = () => {
		navigateTo('/login');
	};

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const pages = [
		{
			route: '/',
			icon: <HomeIcon />,
			label: 'Institucional',
		},
		{
			route: '/user/profile',
			icon: <AccountCircleIcon />,
			label: 'Perfil',
		},
		{
			route: '/user/classes',
			icon: <SchoolIcon />,
			label: 'Mis clases',
		},
	];

	const actions = [
		{
			icon: <NoAccountsIcon />,
			label: 'Cerrar sesión',
			onClick: () => {
				logOut();
			},
		},
	];

	return (
		<AppBar>
			<Toolbar>
				<Link component={RouterLink} to='/'>
					<img
						height='40 px'
						alt='Profe flix'
						src='\assets\profeFlix.svg'
					/>
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
				{isLogged && (
					<>
						{user?.userType === userRoles.STUDENT && (
							<Nottifications userID={user?.id} />
						)}
						<IconButton onClick={toggleDrawer}>
							<Avatar>
								{user.firstName[0]}
								{user.lastName[0]}
							</Avatar>
						</IconButton>
						<Drawer
							anchor='right'
							open={isDrawerOpen}
							onClose={toggleDrawer}
						>
							<List>
								{pages.map(({ label, icon, route }, index) => (
									<ListItem
										button
										to={route}
										key={index}
										disablePadding
										component={Link}
									>
										<ListItemButton
											selected={
												location.pathname === route
											}
										>
											<ListItemIcon>{icon}</ListItemIcon>
											<ListItemText primary={label} />
										</ListItemButton>
									</ListItem>
								))}
							</List>
							<Divider />
							<List>
								{actions.map(
									(
										{ label, icon, route, onClick },
										index
									) => (
										<ListItem
											button
											key={index}
											disablePadding
											onClick={onClick}
										>
											<ListItemButton>
												<ListItemIcon>
													{icon}
												</ListItemIcon>
												<ListItemText primary={label} />
											</ListItemButton>
										</ListItem>
									)
								)}
							</List>
						</Drawer>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};
