import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSubs, getSubById, createSub } from '../../../services/subs.service'

// estado inicial
const initialState = {
	subs: [],
	subDetail: {},
	status: 'idle',
	error: null,
}

export const fetchSubsAsync = createAsyncThunk('subs/fecthSubs', async () => {
	try {
		const subs = await getSubs()
		return subs
	} catch (error) {
		return Promise.reject(error)
	}
})

export const fetchSubDetailAsync = createAsyncThunk('subs/fetchSubDetail', async (id) => {
	try {
		const sub = await getSubById(id)
		return sub
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
})

export const createSubAsync = createAsyncThunk('subs/createSub', async (sub) => {
	try {
		const newsub = await createSub(sub)
		return newsub
	} catch (error) {
		return Promise.reject(error)
	}
})

// crear el slice
const subsSlice = createSlice({
	name: 'subs',
	initialState,
	reducers: {
		resetDetail: (state) => {
			state.subDetail = {}
		},
		resetError: (state) => {
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			// GET SUBS
			.addCase(fetchSubsAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchSubsAsync.fulfilled, (state, action) => {
				state.status = 'succeded'
				state.subs = action.payload
			})
			.addCase(fetchSubsAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})

			// GET SUB DETAIL
			.addCase(fetchSubDetailAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchSubDetailAsync.fulfilled, (state, action) => {
				console.log(action)
				state.status = 'succeded'
				state.subDetail = action.payload
			})
			.addCase(fetchSubDetailAsync.rejected, (state, action) => {
				console.log(action)
				state.status = 'failed'
				state.error = action.error.message
			})

			// POST creaate sub

			.addCase(createSubAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createSubAsync.fulfilled, (state, action) => {
				state.status = 'succeded'
				state.subs = [...state.subs, action.payload]
			})
			.addCase(createSubAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const { resetDetail, resetError } = subsSlice.actions
export default subsSlice.reducer
