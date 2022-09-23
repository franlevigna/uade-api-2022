import { useGetReviewsByProfessorID } from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';
import { Comment } from '../../molecules/Comment';
import { Loading } from '../../molecules/Loading';
import MUIDataTable, { TableViewCol } from 'mui-datatables';
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	TableCell,
	TableRow,
} from '@mui/material';
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BlockIcon from '@mui/icons-material/Block';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useState } from 'react';
import { DecideOnReviewModal } from '../../molecules/DecideOnReviewModal';

const CustomTableViewCol = (props) => {
	return (
		<Box id='TEST' sx={{ padding: '1rem' }}>
			<TableViewCol {...props} />
		</Box>
	);
};
export const Comments = () => {
	const initialDecideOnReviewModalData = {
		isOpen: false,
		review: null,
		action: '',
	};
	const { user } = useUserProfile();
	const {
		dataGetReviewsByProfessorID,
		isGetReviewsByProfessorIDLoading,
		refetchGetReviewsByProffesorID,
	} = useGetReviewsByProfessorID(user.id);
	const [decideOnReviewModalData, setDecideOnReviewModalData] = useState(
		initialDecideOnReviewModalData
	);
	const handleDecideOnReviewClose = () => {
		setDecideOnReviewModalData(initialDecideOnReviewModalData);
	};

	const getData = () => {
		if (!dataGetReviewsByProfessorID) {
			return [];
		}
		return dataGetReviewsByProfessorID.data
			?.map((review) => {
				if (review?.comment?.status === 'sent') {
					return {
						reviewID: review.id,
						classID: review.classId,
						studentName: review.studentName,
						className: review.class.name,
						message: review.comment.message,
						fullReview: review,
					};
				}
				return null;
			})
			.filter(Boolean);
	};
	const data = getData();

	const columns = [
		{ label: 'Estudiante', name: 'studentName' },
		{ label: 'Clase', name: 'className' },
		{
			label: 'Comentario',
			name: 'message',
			options: {
				display: 'false',
			},
		},
		{
			name: 'Acciones',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex) => {
					const [anchorEl, setAnchorEl] = useState(null);
					const open = Boolean(anchorEl);
					const handleClick = (event) => {
						setAnchorEl(event.currentTarget);
					};
					const handleClose = () => {
						setAnchorEl(null);
					};
					return (
						<div>
							<IconButton
								aria-label='more'
								id='long-button'
								aria-controls={open ? 'long-menu' : undefined}
								aria-expanded={open ? 'true' : undefined}
								aria-haspopup='true'
								onClick={handleClick}
							>
								{open ? <MoreHorizIcon /> : <MoreVertIcon />}
							</IconButton>
							<Menu
								id='long-menu'
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
							>
								<MenuItem
									key='1'
									onClick={() => {
										setDecideOnReviewModalData({
											isOpen: true,
											review: data[dataIndex]?.fullReview,
											action: 'approve',
										});
										handleClose();
									}}
								>
									<ListItemIcon>
										<AddTaskIcon fontSize='small' />
									</ListItemIcon>
									<ListItemText>
										Aprobar comentario
									</ListItemText>
								</MenuItem>
								<MenuItem
									key='2'
									onClick={() => {
										setDecideOnReviewModalData({
											isOpen: true,
											review: data[dataIndex]?.fullReview,
											action: 'block',
										});
										handleClose();
									}}
								>
									<ListItemIcon>
										<BlockIcon fontSize='small' />
									</ListItemIcon>
									<ListItemText>
										Bloquear comentario
									</ListItemText>
								</MenuItem>
							</Menu>
						</div>
					);
				},
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
		textLabels: {
			body: {
				noMatch: 'Listo, no quedan comentarios por aprobar',
				toolTip: 'Ordenar',
				columnHeaderTooltip: (column) => `Orden para ${column.label}`,
			},
			pagination: {
				next: 'Sig Pag',
				previous: 'Ant Pag',
				rowsPerPage: 'Filas por pags:',
				displayRows: 'of',
			},
			toolbar: {
				search: 'Buscar',
				viewColumns: 'Ver Columnas',
				filterTable: 'Filtrar',
			},
			filter: {
				all: 'Todos',
				title: 'FILTROS',
				reset: 'BORRAR',
			},
			viewColumns: {
				title: 'Mostar Columnas',
				titleAria: 'Mostrar/Ocultar Columnas',
			},
		},
	};

	return (
		<>
			<Loading loading={isGetReviewsByProfessorIDLoading} />
			<DecideOnReviewModal
				handleRefetch={refetchGetReviewsByProffesorID}
				handleClose={handleDecideOnReviewClose}
				decideOnReviewModalData={decideOnReviewModalData}
			/>
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
