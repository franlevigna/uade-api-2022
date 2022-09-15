import { Chip } from '@mui/material';

export const StatusChip = ({ status }) => {
	const colorMapper = {
		unpublished: 'warning',
		published: 'success',
		requested: 'warning',
		cacelled: "error"
	};
	const labelMapper = {
		unpublished: 'sin publicar',
		published: 'publicada',
		requested: 'solicitada',
		cacelled: 'cancelada',
		finished: 'finalizada',
	};
	

	const chipColor = colorMapper[status] || '';
	const chipLabel = labelMapper[status] || "";

	return status ? (
		<Chip color={chipColor} variant='outlined' label={chipLabel} />
	) : null;
};
