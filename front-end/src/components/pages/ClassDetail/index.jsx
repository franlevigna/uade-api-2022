import { Avatar, Button, Divider, Rating, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useGetClassByID } from '../../../hooks/classes';
import { Comment } from '../../molecules/Comment';
import { Loading } from '../../molecules/Loading';
export const ClassDetail = () => {
	const { classID } = useParams();
	const { dataGetClassByID, isDataGetClassByIDLoading } =
		useGetClassByID(classID);

	return (
		<div>
			<Loading loading={isDataGetClassByIDLoading} />
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

					<Button sx={{ flexGrow: 0 }} variant='contained'>
						Contratar
					</Button>
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
							value={dataGetClassByID?.data.rating || 0}
							readOnly
							precision={0.5}
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
					{dataGetClassByID?.data?.comments?.map((comment, index) => (
						<Comment key={index} {...comment} />
					))}
				</Box>
			</Box>
		</div>
	);
};
