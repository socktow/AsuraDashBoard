import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../Api/Api";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const response = await userApi.getUserInfo();
    return response.data; 
  }
);

export const fetchUserInfoById = createAsyncThunk(
  "user/fetchUserInfoById",
  async (userId) => {
    const response = await userApi.getUserInfoById(userId);
    return response.data[0];
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userById: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("discord_token"); // Xóa token từ localStorage
      state.user = null;
      state.userById = null;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfoById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userById = action.payload;
      })
      .addCase(fetchUserInfoById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
