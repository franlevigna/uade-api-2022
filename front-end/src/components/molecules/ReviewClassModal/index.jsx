import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Rating,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useState } from 'react';

import { useReviewClass, useUpdateReview } from '../../../hooks/classes';

import { displayErrorMessage } from '../../../utils';
import { Loading } from '../Loading';
import { Toast } from '../Toast';

export const ReviewClassModal = ({
	reviewModalData,
	handleClose,
	classData,
	refetch,
}) => {
	const { reviewClassMutation, isReviewClassLoading } = useReviewClass();
	const { updateReviewsMutation, isUpdateReviewLoading } = useUpdateReview();
	const [hover, setHover] = useState(-1);
	const userReview = classData.classes_reviews?.find(
		(review) => review.userId === reviewModalData.user.id
	);
	const isCommented = userReview?.comment?.message;

	const handleSubmit = async (values) => {
		const { message, rating } = values;
		const payload = {
			userId: reviewModalData.user.id,
			professorId: classData.professor.id,
			classId: classData.id,
			studentName: `${reviewModalData.user.firstName} ${reviewModalData.user.lastName}`,
			...(message && {
				comment: {
					date: new Date(),
					status: 'sent',
					message,
				},
			}),
			...(rating && {
				rating,
			}),
		};
		try {
			await reviewClassMutation({ id: classData.id, payload });
			Toast(
				`Enhorabuena! La reseña se ha guardado!${
					payload.comment
						? ' Tu comentario se mostrara una vez lo haya aprobado el profesor.'
						: ''
				}`
			);
			handleClose();
			refetch();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const handleEdit = async (values) => {
		const { message, rating } = values;
		const payload = {
			...(!isCommented &&
				message && {
					comment: {
						date: new Date(),
						status: 'sent',
						message,
					},
				}),
			...(rating && {
				rating,
			}),
		};
		try {
			await updateReviewsMutation({ id: userReview.id, payload });
			Toast(
				`¡Enhorabuena! La reseña se ha modificado!${
					payload.comment
						? ' Tu comentario se mostrara una vez lo haya aprobado el profesor.'
						: ''
				}`
			);
			handleClose();
			refetch();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const formik = useFormik({
		initialValues: {
			rating: reviewModalData?.rating || userReview?.rating || 0,
			message: isCommented || '',
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			userReview ? handleEdit(values) : handleSubmit(values);
		},
	});

	const labels = {
		0.5: 'Decepcionante, muy por debajo de mis expecativas',
		1: 'Decepcionante / malo',
		1.5: 'Malo, bastante decepcionante',
		2: 'Malo / regular',
		2.5: 'Regular, podria ser mejor',
		3: 'Regular / bueno',
		3.5: 'Bueno',
		4: 'Bueno, lo que me esperaba',
		4.5: 'Excellente',
		5: 'Excellente, por encima de mis expactativas',
	};

	return (
		<div>
			<Dialog
				open={reviewModalData.isOpen}
				onClose={handleClose}
				fullWidth
			>
				<DialogTitle>{`${
					!userReview ? 'Calificar' : 'Modificar calificación para'
				} ${classData?.name}`}</DialogTitle>
				<DialogContent>
					<Box
						id='reviewForm'
						component='form'
						noValidate
						onSubmit={formik.handleSubmit}
						sx={{
							width: { xs: '100%', sm: '70%' },
							margin: '3rem auto 0',
						}}
					>
						<Loading
							loading={
								isReviewClassLoading || isUpdateReviewLoading
							}
						/>
						<Box
							sx={{
								flexGrow: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								mb: 3,
							}}
						>
							<Rating
								sx={{ flexGrow: 1 }}
								name='read-only'
								value={formik.values.rating}
								precision={0.5}
								size='large'
								onChange={(_, newValue) =>
									formik.setFieldValue('rating', newValue)
								}
								onChangeActive={(_, newHover) => {
									setHover(newHover);
								}}
							/>
							{formik.values.rating !== null && (
								<Box>
									{
										labels[
											hover !== -1
												? hover
												: formik.values.rating
										]
									}
								</Box>
							)}
						</Box>
						<TextField
							sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
							margin='dense'
							name='message'
							fullWidth
							id='message'
							label={
								isCommented
									? 'Tu comentario'
									: '¿Fue una buena elección?'
							}
							placeholder='Cuéntanos tu experiencia personal con este curso.'
							autoFocus
							value={formik.values.message}
							onChange={formik.handleChange}
							multiline
							minRows={3}
							InputProps={{
								readOnly: isCommented,
								disableUnderline: isCommented,
							}}
							disabled={isReviewClassLoading}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						disabled={isReviewClassLoading}
					>
						Cancelar
					</Button>
					<Button
						disabled={isReviewClassLoading}
						type='submit'
						form='reviewForm'
						variant='contained'
					>
						{userReview ? 'Editar calificación' : 'Calificar'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
