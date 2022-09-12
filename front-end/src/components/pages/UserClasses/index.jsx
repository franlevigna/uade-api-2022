import { useGetClassesByUser } from '../../../hooks/classes';
import { useUserProfile } from '../../../store/profile';

import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const UserClasses = () => {
	const { user } = useUserProfile();
	const { dataGetClassByUser } = useGetClassesByUser(user.id, user.userType);

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
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Acciones',
			getActions: (params) => [
				<GridActionsCellItem
					key={`viewClass-${params.id}`}
					label='Ver'
					onClick={console.log(params)}
					icon={<RemoveRedEyeIcon />}
				/>,
			],
		},
	];

	console.log(dataGetClassByUser);
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
				/>
			</Box>
		</>
	);
};
