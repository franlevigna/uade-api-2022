import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useHireClass } from '../../../hooks/classes';
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
			userId: userData.id,
			classId: classData.id,
			studentName: `${userData.firstName} ${userData.lastName}`,
			status: 'requested',
		};
		try {
			await hireClassMutation({ id: classData.id, payload });
			Toast(
				`¡Enhorabuena! ¡La clase ${classData.name} ha sido existomente contratada!`
			);
			navigateTo('/user/classes');
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const formik = useFormik({
		initialValues: {
			email: userData.email,
			telNumber: userData.telNumber,
			contactSchedule: '',
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
						noValidate
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
							name='telNumber'
							required
							fullWidth
							id='telNumber'
							label='Telefono'
							autoFocus
							value={formik.values.telNumber}
							onChange={formik.handleChange}
							disabled={isHireClassLoading}
						/>
						<TextField
							margin='dense'
							variant='standard'
							name='contactSchedule'
							required
							fullWidth
							id='contactSchedule'
							label='Horario de contacto'
							autoFocus
							value={formik.values.contactSchedule}
							onChange={formik.handleChange}
							disabled={isHireClassLoading}
						/>
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
