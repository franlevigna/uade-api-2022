import { Box, Tab, Tabs } from '@mui/material';

import { useUserProfile } from '../../../store/profile';
import { userRoles } from '../../../utils/enums';

import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Comments } from '../../organisms/Comments';
import { Hirings } from '../../organisms/Hirings';
import { ProfileForm } from '../../organisms/ProfileForm';

export const UserProfile = () => {
	const { user } = useUserProfile();
	const [tab, setTab] = useState(0);

	const handleChange = (_, newValue) => {
		setTab(newValue);
	};

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ pt: 3, pb: 3, mb: 3 }}>{children}</Box>
				)}
			</div>
		);
	}

	return (
		<>
			{user.userType === userRoles.PROFESSOR && (
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						variant='scrollable'
						value={tab}
						onChange={handleChange}
					>
						<Tab
							icon={<AccountCircleIcon />}
							iconPosition='start'
							label='Perfil'
							{...a11yProps(0)}
						/>

						<Tab
							icon={<ConnectWithoutContactIcon />}
							iconPosition='start'
							label='Contrataciones'
							{...a11yProps(1)}
						/>
						<Tab
							icon={<CommentIcon />}
							iconPosition='start'
							label='Comentarios'
							{...a11yProps(2)}
						/>
					</Tabs>
				</Box>
			)}
			<TabPanel value={tab} index={0}>
				<ProfileForm />
			</TabPanel>
			<TabPanel value={tab} index={1}>
				<Hirings />
			</TabPanel>
			<TabPanel value={tab} index={2}>
				<Comments />
			</TabPanel>
		</>
	);
};
