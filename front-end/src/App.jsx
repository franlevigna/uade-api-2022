import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import { UserProfileProvider } from './store/profile';
import { RouteViews } from './routes/RouteViews';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			paper: '#161B22',
			default: '#161B22',
		},
	},
});

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<CookiesProvider>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline enableColorScheme />
					<div className='App'>
						<BrowserRouter>
							<UserProfileProvider>
								<Layout>
									<RouteViews />
								</Layout>
							</UserProfileProvider>
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
