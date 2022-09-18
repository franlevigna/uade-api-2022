import {
	useDeleteClass,
	useGetClassesByUser,
	useUpdateClass,
	useUpdateHiredClass,
} from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';

import Box from '@mui/material/Box';
import {
	Button,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { StatusChip } from '../../molecules/StatusChip';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { userRoles } from '../../../utils/enums';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MUIDataTable, { TableViewCol } from 'mui-datatables';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import { Loading } from '../../molecules/Loading';
const CustomTableViewCol = (props) => {
	return (
		<Box id='TEST' sx={{ padding: '1rem' }}>
			<TableViewCol {...props} />
		</Box>
	);
};
export const UserClasses = () => {
	const { user } = useUserProfile();
	const {
		dataGetClassByUser,
		refetchGetClassByUser,
		isDataGetClassByUserLoading,
	} = useGetClassesByUser(user.id, user.userType);
	const { updateClassMutation, isUpdateClassLoading } = useUpdateClass();
	const { deleteClassMutation, isDeleteClassLoading } = useDeleteClass();
	const { updateHiredClassMutation, isUpdateHiredClassLoading } =
		useUpdateHiredClass();
	const navigateTo = useNavigate();

	const handlePublish = async (id, name) => {
		const payload = {
			status: 'published',
		};
		try {
			await updateClassMutation({ id, payload });
			Toast(`La clase ${name} ha sido publicada`);
			refetchGetClassByUser();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};
	const handleUnpublish = async (id, name) => {
		const payload = {
			status: 'unpublished',
		};
		try {
			await updateClassMutation({ id, payload });
			Toast(`La clase ${name} ha sido despublicada`);
			refetchGetClassByUser();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const handleDelete = async (id, name) => {
		try {
			await deleteClassMutation({ id });
			Toast(`La clase ${name} ha sido eliminada`);
			refetchGetClassByUser();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const handleEnd = async (id, name, type) => {
		const payload = {
			status: type === 'finish' ? 'finished' : 'cancelled',
		};
		try {
			await updateHiredClassMutation({ id, payload });
			Toast(
				`La clase ${name} ha sido ${
					type === 'finish' ? 'terminada' : 'cancelada'
				}`
			);
			refetchGetClassByUser();
		} catch (error) {
			Toast(displayErrorMessage(error), 'error');
		}
	};

	const getData = () => {
		if (!dataGetClassByUser) {
			return [];
		}
		if (user.userType === userRoles.PROFESSOR) {
			return dataGetClassByUser.data;
		}
		return dataGetClassByUser.data.map((item) => ({
			...item.class,
			status: item.status,
			studentID: item.id,
		}));
	};
	const data = getData();

	const columns = [
		{ label: 'Nombre', name: 'name' },
		{ label: 'Materia', name: 'subject' },
		{ label: 'Descripción', name: 'description' },
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
							>
								{open ? <MoreHorizIcon /> : <MoreVertIcon />}
							</IconButton>
							<Menu
								id='long-menu'
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
							>
								{user.userType === userRoles.STUDENT
									? [
											<MenuItem
												key={`viewClass-${rowData?.id}`}
												onClick={() => {
													navigateTo(
														`/class/${rowData?.id}`
													);
													handleClose();
												}}
											>
												<ListItemIcon>
													<RemoveRedEyeIcon fontSize='small' />
												</ListItemIcon>
												<ListItemText>Ver</ListItemText>
											</MenuItem>,
											rowData?.status === 'accepted' &&
												((
													<MenuItem
														key={`finish-${rowData?.id}`}
														onClick={() => {
															handleEnd(
																rowData?.studentID,
																rowData?.name,
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
													</MenuItem>
												),
												(
													<MenuItem
														key={`cancel-${rowData?.id}`}
														onClick={() => {
															handleEnd(
																rowData?.studentID,
																rowData?.name,
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
													</MenuItem>
												)),
									  ]
									: [
											<MenuItem
												key={`edit-${rowData?.id}`}
												onClick={() => {
													navigateTo(
														`/class/edit/${rowData?.id}`
													);
													handleClose();
												}}
											>
												<ListItemIcon>
													<EditIcon fontSize='small' />
												</ListItemIcon>
												<ListItemText>
													Editar
												</ListItemText>
											</MenuItem>,
											rowData?.status ===
												'unpublished' && (
												<MenuItem
													key={`publish-${rowData?.id}`}
													onClick={() => {
														handlePublish(
															rowData?.id,
															rowData?.name
														);
														handleClose();
													}}
												>
													<ListItemIcon>
														<PublishIcon fontSize='small' />
													</ListItemIcon>
													<ListItemText>
														Publicar
													</ListItemText>
												</MenuItem>
											),
											rowData?.status === 'published' && (
												<MenuItem
													key={`upublish-${rowData?.id}`}
													onClick={() => {
														handleUnpublish(
															rowData?.id,
															rowData?.name
														);
														handleClose();
													}}
												>
													<ListItemIcon>
														<UnpublishedIcon fontSize='small' />
													</ListItemIcon>
													<ListItemText>
														Despublicar
													</ListItemText>
												</MenuItem>
											),
											<MenuItem
												key={`delete-${rowData?.id}`}
												onClick={() => {
													handleDelete(
														rowData?.id,
														rowData?.name
													);
													handleClose();
												}}
											>
												<ListItemIcon>
													<DeleteIcon fontSize='small' />
												</ListItemIcon>
												<ListItemText>
													Eliminar
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
		tableBodyHeight: 'calc(100vh - 320px)',
		responsive: 'standard',
		print: false,
		textLabels: {
			body: {
				noMatch: 'Aun no has contratado ninguna clase',
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
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
			>
				<Typography variant={'h5'}>Tus clases</Typography>{' '}
				{user.userType === userRoles.PROFESSOR && (
					<Button
						variant='contained'
						to='/class/create'
						component={Link}
					>
						Crear Clase
					</Button>
				)}
			</Box>
			<Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
				<Loading
					loading={
						isDataGetClassByUserLoading ||
						isDeleteClassLoading ||
						isUpdateClassLoading ||
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
		</>
	);
};
