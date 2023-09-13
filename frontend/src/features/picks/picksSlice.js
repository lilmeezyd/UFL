import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import picksService from './picksService'

const initialState = {
    managerPicks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create Picks
export const createPicks = createAsyncThunk('managerPicks/create', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await picksService.createPicks(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get Picks
export const getPicks = createAsyncThunk('managerPicks/get', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await picksService.getPicks(token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const picksSlice = createSlice({
    name: 'managerPicks',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPicks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPicks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.managerPicks = action.payload
            })
            .addCase(createPicks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getPicks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPicks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.managerPicks = action.payload
            })
            .addCase(getPicks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = picksSlice.actions
export default picksSlice.reducer