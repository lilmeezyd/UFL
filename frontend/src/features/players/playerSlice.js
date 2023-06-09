import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playerService from './playerService'

const initialState = {
    players: [],
    onePlayer: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new player
export const createPlayer = createAsyncThunk('players/create', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await playerService.createPlayer(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all players
export const getPlayers = createAsyncThunk('players/getAll', async(_, thunkAPI) => {
    try {
        return await playerService.getPlayers()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get a single player
export const getPlayer = createAsyncThunk('players/getOne', async(id, thunkAPI) => {
    try {
        return await playerService.getPlayer(id)
    } catch (error) {
        const message = (error.message && error.response.data &&
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update player
export const updatePlayer = createAsyncThunk('players/update', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await playerService.updatePlayer(data, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete player
export const deletePlayer = createAsyncThunk('players/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const roles = thunkAPI.getState().auth.user.roles
        return await playerService.deletePlayer(id, token, roles)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const playerSlice = createSlice({
    name: 'players',
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
            .addCase(createPlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.players.push(action.payload)
            })
            .addCase(createPlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getPlayers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlayers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.players = action.payload
            })
            .addCase(getPlayers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(deletePlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.players = state.players.filter((player) => player._id !== action.payload.id)
            })
            .addCase(deletePlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(updatePlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.msg
                state.onePlayer = action.payload.updatedPlayer
            })
            .addCase(updatePlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getPlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.onePlayer = action.payload
            })
            .addCase(getPlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = playerSlice.actions
export default playerSlice.reducer