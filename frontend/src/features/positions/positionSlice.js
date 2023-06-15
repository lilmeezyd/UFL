import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import positionService from './positionService'

const initialState = {
    positions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new position
export const createPosition = createAsyncThunk('positions/create', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await positionService.createPosition(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all Positions
export const getPositions = createAsyncThunk('positions/getAll', async(_, thunkAPI) => {
    try {
        return await positionService.getPositions()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete position
export const deletePosition = createAsyncThunk('positions/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await positionService.deletePosition(id, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const positionSlice = createSlice({
    name: 'positions',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPosition.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPosition.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.positions.push(action.payload)
            })
            .addCase(createPosition.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getPositions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPositions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.positions = action.payload
            })
            .addCase(getPositions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(deletePosition.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePosition.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.positions = state.positions.filter((position) => position._id !== action.payload.id)
            })
            .addCase(deletePosition.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = positionSlice.actions
export default positionSlice.reducer