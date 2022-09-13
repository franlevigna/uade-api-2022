import {
	useDeleteClass,
	useGetClassesByUser,
	useUpdateClass,
} from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';

import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { StatusChip } from '../../molecules/StatusChip';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import DeleteIcon from '@mui/icons-material/Delete';

export const UserClasses = () => {
	const { user } = useUserProfile();
	const {
		dataGetClassByUser,
		refetchGetClassByUser,
		isDataGetClassByUserLoading,
	} = useGetClassesByUser(user.id, user.userType);
	const { updateClassMutation, isUpdateClassLoading } = useUpdateClass();
	const { deleteClassMutation, isDeleteClassLoading } = useDeleteClass();

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

	const columns = [
		{
			field: 'name',
			headerName: 'Nombre',
			minWidth: '150',
		},
		{
			field: 'subject',
			headerName: 'Materia',
			width: 150,
		},
		{
			field: 'description',
			headerName: 'Descripción',
			flex: 1,
		},
		{
			field: 'status',
			headerName: 'Estado',
			width: '120',
			renderCell: ({ value }) => <StatusChip status={value} />,
		},
		{
			field: 'actions',
			type: 'actions',
			width: '100',
			headerName: 'Acciones',
			getActions: ({ row }) => {
				const { id, status, name } = row;
				return [
					<GridActionsCellItem
						key={`viewClass-${id}`}
						label='Ver'
						onClick={() => {
							console.log(status);
						}}
						icon={<RemoveRedEyeIcon />}
					/>,
					status === 'unpublished' && (
						<GridActionsCellItem
							key={`publish-${id}`}
							label='Publicar'
							onClick={() => {
								handlePublish(id, name);
							}}
							icon={<PublishIcon />}
							showInMenu
						/>
					),
					status === 'published' && (
						<GridActionsCellItem
							key={`unpublish-${id}`}
							label='Despublicar'
							onClick={() => {
								handleUnpublish(id, name);
							}}
							icon={<UnpublishedIcon />}
							showInMenu
						/>
					),
					<GridActionsCellItem
						key={`delete-${id}`}
						label='Eliminar'
						onClick={() => {
							handleDelete(id, name);
						}}
						icon={<DeleteIcon />}
						showInMenu
					/>,
				].filter(Boolean);
			},
		},
	];

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
				<Button variant='contained' to='/class/create' component={Link}>
					Crear Clase
				</Button>
			</Box>
			<Box sx={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={dataGetClassByUser?.data || []}
					columns={columns}
					disableSelectionOnClick
					loading={
						isUpdateClassLoading ||
						isDeleteClassLoading ||
						isDataGetClassByUserLoading
					}
				/>
			</Box>
		</>
	);
};
