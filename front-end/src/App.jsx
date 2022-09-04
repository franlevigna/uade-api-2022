import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/templates/Layout';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path='/' element={<div>TPO API</div>} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</div>
	);
}

export default App;
