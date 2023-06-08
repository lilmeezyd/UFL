import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamService from './teamService'

const initialState = {
    teams: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// Create new team
export const createTeam = createAsyncThunk('teams/create', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return teamService.createTeam(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all teams
export const getTeams = createAsyncThunk('teams/getAll', async(_, thunkAPI) => {
    try {
        return teamService.getTeams()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete team
export const deleteTeam = createAsyncThunk('teams/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return teamService.deleteTeam(id, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTeam.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.teams.push(action.payload)
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getTeams.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTeams.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.teams = action.payload
            })
            .addCase(getTeams.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(deleteTeam.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.teams = state.teams.filter((team) => team._id !== action.payload.id)
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = teamSlice.actions
export default teamSlice.reducer