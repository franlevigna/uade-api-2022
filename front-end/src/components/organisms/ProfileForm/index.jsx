import {
	Avatar,
	Box,
	Container,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useUserProfile } from '../../../store/profile';
import { textMapper, userRoles } from '../../../utils/enums';
import { useUpdateUser } from '../../../hooks/users';
import { Loading } from '../../molecules/Loading';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';

export const ProfileForm = () => {
	const { user, setUserData } = useUserProfile();
	const { updateUserMutation, isUpdateUserLoading } = useUpdateUser();

	const handleSubmit = async (values) => {
		try {
			const { data } = await updateUserMutation({
				id: user.id,
				payload: values,
			});
			setUserData(data);
			Toast('Perfil actualizado exitosamente!');
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const formik = useFormik({
		initialValues: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			userType: user.userType,
			...(user.userType === userRoles.PROFESSOR && {
				degree: user.degree,
				experience: user.experience,
			}),
			...(user.userType === userRoles.STUDENT && {
				birthDate: user.birthDate,
				primary: user.experience,
				secundary: user.secundary,
				terciary: user.terciary,
				universitary: user.universitary,
			}),
		},
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});
	return (
		<Box
			sx={{
				minHeight: 'calc(100vh - 370px)',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: 1,
				gridTemplateRows: '100px auto auto ',
				gridTemplateAreas: {
					md: `
"main  header header "
"main profileForm profileForm "
"main profileForm profileForm "
`,
					xs: `
"header  header header "
"main main main "
"profileForm profileForm profileForm "
`,
				},
			}}
		>
			<Loading loading={isUpdateUserLoading || !user} />
			<Box
				sx={{
					gridArea: 'header',
					bgcolor: 'paper',
					border: '1px solid',
					borderColor: 'grey.600',
					borderRadius: '4px',
					padding: '1rem',
				}}
			>
				<Typography component='h1' variant='h5'>
					Tu Perfil
				</Typography>
				<Typography
					sx={{ fontSize: 14 }}
					color='text.secondary'
					gutterBottom
				>
					Añade información sobre ti
				</Typography>
			</Box>
			<Box
				sx={{
					gridArea: 'main',
					bgcolor: 'paper',
					border: '1px solid',
					borderColor: 'grey.600',
					borderRadius: '4px',
					padding: '1rem',
				}}
			>
				<Stack spacing={2} sx={{ alignItems: 'center' }}>
					<Avatar sx={{ width: '120px', height: '120px' }}>
						{user.firstName[0]}
						{user.lastName[0]}
					</Avatar>

					<Typography variant='h5' component='div'>
						{`${user.firstName} ${user.lastName}`}
					</Typography>

					<Typography
						sx={{ fontSize: 14 }}
						color='text.secondary'
						gutterBottom
					>
						{textMapper[user.userType]}
					</Typography>
				</Stack>
			</Box>
			<Box
				sx={{
					gridArea: 'profileForm',
					bgcolor: 'paper',
					border: '1px solid',
					borderColor: 'grey.600',
					borderRadius: '4px',
					padding: '1rem',
				}}
			>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Container component='main' maxWidth='xs'>
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
										value={formik.values.firstName}
										onChange={formik.handleChange}
										// disabled={isRegisterLoading}
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
										// disabled={isRegisterLoading}
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
										// disabled={isRegisterLoading}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id='phoneNumber'
										label='Telefono'
										name='phoneNumber'
										value={formik.values.phoneNumber}
										onChange={formik.handleChange}
									/>
								</Grid>
								{user.userType === userRoles.PROFESSOR && (
									<>
										<Grid item xs={12}>
											<TextField
												name='degree'
												required
												fullWidth
												id='degree'
												label='Título'
												value={formik.values.degree}
												onChange={formik.handleChange}
												// disabled={isRegisterLoading}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												name='experience'
												required
												fullWidth
												id='experience'
												label='Experiencia'
												value={formik.values.experience}
												onChange={formik.handleChange}
												multiline
												minRows={3}
												// disabled={isRegisterLoading}
											/>
										</Grid>
									</>
								)}

								{user.userType === userRoles.STUDENT && (
									<>
										<Grid item xs={12}>
											<TextField
												id='birthDate'
												label='Nacimiento'
												type='date'
												name='birthDate'
												fullWidth
												value={formik.values.birthDate}
												onChange={formik.handleChange}
												InputLabelProps={{
													shrink: true,
												}}
												sx={{
													colorScheme: 'dark',
												}}
											/>
										</Grid>
										<Grid item xs={12}>
											<FormLabel id='demo-controlled-radio-buttons-group'>
												Primaria:
											</FormLabel>
											<RadioGroup
												row
												aria-labelledby='demo-controlled-radio-buttons-group'
												name='primary'
												value={formik.values.primary}
												onChange={formik.handleChange}
											>
												<FormControlLabel
													value='complete'
													control={<Radio />}
													label='Completo'
													// disabled={isRegisterLoading}
												/>
												<FormControlLabel
													value='ongoing'
													control={<Radio />}
													label='En curso'
													// disabled={isRegisterLoading}
												/>
											</RadioGroup>
										</Grid>
										<Grid item xs={12}>
											<FormLabel id='demo-controlled-radio-buttons-group'>
												Secundaria:
											</FormLabel>
											<RadioGroup
												row
												aria-labelledby='demo-controlled-radio-buttons-group'
												name='secundary'
												value={formik.values.secundary}
												onChange={formik.handleChange}
											>
												<FormControlLabel
													value='complete'
													control={<Radio />}
													label='Completo'
													// disabled={isRegisterLoading}
												/>
												<FormControlLabel
													value='ongoing'
													control={<Radio />}
													label='En curso'
													// disabled={isRegisterLoading}
												/>
											</RadioGroup>
										</Grid>
										<Grid item xs={12}>
											<FormLabel id='demo-controlled-radio-buttons-group'>
												Terciario:
											</FormLabel>
											<RadioGroup
												row
												aria-labelledby='demo-controlled-radio-buttons-group'
												name='terciary'
												value={formik.values.terciary}
												onChange={formik.handleChange}
											>
												<FormControlLabel
													value='complete'
													control={<Radio />}
													label='Completo'
													// disabled={isRegisterLoading}
												/>
												<FormControlLabel
													value='ongoing'
													control={<Radio />}
													label='En curso'
													// disabled={isRegisterLoading}
												/>
											</RadioGroup>
										</Grid>
										<Grid item xs={12}>
											<FormLabel id='demo-controlled-radio-buttons-group'>
												Universitario:
											</FormLabel>
											<RadioGroup
												row
												aria-labelledby='demo-controlled-radio-buttons-group'
												name='universitary'
												value={
													formik.values.universitary
												}
												onChange={formik.handleChange}
											>
												<FormControlLabel
													value='complete'
													control={<Radio />}
													label='Completo'
													// disabled={isRegisterLoading}
												/>
												<FormControlLabel
													value='ongoing'
													control={<Radio />}
													label='En curso'
													// disabled={isRegisterLoading}
												/>
											</RadioGroup>
										</Grid>
									</>
								)}
							</Grid>
							<LoadingButton
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
								// loading={isRegisterLoading}
							>
								Editar perfil
							</LoadingButton>
						</Box>
					</Container>
				</Box>
			</Box>
		</Box>
	);
};
