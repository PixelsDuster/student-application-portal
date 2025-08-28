import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import courseSlice from './slices/courseSlice'
import applicationSlice from './slices/applicationSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		user: userSlice,
		course: courseSlice,
		application: applicationSlice
  	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
