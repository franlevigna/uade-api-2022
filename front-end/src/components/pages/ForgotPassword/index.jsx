import {
	Alert,
	AlertTitle,
	Avatar,
	Box,
	Container,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import { useState } from 'react';
import queryString from 'query-string';
import { useUpdateUser } from '../../../hooks/users';

export const ForgotPassword = () => {
	const [showMessage, setShowMessage] = useState(false);
	const navigateTo = useNavigate();
	const location = useLocation();
	const { updateUserMutation, isUpdateUserLoading } = useUpdateUser();
	const parsedQuery = queryString.parse(location.search);
	const token = parsedQuery.token;

	const handleSubmit = async (values) => {
		const payload = {
			password: values.password,
		};
		try {
			await updateUserMutation({
				// TOKEN SHOULD RETURN USER ID
				id: 2,
				payload,
			});
			Toast(
				'Tu contraseña ha sido actualizada, ahora podes iniciar sesión!'
			);
			navigateTo('/login');
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const handleForgot = async (values) => {
		// When back-end done will make a HTTP call
		setShowMessage(true);
	};

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: (values) => {
			handleForgot();
		},
	});

	const formikConfirm = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	if (token) {
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
						Restablece tu contraseña
					</Typography>
					<Box
						component='form'
						noValidate
						sx={{ mt: 1 }}
						onSubmit={formikConfirm.handleSubmit}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Contraseña'
							type='password'
							id='password'
							value={formikConfirm.values.password}
							disabled={isUpdateUserLoading}
							onChange={formikConfirm.handleChange}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='confirmPassword'
							label='Confirmar contraseña'
							type='password'
							id='confirmPassword'
							value={formikConfirm.values.confirmPassword}
							disabled={isUpdateUserLoading}
							onChange={formikConfirm.handleChange}
						/>
						<LoadingButton
							type='submit'
							variant='contained'
							fullWidth
							disabled={
								formikConfirm.values.confirmPassword !==
								formikConfirm.values.password
							}
							sx={{ mt: 3, mb: 2 }}
							loading={isUpdateUserLoading}
						>
							Restablecer contraseña
						</LoadingButton>
					</Box>
				</Box>
			</Container>
		);
	}

	if (!showMessage) {
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
						¿Has olvidado la contraseña?
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
						/>
						<LoadingButton
							type='submit'
							variant='contained'
							fullWidth
							sx={{ mt: 3, mb: 2 }}
						>
							Restablecer contraseña
						</LoadingButton>
					</Box>
				</Box>
			</Container>
		);
	}
	if (showMessage) {
		return (
			<Alert
				sx={{
					backgroundColor: 'rgb(204, 232, 205)',
					color: '#000',
					maxWidth: { xs: '100%', md: '50%' },
					margin: 'auto',
					fontSize: '1rem',
				}}
				severity='success'
			>
				<AlertTitle
					sx={{
						fontWeight: 'bold',
					}}
				>
					¿Has olvidado tu contraseña?
				</AlertTitle>
				Pronto recibirás un correo electrónico para restablecer tu
				contraseña. Revisa la carpeta de spam y la papelera si no
				encuentras el correo electrónico.
			</Alert>
		);
	}

	return null;
};
