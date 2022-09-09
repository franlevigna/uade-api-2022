import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { useEffect, useState, useLayoutEffect } from 'react';
import queryString from 'query-string';

const drawerWidth = 240;

export const FiltersDrawer = ({
	container,
	isOpen,
	handleDrawerToggle,
	children,
	handleFiltering: submitFiltering,
	initialQuery,
	resetQueries,
}) => {
	const [classType, setClassType] = useState([]);
	const [frequency, setFrequency] = useState([]);
	const [rating, setRating] = useState('');
	const isFiltered = [...classType, ...frequency, rating].some(
		(value) => value
	);

	const isChecked = (name, state) => {
		return state.some((item) => item === name);
	};
	const handleCleanFilters = () => {
		setClassType([]);
		setFrequency([]);
		setRating('');
	};

	const handleClassTypeChange = (event) => {
		const {
			target: { checked, name },
		} = event;
		if (checked) {
			setClassType([...classType, name]);
			return;
		}
		setClassType(classType.filter((item) => item !== event.target.name));
	};

	const handleFrequencyChange = (event) => {
		const {
			target: { checked, name },
		} = event;
		if (checked) {
			setFrequency([...frequency, name]);
			return;
		}
		setFrequency(frequency.filter((item) => item !== event.target.name));
	};

	const handleRatingChange = (event) => {
		const {
			target: { value },
		} = event;
		setRating(value);
	};

	const drawer = (
		<div>
			<Toolbar>
				<FilterListIcon></FilterListIcon>
				<Typography ml={2}>Filtros</Typography>
				{isFiltered && (
					<>
						<Box sx={{ flexGrow: 1 }} />
						<Button onClick={handleCleanFilters}>Borrar</Button>
					</>
				)}
			</Toolbar>
			<Divider />
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Tipo de clase</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<FormGroup onChange={handleClassTypeChange}>
						<FormControlLabel
							control={<Checkbox />}
							label='Individual'
							checked={isChecked('individual', classType)}
							name='individual'
						/>
						<FormControlLabel
							control={<Checkbox />}
							label='Grupal'
							checked={isChecked('groupal', classType)}
							name='groupal'
						/>
					</FormGroup>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Frecuencia</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<FormGroup onChange={handleFrequencyChange}>
						<FormControlLabel
							control={<Checkbox />}
							label='Única'
							checked={frequency.unique}
							name='unique'
						/>
						<FormControlLabel
							control={<Checkbox />}
							label='Semanal'
							checked={frequency.weekly}
							name='weekly'
						/>
						<FormControlLabel
							control={<Checkbox />}
							label='Mensual'
							checked={frequency.monthly}
							name='monthly'
						/>
					</FormGroup>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Calificación</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<RadioGroup onChange={handleRatingChange} value={rating}>
						<FormControlLabel
							control={<Radio />}
							label='4,5 o más'
							value='4.5'
						/>
						<FormControlLabel
							control={<Radio />}
							label='4,0 o más'
							value='4'
						/>
						<FormControlLabel
							control={<Radio />}
							label='3,5 o más'
							value='3.5'
						/>
						<FormControlLabel
							control={<Radio />}
							label='3,0 o más'
							value='3'
						/>
					</RadioGroup>
				</AccordionDetails>
			</Accordion>
		</div>
	);

	const handleFiltering = () => {
		const order = ['q', 'classType', 'frequency', 'rating'];
		const activeFilters = {
			q: initialQuery,
			classType,
			frequency,
			rating: rating || undefined,
		};
		const query = queryString.stringify(activeFilters, {
			sort: (a, b) => order.indexOf(a) - order.indexOf(b),
		});

		submitFiltering(query);
	};

	useEffect(() => {
		handleFiltering();
	}, [classType, frequency, rating]);

	useLayoutEffect(() => {
		resetQueries && handleCleanFilters();
	}, [resetQueries]);

	return (
		<Box sx={{ display: 'flex' }} id='container-test'>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant='temporary'
					open={isOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
						container: container.current,
					}}
					PaperProps={{ style: { position: 'absolute' } }}
					BackdropProps={{ style: { position: 'absolute' } }}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					ModalProps={{ container: container.current }}
					PaperProps={{
						style: {
							position: 'fixed',
							top: 'initial',
							left: 'initial',
						},
					}}
					BackdropProps={{ style: { position: 'absolute' } }}
					container={container.current}
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					margin: '0 1.5rem',
				}}
			>
				<IconButton
					onClick={handleDrawerToggle}
					sx={{
						display: { xs: 'block', sm: 'none' },
					}}
					size='large'
				>
					<FilterListIcon></FilterListIcon>
				</IconButton>
				{children}
			</Box>
		</Box>
	);
};
