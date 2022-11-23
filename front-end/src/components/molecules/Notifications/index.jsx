import {
	Badge,
	Box,
	Card,
	CardContent,
	Divider,
	IconButton,
	Menu,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useGetNotificationsByUser } from '../../../hooks/reviews';

export const Nottifications = ({ userID }) => {
	const { dataGetNotificationsByUser } = useGetNotificationsByUser(userID);
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
		console.log(dataGetNotificationsByUser);
		return dataGetNotificationsByUser.data.data.length
			? dataGetNotificationsByUser.data.data.map((item) => ({
					className: item.subscription.lesson.title,
					disclaimer: item.commentDisclaimer,
					professor: `${item.subscription.lesson.user.firstName} ${item.subscription.lesson.user.lastName}`,
			  }))
			: [];
	};

	const data = getData();

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
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									{`Clase: ${notification.className}`}
								</Typography>
								<Typography variant='h6' component='div'>
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
