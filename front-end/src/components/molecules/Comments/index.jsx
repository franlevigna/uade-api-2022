import { useGetReviewsByProfessorID } from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';
import { Comment } from '../Comment';
import { Loading } from '../Loading';
import MUIDataTable, { TableViewCol } from 'mui-datatables';
import { TableCell, TableRow } from '@mui/material';
import { Box } from '@mui/system';

const CustomTableViewCol = (props) => {
	return (
		<Box id='TEST' sx={{ padding: '1rem' }}>
			<TableViewCol {...props} />
		</Box>
	);
};
export const Comments = () => {
	const { user } = useUserProfile();
	const { dataGetReviewsByProfessorID, isGetReviewsByProfessorIDLoading } =
		useGetReviewsByProfessorID(user.id);

	const getData = () => {
		if (!dataGetReviewsByProfessorID) {
			return [];
		}
		return dataGetReviewsByProfessorID.data?.map((review) => ({
			reviewID: review.id,
			classID: review.classId,
			studentName: review.studentName,
			className: review.class.name,
			message: review.comment.message,
			fullReview: review,
		}));
	};
	const data = getData();
	const columns = [
		{ label: 'Estudiante', name: 'studentName' },
		{ label: 'Clase', name: 'className' },
		{
			label: 'Comentario',
			name: 'message',
			options: {
				display: 'hidden',
			},
		},
	];

	const options = {
		filterType: 'checkbox',
		selectableRows: 'none',
		expandableRows: true,
		download: false,
		tableBodyHeight: 'calc(100vh - 370px)',
		responsive: 'standard',
		print: false,
		renderExpandableRow: (rowData, { dataIndex }) => {
			return (
				<TableRow>
					<TableCell colSpan={rowData.length + 1}>
						<Comment review={data[dataIndex].fullReview} />
					</TableCell>
				</TableRow>
			);
		},
	};

	return (
		<>
			<Loading loading={isGetReviewsByProfessorIDLoading} />
			<MUIDataTable
				title={'Comentarios por aprobar'}
				data={data}
				columns={columns}
				options={options}
				components={{
					TableViewCol: CustomTableViewCol,
				}}
			/>
		</>
	);
};
