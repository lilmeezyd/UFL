import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leagueService from "./leagueService";

const initialState = {
  leagues: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new league
export const createLeague = createAsyncThunk(
  "leagues/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const roles = thunkAPI.getState().auth.user.roles;
      return leagueService.createLeague(data, token, roles);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get team leagues
export const getTeamLeagues = createAsyncThunk(
  "leagues/team",
  async (_, thunkAPI) => {
    try {
      return leagueService.getTeamLeagues();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Overall league
export const getOverallLeague = createAsyncThunk(
  "leagues/overall",
  async (_, thunkAPI) => {
    try {
      return leagueService.getOverallLeague();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add new member to league
export const addToLeague = createAsyncThunk(
  "leagues/add",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const roles = thunkAPI.getState().auth.user.roles;
      return leagueService.addToLeague(id, token, roles);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get your leagues
export const getLeagues = createAsyncThunk(
  "leagues/getLeagues",
  async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      const roles = await thunkAPI.getState().auth.user.roles;
      const id = await thunkAPI.getState().auth.user._id
      return leagueService.getLeagues(id, token, roles);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete league
export const deleteLeague = createAsyncThunk(
  "leagues/delete",
  async (id, thunkAPI) => {}
);

export const leagueSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLeague.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLeague.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.leagues.push(action.payload);
      })
      .addCase(createLeague.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getTeamLeagues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeamLeagues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.leagues = action.payload;
      })
      .addCase(getTeamLeagues.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addToLeague.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToLeague.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.leagues = action.payload;
      })
      .addCase(addToLeague.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getLeagues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeagues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.leagues = action.payload;
      })
      .addCase(getLeagues.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = leagueSlice.actions;
export default leagueSlice.reducer;
