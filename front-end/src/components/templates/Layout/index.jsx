import { Container } from '@mui/material';
import { Navbar } from '../../organisms/Navbar';

export const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<Container
				className='template-layout-profe-flix-container'
				maxWidth='lg'
				style={{
					minHeight: 'calc(100vh - 128px)',
					marginTop: '104px',
					marginBottom: '24px',
				}}
			>
				{children}
			</Container>
		</div>
	);
};
