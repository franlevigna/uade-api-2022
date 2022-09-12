import {
	Avatar,
	Box,
	Container,
	FormControlLabel,
	FormLabel,
	Grid,
	Link,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useRegister } from '../../../hooks/register';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import { useUserSession } from '../../../hooks/userSession';
import database from '../../../../../fake-back-end/db.json';
import { useUserProfile } from '../../../store/profile';

export const Register = () => {
	const { storeAuthToken } = useUserSession();
	const { setUserData } = useUserProfile();
	const { registerMutation, isRegisterLoading } = useRegister();
	const navigateTo = useNavigate();

	const handleSubmit = async (values) => {
		try {
			const {
				// eslint-disable-next-line camelcase
				data: { access_token, userInfo },
			} = await registerMutation({ payload: values });

			userInfo.id = database.users.length + 1;
			setUserData(userInfo);
			storeAuthToken(access_token);
			Toast(
				'Tu usuario ha sido creado, ahora vamos a completar tu perfil!'
			);

			navigateTo('/user/profile');
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};
	const formik = useFormik({
		initialValues: {
			id: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			userType: '',
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
					Registracion
				</Typography>
				<Box
					component='form'
					noValidate
					onSubmit={formik.handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='given-name'
								name='firstName'
								required
								fullWidth
								id='firstName'
								label='Nombre'
								autoFocus
								value={formik.values.firstName}
								onChange={formik.handleChange}
								disabled={isRegisterLoading}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id='lastName'
								label='Apellido'
								name='lastName'
								autoComplete='family-name'
								value={formik.values.lastName}
								onChange={formik.handleChange}
								disabled={isRegisterLoading}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='email'
								label='Email'
								name='email'
								autoComplete='email'
								value={formik.values.email}
								onChange={formik.handleChange}
								disabled={isRegisterLoading}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='password'
								label='Contraseña'
								type='password'
								id='password'
								autoComplete='new-password'
								value={formik.values.password}
								onChange={formik.handleChange}
								disabled={isRegisterLoading}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormLabel id='demo-controlled-radio-buttons-group'>
								Registrarme como:
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby='demo-controlled-radio-buttons-group'
								name='userType'
								value={formik.values.userType}
								onChange={formik.handleChange}
							>
								<FormControlLabel
									value='student'
									control={<Radio />}
									label='Alumno'
									disabled={isRegisterLoading}
								/>
								<FormControlLabel
									value='professor'
									control={<Radio />}
									label='Profesor'
									disabled={isRegisterLoading}
								/>
							</RadioGroup>
						</Grid>
					</Grid>
					<LoadingButton
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
						loading={isRegisterLoading}
					>
						Registrarse
					</LoadingButton>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link
								component={RouterLink}
								to='/login'
								variant='body2'
							>
								¿Ya tienes una cuenta? Inicia sesion
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
