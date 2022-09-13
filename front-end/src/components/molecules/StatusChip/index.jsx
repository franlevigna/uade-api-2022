import { Chip } from '@mui/material';

export const StatusChip = ({ status }) => {
	const colorMapper = {
		unpublished: 'warning',
		published: 'success',
	};

	const chipColor = colorMapper[status] || '';

	return status ? (
		<Chip color={chipColor} variant='outlined' label={status} />
	) : null;
};
