import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../Api/Api"; 

export const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", async () => {
  const response = await userApi.getUserInfo();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
