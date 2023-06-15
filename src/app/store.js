import { configureStore } from '@reduxjs/toolkit'
import subsReducer from './features/subs/subs.slice'

export const store = configureStore({
	reducer: {
		subs: subsReducer,
	},
})
