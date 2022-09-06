import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './components/pages/Home';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});
function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className='App'>
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path='/' element={<Home></Home>} />
						</Routes>
					</Layout>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
}

export default App;
