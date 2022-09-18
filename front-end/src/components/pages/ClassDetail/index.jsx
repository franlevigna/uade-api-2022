import { Avatar, Button, Divider, Rating, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetClassByID } from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';
import { userRoles } from '../../../utils/enums';
import { Comment } from '../../molecules/Comment';
import { HireClassModal } from '../../molecules/HireClassModal';
import { Loading } from '../../molecules/Loading';
import { ReviewClassModal } from '../../molecules/ReviewClassModal';
import AddIcon from '@mui/icons-material/Add';
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
	const isHired = dataGetClassByID?.data.classes_students.some(
		(student) => student.userId === user.id && student.status === 'accepted'
	);
	const showHireButton = isStudent && !isHired;
	const canRate =
		isStudent &&
		user.dataGetClassByID?.data.classes_students.some(
			(student) =>
				student.userId === user.id && student.status === 'accepted'
		);
	const userReview = dataGetClassByID?.data?.classes_reviews?.find(
		(review) => review.userId === reviewModalData.user.id
	);
	const canComment =
		isStudent && isHired && (!userReview || !userReview?.comment);

	const getRating = () => {
		let ratingAVG = 0;
		if (dataGetClassByID?.data.classes_reviews) {
			dataGetClassByID?.data.classes_reviews.forEach((review) => {
				if (review.rating) {
					ratingAVG = ratingAVG + review.rating;
				}
			});
			ratingAVG =
				ratingAVG / dataGetClassByID?.data.classes_reviews.length;
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
						classData={dataGetClassByID.data}
						userData={user}
					/>
					<ReviewClassModal
						reviewModalData={reviewModalData}
						handleClose={handleReviewClose}
						classData={dataGetClassByID.data}
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
							{dataGetClassByID?.data.name}
						</Typography>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							{dataGetClassByID?.data.cost}
						</Typography>
					</Stack>
					<Box sx={{ flexGrow: 1, flexShrink: 1 }} />

					{showHireButton && (
						<Button
							sx={{ flexGrow: 0 }}
							variant='contained'
							onClick={handleHireOpen}
						>
							Contratar
						</Button>
					)}
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
							sx={{
								width: '120px',
								height: '120px',
								fontSize: '2rem',
								alignSelf: 'center',
							}}
						>
							{dataGetClassByID?.data.name[0]}
						</Avatar>

						<Rating
							sx={{ flexGrow: 1 }}
							name='read-only'
							value={dataGetClassByID?.data.rating || getRating()}
							readOnly={!canRate}
							precision={0.5}
							{...(canRate && {
								onChange: (_, newValue) =>
									handleReviewOpen(newValue),
							})}
						/>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							Creada por: {dataGetClassByID?.data.professor.name}
						</Typography>

						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							{dataGetClassByID?.data.type} -{' '}
							{dataGetClassByID?.data.frequency}
						</Typography>
						<Divider sx={{ marginBottom: '1rem', width: '100%' }} />
						<Typography
							sx={{ fontSize: 16 }}
							color='text.secondary'
							gutterBottom
						>
							{dataGetClassByID?.data.professor.experience}
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
						{dataGetClassByID?.data.description}
					</Typography>
					<Divider sx={{ marginBottom: '1rem', width: '100%' }} />
					{canComment && (
						<Button
							onClick={() => handleReviewOpen()}
							startIcon={<AddIcon />}
						>
							{' '}
							Agregar comentario
						</Button>
					)}
					{dataGetClassByID?.data?.classes_reviews?.map((review) => {
						if (
							review.comment &&
							review.comment?.status === 'accepted'
						) {
							return <Comment key={review.id} review={review} />;
						}
						return null;
					})}
				</Box>
			</Box>
		</div>
	);
};
