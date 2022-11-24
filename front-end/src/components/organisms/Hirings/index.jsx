import { useUserProfile } from '../../../store/profile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MUIDataTable, { TableViewCol } from 'mui-datatables';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from '@mui/material';
import { StatusChip } from '../../molecules/StatusChip';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import { useState } from 'react';
import { Loading } from '../../molecules/Loading';
import AddTaskIcon from '@mui/icons-material/AddTask';
import {
	useGetStudentsByProfessor,
	useUpdateHiredClass,
} from '../../../hooks/subscriptions';

const CustomTableViewCol = (props) => {
	return (
		<Box id='TEST' sx={{ padding: '1rem' }}>
			<TableViewCol {...props} />
		</Box>
	);
};
export const Hirings = () => {
	const { user } = useUserProfile();
	const { updateHiredClassMutation, isUpdateHiredClassLoading } =
		useUpdateHiredClass();
	const {
		dataGetStudentsByProfessor,
		isDataGetStudentsByProfessorLoading,
		refetchGetStudentsByProfessor,
	} = useGetStudentsByProfessor(user?.id);

	const getData = () => {
		if (!dataGetStudentsByProfessor) {
			return [];
		}
		if (!dataGetStudentsByProfessor.data?.data?.length) {
			return [];
		}
		return dataGetStudentsByProfessor.data.data.map((subscription) => ({
			id: subscription.id,
			lessonName: subscription.lesson.title,
			studentName: `${subscription.user.firstName} ${subscription.user.lastName}`,
			message: subscription.message,
			phoneNumber: subscription.user.phoneNumber,
			contactSchedule: `De ${subscription.timeframeFrom}hs a ${subscription.timeframeTo}hs`,
			status: subscription.status,
		}));
	};
	const data = getData();

	const handleChange = async (id, name, type) => {
		const status = {
			finish: 'finished',
			cancel: 'cancelled',
			accept: 'accepted',
			reject: 'rejected',
		};
		const message = {
			finish: 'finalizada',
			cancel: 'cancelada',
			accept: 'aceptada',
			reject: 'rechazada',
		};
		const payload = {
			status: status[type],
		};
		try {
			await updateHiredClassMutation({ id, payload });
			Toast(`La clase ${name} ha sido ${message[type]}`);
			refetchGetStudentsByProfessor();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};
	const columns = [
		{ label: 'Clase', name: 'lessonName' },
		{
			label: 'Estudiante',
			name: 'studentName',
			options: {
				filter: false,
			},
		},
		{
			label: 'Mensaje',
			name: 'message',
			options: {
				filter: false,
			},
		},
		{
			label: 'Telefono',
			name: 'phoneNumber',
			options: {
				filter: false,
			},
		},
		{
			label: 'Horario Contacto',
			name: 'contactSchedule',
			options: {
				filter: false,
			},
		},
		{
			label: 'Estado',
			name: 'status',
			options: {
				customBodyRender: (value) => <StatusChip status={value} />,
			},
		},
		{
			name: 'Acciones',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex) => {
					const rowData = data[dataIndex];
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
								disabled={['cancelled', 'finished'].includes(
									rowData?.status
								)}
							>
								{open ? <MoreHorizIcon /> : <MoreVertIcon />}
							</IconButton>
							<Menu
								id='long-menu'
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
							>
								{rowData?.status === 'accepted'
									? [
											<MenuItem
												key={`finish-${rowData?.id}`}
												onClick={() => {
													handleChange(
														rowData?.id,
														rowData?.lessonName,
														'finish'
													);
													handleClose();
												}}
											>
												<ListItemIcon>
													<DoneAllIcon fontSize='small' />
												</ListItemIcon>
												<ListItemText>
													Finalizar
												</ListItemText>
											</MenuItem>,
											<MenuItem
												key={`cancel-${rowData?.id}`}
												onClick={() => {
													handleChange(
														rowData?.id,
														rowData?.lessonName,
														'cancel'
													);
													handleClose();
												}}
											>
												<ListItemIcon>
													<CancelIcon fontSize='small' />
												</ListItemIcon>
												<ListItemText>
													Cancelar
												</ListItemText>
											</MenuItem>,
									  ]
									: rowData?.status === 'requested' && [
											<MenuItem
												key={`accept-${rowData?.id}`}
												onClick={() => {
													handleChange(
														rowData?.id,
														rowData?.lessonName,
														'accept'
													);
													handleClose();
												}}
											>
												<ListItemIcon>
													<AddTaskIcon fontSize='small' />
												</ListItemIcon>
												<ListItemText>
													Aceptar
												</ListItemText>
											</MenuItem>,
											<MenuItem
												key={`reject-${rowData?.id}`}
												onClick={() => {
													handleChange(
														rowData?.id,
														rowData?.lessonName,
														'reject'
													);
													handleClose();
												}}
											>
												<ListItemIcon>
													<CancelIcon fontSize='small' />
												</ListItemIcon>
												<ListItemText>
													Rechazar
												</ListItemText>
											</MenuItem>,
									  ]}
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
		download: false,
		tableBodyHeight: 'calc(100vh - 370px)',
		responsive: 'standard',
		print: false,
		textLabels: {
			body: {
				noMatch:
					'Aun no tienes contrataciones pendientes de aprobación',
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
		<Box>
			<Loading
				loading={
					isDataGetStudentsByProfessorLoading ||
					isUpdateHiredClassLoading
				}
			/>
			<MUIDataTable
				data={data}
				columns={columns}
				options={options}
				components={{
					TableViewCol: CustomTableViewCol,
				}}
			/>
		</Box>
	);
};
