import { TextField } from '@mui/material';
import { useState } from 'react';

import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export const SearchInput = () => {
	const [searchFromURL] = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchFromURL.get('q'));
	const navigateTo = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		const newLocation = {
			pathname: '/class/search',
			search: searchValue ? `q=${searchValue} ` : '',
			state: { fromSearch: true },
		};

		navigateTo(newLocation, { state: { resetQueries: true } });
	};
	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<form style={{ display: 'contents' }} onSubmit={handleSearch}>
			<TextField
				size='small'
				label='Busca una materia'
				type='search'
				variant='filled'
				fullWidth
				defaultValue={searchValue}
				onChange={handleChange}
				color='secondary'
				sx={{
					justifySelf: 'center',
					margin: '1rem 2rem',
					maxWidth: 'max(50%, 300px )',
					colorScheme: 'dark',
				}}
			/>
		</form>
	);
};
