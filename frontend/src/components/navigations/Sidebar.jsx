import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import PersonIcon from '@mui/icons-material/Person'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import menuConfigs from '../../config/menu.config'
import { themeModes } from '../../config/theme.config'
import uiConfigs from '../../config/ui.config'
import { setThemeMode } from '../../redux/features/themeModeSlice'
import Logo from '../shared/Logo'
import { setAuthModalOpen } from './../../redux/features/authModalSlice'

const Sidebar = ({ open, toggleSidebar }) => {
	const dispatch = useDispatch()
	const [t] = useTranslation('global')
	const { user } = useSelector(state => state.user)
	const { appState } = useSelector(state => state.appState)
	const { themeMode } = useSelector(state => state.themeMode)

	const sidebarWidth = uiConfigs.size.sidebarWith

	const onSwitchTheme = () => {
		const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
		dispatch(setThemeMode(theme))
	}

	const drawer = (
		<>
			<Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
				<Stack width="100%" direcction="rows" justifyContent="center">
					<Logo />
				</Stack>
			</Toolbar>
			<List sx={{ paddingX: '30px' }}>
				<Typography variant="h6" marginBottom="20px">
					MENU
				</Typography>
				{menuConfigs.main.map((item, index) => (
					<ListItemButton
						key={index}
						sx={{
							borderRadius: '10px',
							marginY: 1,
							backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset',
							color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit'
						}}
						component={Link}
						to={item.path}
						onClick={() => toggleSidebar(false)}
					>
						<ListItemIcon sx={{ color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit' }}>
							{item.icon}
						</ListItemIcon>
						<ListItemText
							disableTypography
							primary={<Typography textTransform="uppercase">{t(item.display)}</Typography>}
						/>
					</ListItemButton>
				))}
				{user && (
					<>
						<Typography variant="h6" marginBottom="20px">
							PERSONAL
						</Typography>
						{menuConfigs.user.map((item, index) => (
							<ListItemButton
								key={index}
								sx={{
									borderRadius: '10px',
									marginY: 1,
									backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset'
								}}
								component={Link}
								to={item.path}
								onClick={() => toggleSidebar(false)}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText
									disableTypography
									primary={<Typography textTransform="uppercase">{t(item.display)}</Typography>}
								/>
							</ListItemButton>
						))}
					</>
				)}

				{!user && (
					<ListItemButton onClick={() => dispatch(setAuthModalOpen(true))}>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText
							disableTypography
							primary={<Typography textTransform="uppercase">{t('sign-in')}</Typography>}
						/>
					</ListItemButton>
				)}
				<Typography variant="h6" marginBottom="20px">
					THEME
				</Typography>
				<ListItemButton onClick={onSwitchTheme}>
					<ListItemIcon>
						{themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
						{themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
					</ListItemIcon>
					<ListItemText
						disableTypography
						primary={
							<Typography textTransform="uppercase">
								{themeMode === themeModes.dark ? t('dark-mode') : t('light-mode')}
							</Typography>
						}
					/>
				</ListItemButton>
			</List>
		</>
	)

	return (
		<Drawer
			open={open}
			onClose={() => toggleSidebar(false)}
			sx={{ '& .MuiDrawe-Paper': { boxSizing: 'border-box', width: sidebarWidth, borderRight: 'opx' } }}
		>
			{drawer}
		</Drawer>
	)
}

export default Sidebar
