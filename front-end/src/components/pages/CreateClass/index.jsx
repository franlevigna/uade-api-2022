import {
	Box,
	Container,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import { useCreateClass } from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';
import { Loading } from '../../molecules/Loading';

export const CreateClass = () => {
	const { createClassMutation, isCreateClassLoading } = useCreateClass();
	const { user } = useUserProfile();
	const navigateTo = useNavigate();

	const handleSubmit = async (values) => {
		const payload = {
			...values,
			status: 'unpublished',
			professor: {
				id: user.id,
				name: `${user.firstName} ${user.lastName}`,
				experience: user.experience,
			},
		};
		try {
			await createClassMutation({ payload });
			Toast(
				`¡Enhorabuena! ¡La clase ${values.name} ha sido existomente creada!`
			);
			navigateTo('/user/classes');
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			subject: '',
			description: '',
			duration: '',
			frequency: '',
			cost: '',
			type: '',
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
				<Loading loading={isCreateClassLoading} />
				<Typography component='h1' variant='h5'>
					Crea tu clase
				</Typography>
				<Box
					component='form'
					noValidate
					onSubmit={formik.handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name='name'
								required
								fullWidth
								id='className'
								label='Nombre'
								autoFocus
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='subject'
								label='Materia'
								name='subject'
								value={formik.values.subject}
								onChange={formik.handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='description'
								label='Descripción'
								name='description'
								value={formik.values.description}
								onChange={formik.handleChange}
								minRows={3}
								multiline
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='duration'
								label='Duración'
								id='duration'
								value={formik.values.duration}
								onChange={formik.handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											hs
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id='frequency'>
									Frecuencia
								</InputLabel>
								<Select
									name='frequency'
									labelId='frequency'
									value={formik.values.frequency}
									label='Frecuencia'
									onChange={formik.handleChange}
									required
								>
									<MenuItem value='unique'>Única</MenuItem>
									<MenuItem value='weekly'>Semanal</MenuItem>
									<MenuItem value='monthly'>Mensual</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormLabel id='demo-controlled-radio-buttons-group'>
								Tipo:
							</FormLabel>
							<RadioGroup
								row
								name='type'
								value={formik.values.type}
								onChange={formik.handleChange}
							>
								<FormControlLabel
									value='individual'
									control={<Radio />}
									label='Individual'
								/>
								<FormControlLabel
									value='groupal'
									control={<Radio />}
									label='Grupal'
								/>
							</RadioGroup>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='cost'
								label='Costo'
								id='cost'
								value={formik.values.cost}
								onChange={formik.handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											$
										</InputAdornment>
									),
								}}
							/>
						</Grid>
					</Grid>
					<LoadingButton
						disabled={Object.values(formik.values).some(
							(value) => !value
						)}
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Crear Clase
					</LoadingButton>
					<Button
						type='reset'
						fullWidth
						onClick={() => {
							navigateTo(-1);
						}}
					>
						Cancelar
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
