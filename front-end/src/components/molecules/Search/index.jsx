import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export const SearchInput = () => {
	const [searchFromURL] = useSearchParams();
	const [searchValue, setSearchValue] = useState(
		searchFromURL.get('q') || ''
	);
	const navigateTo = useNavigate();
	const location = useLocation();

	const handleSearch = (e) => {
		e.preventDefault();
		const newLocation = {
			pathname: '/class/search',
			search: searchValue ? `q=${searchValue} ` : '',
			state: { fromSearch: true },
		};

		searchValue &&
			navigateTo(newLocation, { state: { resetQueries: true } });
	};
	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		if (!['/class/search'].includes(location.pathname)) {
			setSearchValue('');
		}
	}, [location.pathname]);

	return (
		<form style={{ display: 'contents' }} onSubmit={handleSearch}>
			<TextField
				size='small'
				label='Busca una clase'
				type='search'
				variant='filled'
				fullWidth
				value={searchValue}
				onChange={handleChange}
				color='secondary'
				sx={{
					justifySelf: 'center',
					margin: '1rem 2rem',
					maxWidth: 'max(50%, 300px )',
				}}
			/>
		</form>
	);
};
