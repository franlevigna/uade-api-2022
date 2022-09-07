import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './components/pages/Home';
import { Register } from './components/pages/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/pages/Login';
import { CookiesProvider } from 'react-cookie';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<CookiesProvider>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<div className='App'>
						<BrowserRouter>
							<Layout>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route
										path='/register'
										element={<Register />}
									/>
									<Route path='/login' element={<Login />} />
								</Routes>
							</Layout>
						</BrowserRouter>
					</div>
				</ThemeProvider>
				<ToastContainer />
				<ReactQueryDevtools initialIsOpen={false} />
			</CookiesProvider>
		</QueryClientProvider>
	);
}

export default App;
