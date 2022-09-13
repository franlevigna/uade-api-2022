import {
	Box,
	Container,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import { useGetClassByID, useUpdateClass } from '../../../hooks/classes';
import { Loading } from '../../molecules/Loading';

export const EditClass = () => {
	const { classID } = useParams();
	const { dataGetClassByID, isDataGetClassByIDLoading } =
		useGetClassByID(classID);
	const { updateClassMutation, isUpdateClassLoading } = useUpdateClass();
	const navigateTo = useNavigate();

	const handleSubmit = async (values) => {
		try {
			await updateClassMutation({ id: classID, payload: values });
			Toast(`¡Enhorabuena! ¡La clase ${values.name} ha sido editada!`);
			navigateTo('/user/classes');
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};
	const classData = dataGetClassByID?.data || null;
	const formik = useFormik({
		initialValues: {
			name: classData?.name || '',
			subject: classData?.subject || '',
			description: classData?.description || '',
			duration: classData?.duration || '',
			frequency: classData?.frequency || '',
			cost: classData?.cost || '',
			type: classData?.type || '',
		},
		enableReinitialize: true,
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
				<Loading
					loading={isDataGetClassByIDLoading || isUpdateClassLoading}
				/>
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
							/>
						</Grid>
					</Grid>
					<LoadingButton
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Editar clase
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
