import { configureStore } from '@reduxjs/toolkit'

import appSlice from './features/appSlice'
import authModalSlice from './features/authModalSlice'
import globalLoadingSlice from './features/globalLoadingSlice'
import themeModeSlice from './features/themeModeSlice'
import userSlice from './features/userSlice'

const store = configureStore({
	reducer: {
		user: userSlice,
		themeMode: themeModeSlice,
		appState: appSlice,
		authModal: authModalSlice,
		globalLoading: globalLoadingSlice
	}
})

export default store
