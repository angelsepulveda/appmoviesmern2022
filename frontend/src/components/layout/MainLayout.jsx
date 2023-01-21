import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Footer from '../shared/Footer'
import Topbar from '../shared/Topbar'
import GlobalLoading from './../shared/GlobalLoading'

const MainLayout = () => {
	return (
		<>
			<GlobalLoading />

			<Box display="flex" minHeight="100vh">
				<Topbar />
				<Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
					<Outlet />
				</Box>
			</Box>

			<Footer />
		</>
	)
}

export default MainLayout
