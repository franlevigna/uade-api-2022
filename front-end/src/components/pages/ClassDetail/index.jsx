import { Avatar, Button, Divider, Rating, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetClassByID } from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';
import { textMapper, userRoles } from '../../../utils/enums';
import { Comment } from '../../molecules/Comment';
import { HireClassModal } from '../../molecules/HireClassModal';
import { Loading } from '../../molecules/Loading';
import { ReviewClassModal } from '../../molecules/ReviewClassModal';
import AddIcon from '@mui/icons-material/Add';
import { StatusChip } from '../../molecules/StatusChip';
export const ClassDetail = () => {
	const { user } = useUserProfile();
	const { classID } = useParams();
	const { dataGetClassByID, isDataGetClassByIDLoading, refetchGetClassByID } =
		useGetClassByID(classID);
	const [isHireModalOpen, setHireModalOpen] = useState(false);
	const initialReviewModalData = {
		isOpen: false,
		user,
		rating: 0,
	};
	const [reviewModalData, setReviewModalData] = useState(
		initialReviewModalData
	);

	const handleReviewOpen = (rating = 0) => {
		setReviewModalData({ ...reviewModalData, rating, isOpen: true });
	};
	const handleReviewClose = () => {
		setReviewModalData(initialReviewModalData);
	};

	const handleHireOpen = () => {
		setHireModalOpen(true);
	};
	const handleHireClose = () => {
		setHireModalOpen(false);
	};

	const isStudent = user.userType === userRoles.STUDENT;
	const subscription = isStudent
		? dataGetClassByID?.data.data.subscriptions.find(
				(student) => student.studentId === user.id
		  )
		: null;
	const isHired = subscription?.status === 'accepted';
	const userReview =
		subscription &&
		dataGetClassByID?.data.data?.reviews?.find(
			(review) => review.subscriptionId === subscription.id
		);
	const canComment = isHired && (!userReview || !userReview?.comment);

	const getRating = () => {
		let ratingAVG = 0;
		if (dataGetClassByID?.data.data.reviews) {
			dataGetClassByID?.data.data.reviews.forEach((review) => {
				if (review.rating) {
					ratingAVG = ratingAVG + review.rating;
				}
			});
			ratingAVG = ratingAVG / dataGetClassByID?.data.data.reviews.length;
		}
		return ratingAVG;
	};

	return (
		<div>
			<Loading loading={isDataGetClassByIDLoading} />
			{dataGetClassByID && (
				<>
					<HireClassModal
						isOpen={isHireModalOpen}
						handleClose={handleHireClose}
						classData={dataGetClassByID.data.data}
						userData={user}
					/>
					<ReviewClassModal
						userReview={userReview}
						reviewModalData={reviewModalData}
						handleClose={handleReviewClose}
						classData={dataGetClassByID.data.data}
						refetch={refetchGetClassByID}
					/>
				</>
			)}
			<Box
				sx={{
					height: 'calc(100vh - 130px)',
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
				<Box
					sx={{
						gridArea: 'header',
						border: '1px solid',
						borderColor: 'grey.600',
						borderRadius: '4px',
						padding: '1rem',
						display: 'flex',
					}}
				>
					<Stack>
						<Typography component='h1' variant='h5'>
							{dataGetClassByID?.data.data.title}
						</Typography>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							{dataGetClassByID?.data.data.cost
								.toString()
								.includes('$')
								? dataGetClassByID?.data.data.cost
								: `$${dataGetClassByID?.data.data.cost}`}
						</Typography>
					</Stack>
					<Box sx={{ flexGrow: 1, flexShrink: 1 }} />
					{isStudent &&
						(subscription?.status ? (
							<StatusChip status={subscription.status} />
						) : (
							<Button
								sx={{ flexGrow: 0 }}
								variant='contained'
								onClick={handleHireOpen}
							>
								Contratar
							</Button>
						))}
				</Box>
				<Box
					sx={{
						gridArea: 'main',
						border: '1px solid',
						borderColor: 'grey.600',
						borderRadius: '4px',
						padding: '1rem',
					}}
				>
					<Stack
						spacing={2}
						sx={{
							alignItems: 'center',
							textAlign: 'left',
						}}
					>
						<Avatar
							src={dataGetClassByID?.data.data.image}
							variant='square'
							sx={{
								width: '120px',
								height: '120px',
								fontSize: '2rem',
								alignSelf: 'center',
							}}
						>
							{dataGetClassByID?.data.data.title[0]}
						</Avatar>

						<Rating
							sx={{ flexGrow: 1 }}
							name='read-only'
							value={
								dataGetClassByID?.data.data.rating ||
								getRating()
							}
							readOnly={!isHired}
							precision={0.5}
							{...(isHired && {
								onChange: (_, newValue) =>
									handleReviewOpen(newValue),
							})}
						/>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							Creada por:{' '}
							{dataGetClassByID?.data.data.user.firstName}{' '}
							{dataGetClassByID?.data.data.user.lastName}
						</Typography>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.disabled'
							gutterBottom
						>
							{dataGetClassByID?.data.data.subject}
						</Typography>

						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							{`${dataGetClassByID?.data.data.duration}hs`} -{' '}
							{textMapper[dataGetClassByID?.data.data.frequency]}-{' '}
							{textMapper[dataGetClassByID?.data.data.type]}
						</Typography>
						<Divider sx={{ marginBottom: '1rem', width: '100%' }} />
						<Typography
							sx={{ fontSize: 16 }}
							color='text.secondary'
							gutterBottom
						>
							{dataGetClassByID?.data.data.user.experience}
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
					<Typography
						sx={{ fontSize: 16 }}
						color='text.secondary'
						gutterBottom
					>
						{dataGetClassByID?.data.data.description}
					</Typography>
					<Divider sx={{ marginBottom: '1rem', width: '100%' }} />
					{canComment && (
						<Button
							sx={{ mb: 1 }}
							onClick={() => handleReviewOpen()}
							startIcon={<AddIcon />}
						>
							{' '}
							Agregar comentario
						</Button>
					)}
					{dataGetClassByID?.data.data?.classes_reviews
						?.filter(
							(review) =>
								review.comment &&
								review.comment?.status === 'accepted'
						)
						.sort((a, b) => {
							return (
								new Date(b.comment.date) -
								new Date(a.comment.date)
							);
						})
						.map((review) => (
							<Comment key={review.id} review={review} />
						))}
				</Box>
			</Box>
		</div>
	);
};
