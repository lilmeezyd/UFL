import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import managerInfoService from "./managerInfoService";

const initialState = {
  managerInfo: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getManagerInfo = createAsyncThunk(
  "managerInfo/get",
  async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token
      const roles = await thunkAPI.getState().auth.user.roles
      return managerInfoService.getManagerInfo(token, roles);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const managerInfoSlice = createSlice({
  name: "managerInfo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManagerInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManagerInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.managerInfo = action.payload;
      })
      .addCase(getManagerInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = managerInfoSlice.actions;
export default managerInfoSlice.reducer;
