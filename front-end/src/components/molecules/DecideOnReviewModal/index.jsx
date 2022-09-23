import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useUpdateReview } from '../../../hooks/classes';
import { displayErrorMessage } from '../../../utils';
import { Loading } from '../Loading';
import { Toast } from '../Toast';

export const DecideOnReviewModal = ({
	handleRefetch,
	decideOnReviewModalData,
	handleClose,
}) => {
	const isBlock = decideOnReviewModalData.action === 'block';
	const modalTitle = isBlock ? 'Bloquear comentario' : 'Aprobar comentario';
	const modalMessage = isBlock
		? `Por favor ingrese el motivo por que el que desea bloquear el comentario: "${decideOnReviewModalData.review?.comment.message}"`
		: `Esta seguro que quiere aprobar el comentario: "${decideOnReviewModalData.review?.comment.message}"`;
	const modalConfirmLabel = isBlock ? 'Bloquear' : 'Aceptar';
	const [disclaimer, setDisclaimer] = useState('');
	const { isUpdateReviewLoading, updateReviewsMutation } = useUpdateReview();

	const handleSubmit = async () => {
		const review = decideOnReviewModalData.review;
		const successMessage = isBlock
			? 'Se ha bloqueado el comentario'
			: 'Se ha aceptado el comentario';
		const payload = {
			comment: {
				...(isBlock
					? { ...review.comment, disclaimer, status: 'blocked' }
					: {
							...review.comment,
							status: 'accepted',
					  }),
			},
		};
		try {
			await updateReviewsMutation({
				id: decideOnReviewModalData.review?.id,
				payload,
			});
			Toast(successMessage);
			handleClose();
			handleRefetch();
		} catch (error) {
			displayErrorMessage(error, 'error');
		}
	};

	return decideOnReviewModalData.review ? (
		<Dialog open={decideOnReviewModalData.isOpen} onClose={handleClose}>
			<Loading loading={isUpdateReviewLoading} />
			<DialogTitle>{modalTitle}</DialogTitle>
			<DialogContent>
				<DialogContentText>{modalMessage}</DialogContentText>
				{isBlock && (
					<TextField
						sx={{ mt: 4 }}
						autoFocus
						margin='dense'
						id='disclaimer'
						label='Descargo'
						multiline
						minRows={3}
						fullWidth
						value={disclaimer}
						onChange={(e) => {
							setDisclaimer(e.target.value);
						}}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button
					disabled={isBlock ? !disclaimer : false}
					onClick={handleSubmit}
				>
					{modalConfirmLabel}
				</Button>
			</DialogActions>
		</Dialog>
	) : null;
};
