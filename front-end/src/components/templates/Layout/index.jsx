import { Container } from '@mui/material';
import { Navbar } from '../../molecules/Navbar';

export const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<Container
				maxWidth='lg'
				style={{
					minHeight: 'calc(100vh - 116px)',
					marginTop: '82px',
					marginBottom: '24px',
				}}
			>
				{children}
			</Container>
		</div>
	);
};
