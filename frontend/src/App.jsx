import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import MainLayout from './components/layout/MainLayout'
import PageWrapper from './components/shared/PageWrapper'
import themeConfigs from './config/theme.config'
import routes from './routes/routes'

const App = () => {
	// eslint-disable-next-line no-unused-vars
	const { t, i18n } = useTranslation('global')
	const { themeMode } = useSelector(state => state.themeMode)

	useEffect(() => {
		changeLanguage()
	}, [])

	const changeLanguage = async () => {
		const lng = localStorage.getItem('language')
		if (lng !== null) {
			await i18n.changeLanguage(lng)
		} else {
			await i18n.changeLanguage('es-ES')
			localStorage.setItem('language', 'es-ES')
		}
	}

	return (
		<ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				pauseOnHover
				theme={themeMode}
			/>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{routes.map((route, index) =>
							route.index ? (
								<Route
									index
									key={index}
									element={route.state ? <PageWrapper state={route.state}>{route.element}</PageWrapper> : route.element}
								/>
							) : (
								<Route
									path={route.path}
									key={index}
									element={route.state ? <PageWrapper state={route.state}>{route.element}</PageWrapper> : route.element}
								/>
							)
						)}
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
