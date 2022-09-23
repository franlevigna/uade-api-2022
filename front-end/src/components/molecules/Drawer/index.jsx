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
	InputAdornment,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const drawerWidth = 240;

export const FiltersDrawer = ({
	container,
	isOpen,
	handleDrawerToggle,
	children,
	handleFiltering,
	initialQuery,
	resetQueries,
	parsedQuery,
}) => {
	const location = useLocation();
	const initSubject = parsedQuery.subject;
	const initClassType = parsedQuery.classType;
	const initFrequency = parsedQuery.frequency;
	const initRating = parsedQuery.rating;
	const parseQueryToState = useCallback((initQuery) => {
		if (initQuery) {
			return typeof initQuery === 'string' ? [initQuery] : initQuery;
		}
		return [];
	}, []);
	const [subject, setSubject] = useState(initSubject || '');
	const [submittedSubject, setSubmittedSubject] = useState(subject);
	const [classType, setClassType] = useState(
		parseQueryToState(initClassType)
	);
	const [frequency, setFrequency] = useState(
		parseQueryToState(initFrequency)
	);
	const [rating, setRating] = useState(initRating || '');
	const isFiltered = [
		...classType,
		...frequency,
		rating,
		submittedSubject,
	].some((value) => value);

	const isChecked = (name, state) => {
		return state.some((item) => item === name);
	};
	const handleCleanFilters = () => {
		setClassType([]);
		setFrequency([]);
		setRating('');
		setSubmittedSubject('');
		setSubject('');
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
	const handleSubjectChange = (event) => {
		const {
			target: { value },
		} = event;
		setSubject(value);
	};
	const handleSubmittedSubject = (value) => {
		setSubmittedSubject(value);
	};

	const drawer = (
		<div>
			<Toolbar>
				<FilterListIcon />
				<Typography ml={2}>Filtros</Typography>
				{isFiltered && (
					<>
						<Box sx={{ flexGrow: 1 }} />
						<Button onClick={handleCleanFilters}>Borrar</Button>
					</>
				)}
			</Toolbar>
			<Divider />
			<Accordion defaultExpanded={Boolean(subject)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Materia</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField
						size='small'
						id='subject'
						label='Materia'
						name='subject'
						value={subject}
						onChange={handleSubjectChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<Button
										size='small'
										disabled={!subject}
										variant='outlined'
										sx={{
											margin: '-14px',
											height: '40px',
											maxWidth: '40px',
											padding: '4px 0',
										}}
										onClick={() =>
											handleSubmittedSubject(subject)
										}
									>
										<CheckCircleOutlineIcon />
									</Button>
								</InputAdornment>
							),
						}}
					/>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded={Boolean(classType.length)}>
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
			<Accordion defaultExpanded={Boolean(frequency.length)}>
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
							checked={isChecked('unique', frequency)}
							name='unique'
						/>
						<FormControlLabel
							control={<Checkbox />}
							label='Semanal'
							checked={isChecked('weekly', frequency)}
							name='weekly'
						/>
						<FormControlLabel
							control={<Checkbox />}
							label='Mensual'
							checked={isChecked('monthly', frequency)}
							name='monthly'
						/>
					</FormGroup>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded={Boolean(rating)}>
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

	const handleInnerFiltering = () => {
		const order = ['q', 'classType', 'frequency', 'rating'];
		const activeFilters = {
			q: initialQuery,
			classType,
			frequency,
			rating: rating || undefined,
			subject: submittedSubject || undefined,
		};
		const query = queryString.stringify(activeFilters, {
			sort: (a, b) => order.indexOf(a) - order.indexOf(b),
		});
		if (location.search !== `?${query}`) {
			handleFiltering(query);
		}
	};

	useLayoutEffect(() => {
		resetQueries && handleCleanFilters();
	}, [resetQueries]);

	useEffect(() => {
		handleInnerFiltering();
	}, [classType, frequency, rating, submittedSubject]);

	return (
		<Box
			sx={{ display: 'flex', width: 'calc(100% - 1rem)' }}
			id='container-test'
		>
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
							height: 'calc(100vh - 124px)',
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
					flexShrink: { sm: 0 },
					flexGrow: 1,
					width: {
						sm: `calc(100% - ${drawerWidth}px)`,
						xs: 'calc(100vw - 80px)',
					},
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
					<FilterListIcon />
				</IconButton>
				{children}
			</Box>
		</Box>
	);
};
