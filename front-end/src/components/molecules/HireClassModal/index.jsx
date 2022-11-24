import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormLabel,
	Grid,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useHireClass } from '../../../hooks/subscriptions';
import { displayErrorMessage } from '../../../utils';
import { Loading } from '../Loading';
import { Toast } from '../Toast';

export const HireClassModal = ({
	isOpen,
	handleClose,
	classData,
	userData,
}) => {
	const { hireClassMutation, isHireClassLoading } = useHireClass();
	const navigateTo = useNavigate();

	const handleSubmit = async (values) => {
		const payload = {
			...values,
			studentId: userData.id,
			lessonId: classData.id,
		};
		try {
			await hireClassMutation({ id: classData.id, payload });
			Toast(
				`¡Enhorabuena! ¡La clase ${classData.title} ha sido existomente contratada!`
			);
			navigateTo('/user/classes');
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const formik = useFormik({
		initialValues: {
			email: userData.email,
			phoneNumber: userData.phoneNumber,
			timeframeFrom: '',
			timeframeTo: '',
			message: '',
		},
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	return classData ? (
		<div>
			<Dialog open={isOpen} onClose={handleClose}>
				<DialogTitle>{`Contratar ${classData.name}`}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Para contratar esta clase, escribile al profesor con los
						siguientes datos:
					</DialogContentText>
					<Box
						id='hireForm'
						component='form'
						onSubmit={formik.handleSubmit}
						sx={{
							width: { xs: '100%', sm: '70%' },
							margin: '3rem auto 0',
						}}
					>
						<Loading loading={isHireClassLoading} />
						<TextField
							margin='dense'
							variant='standard'
							required
							fullWidth
							id='email'
							label='Email'
							name='email'
							autoComplete='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							disabled={isHireClassLoading}
						/>
						<TextField
							margin='dense'
							variant='standard'
							name='phoneNumber'
							required
							fullWidth
							id='phoneNumber'
							label='Telefono'
							autoFocus
							value={formik.values.phoneNumber}
							onChange={formik.handleChange}
							disabled={isHireClassLoading}
						/>
						<FormControl fullWidth sx={{ marginTop: 2 }}>
							<FormLabel>Horario de contacto</FormLabel>
							<Grid container spacing={1}>
								<Grid item xs={6}>
									<TextField
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 1800,
										}}
										defaultValue={'00:00'}
										type='time'
										margin='dense'
										variant='standard'
										name='timeframeFrom'
										fullWidth
										required
										id='timeframeFrom'
										label='Desde'
										value={formik.values.timeframeFrom}
										onChange={formik.handleChange}
										disabled={isHireClassLoading}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											min: formik.values.timeframeFrom,
											step: 300,
										}}
										defaultValue={'00:00:00'}
										type='time'
										margin='dense'
										variant='standard'
										name='timeframeTo'
										required
										fullWidth
										id='timeframeTo'
										label='Hasta'
										value={formik.values.timeframeTo}
										onChange={formik.handleChange}
										disabled={isHireClassLoading}
									/>
								</Grid>
							</Grid>
						</FormControl>
						<TextField
							margin='dense'
							variant='standard'
							name='message'
							required
							fullWidth
							id='message'
							label='Motivo de interes'
							autoFocus
							value={formik.values.message}
							onChange={formik.handleChange}
							multiline
							minRows={2}
							disabled={isHireClassLoading}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} disabled={isHireClassLoading}>
						Cancelar
					</Button>
					<Button
						disabled={
							isHireClassLoading ||
							Object.values(formik.values).some((value) => !value)
						}
						type='submit'
						form='hireForm'
						variant='contained'
					>
						Contratar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	) : null;
};
