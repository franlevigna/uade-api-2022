import { Container } from '@mui/material';
import { Navbar } from '../../organisms/Navbar';

export const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<Container
				maxWidth='lg'
				style={{
					minHeight: 'calc(100vh - 130px)',
					marginTop: '104px',
					marginBottom: '24px',
				}}
			>
				{children}
			</Container>
		</div>
	);
};
