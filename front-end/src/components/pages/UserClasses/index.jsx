import { useGetClassesByUser, useUpdateClass } from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';

import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PublishIcon from '@mui/icons-material/Publish';
import { StatusChip } from '../../molecules/StatusChip';

export const UserClasses = () => {
	const { user } = useUserProfile();
	const { dataGetClassByUser, refetchGetClassByUser } = useGetClassesByUser(
		user.id,
		user.userType
	);
	const { updateClassMutation, isUpdateClassLoading } = useUpdateClass();

	const handlePublish = async (id) => {
		const payload = {
			status: 'published',
		};
		try {
			await updateClassMutation({ id, payload });
			refetchGetClassByUser();
		} catch (error) {}
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Nombre',
			flex: 0.5,
		},
		{
			field: 'subject',
			headerName: 'Materia',
			flex: 0.5,
		},
		{
			field: 'description',
			headerName: 'Descripción',
			flex: 1,
		},
		{
			field: 'status',
			headerName: 'Estado',
			flex: 1,
			renderCell: ({ value }) => <StatusChip status={value} />,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Acciones',
			getActions: ({ row }) => {
				const { id, status } = row;
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
							key={`unpublish-${id}`}
							label='Publicar'
							onClick={() => {
								handlePublish(id);
							}}
							icon={<PublishIcon />}
							showInMenu
						/>
					),
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
					loading={isUpdateClassLoading}
				/>
			</Box>
		</>
	);
};
