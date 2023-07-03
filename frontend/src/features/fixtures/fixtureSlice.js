import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fixtureService from './fixtureService'

const initialState = {
    fixtures: [],
    singleFixture: {} ,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new fixture
export const createFixture = createAsyncThunk('fixtures/create', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await fixtureService.createFixture(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all fixtures
export const getFixtures = createAsyncThunk('fixtures/getAll', async(_, thunkAPI) => {
    try {
        return await fixtureService.getFixtures()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get a single fixture
export const getFixture = createAsyncThunk('fixtures/getOne', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await fixtureService.getFixture(id, token, roles)
    } catch (error) {
        const message = (error.message && error.response.data &&
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Populate fixture
export const populateFixture = createAsyncThunk('fixtures/populate', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await fixtureService.populateFixture(id, token, roles )
    } catch (error) {
        const message = (error.message && error.response.data &&
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Edit fixture
export const editFixture = createAsyncThunk('fixtures/edit', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await fixtureService.editFixture(data, token, roles)
    } catch (error) {
        const message = (error.message && error.response.data && 
            error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

// Edit Stats
export const editStats = createAsyncThunk('fixtures/editStats', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await fixtureService.editStats(data, token, roles)
    } catch (error) {
        const message = (error.message && error.response.data && 
            error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

// Delete fixture
export const deleteFixture = createAsyncThunk('fixtures/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await fixtureService.deleteFixture(id, token, roles)
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
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
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
            .addCase(populateFixture.pending, (state) => {
                state.isLoading = true
            })
            .addCase(populateFixture.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                //state.fixtures = action.payload
            })
            .addCase(populateFixture.rejected, (state, action) => {
                console.log(action)
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(editFixture.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editFixture.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.msg
                state.singleFixture = action.payload.updatedFixture
            })
            .addCase(editFixture.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getFixture.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFixture.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.singleFixture = action.payload
            })
            .addCase(getFixture.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(editStats.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editStats.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.msg
                state.singleFixture = action.payload.updatedFixture
            })
            .addCase(editStats.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = fixtureSlice.actions
export default fixtureSlice.reducer