import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fixtureService from './fixtureService'

const initialState = {
    fixtures: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// Create new fixture
export const createFixture = createAsyncThunk('fixtures/create', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return fixtureService.createFixture(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all fixtures
export const getFixtures = createAsyncThunk('fixtures/getAll', async(_, thunkAPI) => {
    try {
        return fixtureService.getFixtures()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete fixture
export const deleteFixture = createAsyncThunk('fixtures/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return fixtureService.deleteFixture(id, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const fixtureSlice = createSlice({
    name: 'fixtures',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFixture.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createFixture.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.fixtures.push(action.payload)
            })
            .addCase(createFixture.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getFixtures.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFixtures.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.fixtures = action.payload
            })
            .addCase(getFixtures.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(deleteFixture.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteFixture.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.fixtures = state.fixtures.filter((fixture) => fixture._id !== action.payload.id)
            })
            .addCase(deleteFixture.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = fixtureSlice.actions
export default fixtureSlice.reducer