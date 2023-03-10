import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from '@mui/material'
import { cloneElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import LanguageMenu from '../navigations/LanguageMenu'
import Sidebar from '../navigations/Sidebar'
import UserMenu from '../navigations/UserMenu'
import menuConfigs from './../../config/menu.config'
import { themeModes } from './../../config/theme.config'
import { setAuthModalOpen } from './../../redux/features/authModalSlice'
import { setThemeMode } from './../../redux/features/themeModeSlice'
import Logo from './Logo'

const ScrollAppBar = ({ children, window }) => {
	const { themeMode } = useSelector(state => state.themeMode)

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 50,
		target: window ? window() : undefined
	})

	return cloneElement(children, {
		sx: {
			color: trigger ? 'text.primary' : themeMode === themeModes.dark ? 'primary.contrastText' : 'text.primary',
			backgroundColor: trigger ? 'background.paper' : themeMode === themeModes.dark ? 'transparent' : 'background.paper'
		}
	})
}

const Topbar = () => {
	const [t] = useTranslation('global')
	const { user } = useSelector(state => state.user)
	const { appState } = useSelector(state => state.appState)
	const { themeMode } = useSelector(state => state.themeMode)

	const [sidebarOpen, setSidebarOpen] = useState(false)

	const dispatch = useDispatch()

	const onSwithTheme = () => {
		const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
		dispatch(setThemeMode(theme))
	}

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

	return (
		<>
			<Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
			<ScrollAppBar>
				<AppBar elevation={0} sx={{ zIndex: 9999 }}>
					<Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
						<Stack direction="row" spacing={1} alignItems="center">
							<IconButton color="inherit" sx={{ mr: 2, display: { md: 'none' } }} onClick={toggleSidebar}>
								<MenuIcon />
							</IconButton>

							<Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
								<Logo />
							</Box>
						</Stack>

						{/* main menu */}
						<Box flexGrow={1} alignItems="center" display={{ xs: 'none', md: 'flex' }}>
							<Box sx={{ marginRight: '30px' }}>
								<Logo />
							</Box>
							{menuConfigs.main.map((item, index) => (
								<Button
									key={index}
									sx={{
										color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit',
										mr: 2
									}}
									component={Link}
									to={item.path}
									variant={appState.includes(item.state) ? 'contained' : 'text'}
								>
									{t(item.display)}
								</Button>
							))}
							<IconButton sx={{ color: 'inherit' }} onClick={onSwithTheme}>
								{themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
								{themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
							</IconButton>
						</Box>
						{/* main menu */}

						{/* user menu */}
						<Stack spacing={3} direction="row" alignItems="center" sx={{ paddingRight: 5, sm: { padding: 0 } }}>
							{!user && (
								<Button
									variant="contained"
									onClick={() => dispatch(setAuthModalOpen(true))}
									sx={{ display: { xs: 'none', md: 'flex' } }}
								>
									{t('sign-in')}
								</Button>
							)}
							{<LanguageMenu />}
						</Stack>

						{user && <UserMenu />}
						{/* user menu */}
					</Toolbar>
				</AppBar>
			</ScrollAppBar>
		</>
	)
}

export default Topbar
