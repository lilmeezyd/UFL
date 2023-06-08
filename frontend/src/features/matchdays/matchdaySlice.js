import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matchdayService from './matchdayService'

const initialState = {
    matchdays: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// Create new matchday
export const createMatchday = createAsyncThunk('matchdays/create', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return matchdayService.createMatchday(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all matchdays
export const getMatchdays = createAsyncThunk('matchdays/getAll', async(_, thunkAPI) => {
    try {
        return matchdayService.getMatchdays()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete matchday
export const deleteMatchday = createAsyncThunk('matchdays/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return matchdayService.deleteMatchday(id, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const matchdaySlice = createSlice({
    name: 'matchdays',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMatchday.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMatchday.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.matchdays.push(action.payload)
            })
            .addCase(createMatchday.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getMatchdays.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMatchdays.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.matchdays = action.payload
            })
            .addCase(getMatchdays.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(deleteMatchday.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteMatchday.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.matchdays = state.matchdays.filter((matchday) => matchday._id !== action.payload.id)
            })
            .addCase(deleteMatchday.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = matchdaySlice.actions
export default matchdaySlice.reducer