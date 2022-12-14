import {
	Avatar,
	Box,
	Button,
	Container,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
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
import { convertToBase64, displayErrorMessage } from '../../../utils';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import { useUserSession } from '../../../hooks/userSession';

export const ProfileForm = () => {
	const { storeAuthToken } = useUserSession();
	const { user, setUserData } = useUserProfile();
	const { updateUserMutation, isUpdateUserLoading } = useUpdateUser();
	const [previewImg, setPreviewImg] = useState();

	const handleSubmit = async (values) => {
		try {
			const {
				data: { data, accessToken },
			} = await updateUserMutation({
				payload: values,
			});
			setUserData(data);
			storeAuthToken(accessToken);
			Toast(
				!previewImg
					? 'Perfil actualizado exitosamente!'
					: 'Tu foto ha sido actualizada'
			);
			setPreviewImg(null);
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const formik = useFormik({
		initialValues: {
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
				birthDate: user.birthDate
					? new Date(user.birthDate).toISOString().split('T')[0]
					: '',
				primary: user.primary,
				secundary: user.secundary,
				terciary: user.terciary,
				universitary: user.universitary,
			}),
		},
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	const handleUpload = async (e) => {
		const newImage = e.target?.files?.[0];
		if (newImage) {
			const base64 = await convertToBase64(newImage);
			setPreviewImg(base64);
		}
	};

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
					A??ade informaci??n sobre ti
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
					<Avatar
						src={previewImg || user.profileImage}
						sx={{ width: '120px', height: '120px' }}
					>
						{user.firstName[0]}
						{user.lastName[0]}
					</Avatar>
					<Grid container justifyContent='center' spacing={1}>
						<Grid item display='flex' alignItems='center'>
							{!previewImg ? (
								<Button
									size='small'
									fullWidth
									variant='outlined'
									component='label'
									startIcon={<UploadFileIcon />}
								>
									{user.profileImage
										? 'Cambiar foto'
										: 'Subir foto'}
									<input
										hidden
										accept='image/*'
										multiple={false}
										type='file'
										onChange={handleUpload}
									/>
								</Button>
							) : (
								<>
									<IconButton
										onClick={() => setPreviewImg(null)}
									>
										<CancelOutlinedIcon color='error' />
									</IconButton>
									<IconButton
										onClick={() =>
											handleSubmit({
												profileImage: previewImg,
											})
										}
									>
										<CheckCircleOutlineIcon color='primary' />
									</IconButton>
								</>
							)}
						</Grid>
					</Grid>
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
												label='T??tulo'
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
