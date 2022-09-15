import {
	Avatar,
	Box,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLogin } from '../../../hooks/login';
import { useUserSession } from '../../../hooks/userSession';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import { useUserProfile } from '../../../store/profile';

export const Login = () => {
	const { setUserData } = useUserProfile();
	const { loginMutation, isLoginLoading } = useLogin();
	const { storeAuthToken } = useUserSession();
	const handleSubmit = async (values) => {
		try {
			const {
				// eslint-disable-next-line camelcase
				data: { access_token, userInfo },
			} = await loginMutation({
				payload: values,
			});
			setUserData(userInfo);
			storeAuthToken(access_token);
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<img
						height='40 px'
						alt='Profe flix'
						src='\assets\profeFlix.svg'
					/>
				</Avatar>
				<Typography component='h1' variant='h5'>
					Inicio sesión
				</Typography>
				<Box
					component='form'
					noValidate
					sx={{ mt: 1 }}
					onSubmit={formik.handleSubmit}
				>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						name='email'
						autoComplete='email'
						autoFocus
						value={formik.values.email}
						onChange={formik.handleChange}
						disabled={isLoginLoading}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Contraseña'
						type='password'
						id='password'
						autoComplete='current-password'
						value={formik.values.password}
						disabled={isLoginLoading}
						onChange={formik.handleChange}
					/>
					<LoadingButton
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
						loading={isLoginLoading}
					>
						Iniciar sesión
					</LoadingButton>
					<Grid container>
						<Grid item xs>
							<Link
								component={RouterLink}
								to='/forgot-password'
								variant='body2'
							>
								¿Olvidaste tu contraseña?
							</Link>
						</Grid>
						<Grid item>
							<Link
								component={RouterLink}
								to='/register'
								variant='body2'
							>
								¿No tenes cuenta? Registrate
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
