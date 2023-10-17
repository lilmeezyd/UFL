import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import livesService from "./livesService";

const initialState = {
  lives: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const setInitialPoints = createAsyncThunk("lives/setInitial", async(data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const roles = thunkAPI.getState().auth.user.roles;
    return await livesService.setInitialPoints(data, token, roles)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || 
    error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const addPointsToPicks = createAsyncThunk("lives/addPoints", async(data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const roles = thunkAPI.getState().auth.user.roles
    return await livesService.addPointsToPicks(data, token, roles)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || 
    error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Get lives
export const getLives = createAsyncThunk("lives/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const roles = thunkAPI.getState().auth.user.roles;
    const id = thunkAPI.getState().auth.user._id
    return await livesService.getLives(id, token, roles);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletePoints = createAsyncThunk("lives/deletePoints", async(data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token
    const roles = thunkAPI.getState().auth.roles
    return await livesService.deletePoints(data, token, roles)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || 
    error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const livesSlice = createSlice({
  name: "lives",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLives.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLives.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lives = action.payload;
      })
      .addCase(getLives.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(setInitialPoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setInitialPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lives = action.payload;
      })
      .addCase(setInitialPoints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addPointsToPicks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPointsToPicks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lives = action.payload;
      })
      .addCase(addPointsToPicks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deletePoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lives = action.payload;
      })
      .addCase(deletePoints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = livesSlice.actions;
export default livesSlice.reducer;
