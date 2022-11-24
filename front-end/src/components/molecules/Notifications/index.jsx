import {
	Badge,
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	IconButton,
	Menu,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
	useGetNotificationsByUser,
	useUpdateReview,
} from '../../../hooks/reviews';
import { Toast } from '../Toast';
import { displayErrorMessage } from '../../../utils';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const Nottifications = ({ userID }) => {
	const { dataGetNotificationsByUser, refetchGetNotificationsByUser } =
		useGetNotificationsByUser(userID);
	const { updateReviewsMutation } = useUpdateReview();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const getData = () => {
		if (!dataGetNotificationsByUser) {
			return [];
		}
		return dataGetNotificationsByUser.data.data.length
			? dataGetNotificationsByUser.data.data.map((item) => ({
					id: item.id,
					className: item.subscription.lesson.title,
					disclaimer: item.commentDisclaimer,
					professor: `${item.subscription.lesson.user.firstName} ${item.subscription.lesson.user.lastName}`,
			  }))
			: [];
	};

	const data = getData();

	const acknowledgeNotification = async (id) => {
		const payload = { status: 'acknowledged' };
		try {
			await updateReviewsMutation({ id, payload });
			refetchGetNotificationsByUser();
			handleClose();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	return dataGetNotificationsByUser ? (
		<div>
			<IconButton
				aria-label='more'
				id='long-button'
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleClick}
				disabled={!data.length}
			>
				<Badge badgeContent={data.length} color='primary'>
					<NotificationsNoneIcon fontSize='large' />
				</Badge>
			</IconButton>
			<Menu
				sx={{ maxHeight: 'min(500px, calc(100vh - 200px))' }}
				id='long-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{data?.map((notification, index) => (
					<Box key={index}>
						<Card
							elevation={0}
							sx={{ backgroundColor: 'transparent' }}
							key={index}
						>
							<CardHeader
								title={`Clase: ${notification.className}`}
								action={
									<IconButton
										onClick={() =>
											acknowledgeNotification(
												notification.id
											)
										}
									>
										<CancelOutlinedIcon color='error' />
									</IconButton>
								}
							/>
							<CardContent>
								<Typography component='div'>
									{`El profesor ${notification.professor} bloqueo tu comentario`}
								</Typography>
								<Typography
									sx={{ mb: 1.5 }}
									color='text.secondary'
								>
									Motivo:
								</Typography>
								<Typography variant='body2'>
									{notification.disclaimer}
								</Typography>
							</CardContent>
						</Card>
						{data.length > 1 && <Divider />}
					</Box>
				))}
			</Menu>
		</div>
	) : null;
};
