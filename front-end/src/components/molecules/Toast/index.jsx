import { Alert } from '@mui/material';
import { toast } from 'react-toastify';

const ToastAlert = ({ message, severity = 'success' }) => {
	return (
		<Alert severity={severity} sx={{ width: '100%' }}>
			{message}
		</Alert>
	);
};

export const Toast = (message, severity) => {
	return toast(<ToastAlert {...{ message, severity }} />);
};
