import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../Api/Api";

// Thunk for fetching user info by userId
export const fetchUserInfoById = createAsyncThunk(
  "user/fetchUserInfoById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserInfoById(userId);
      console.log("Fetched user info by ID:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Thunk for fetching current user's info (me)
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const response = await userApi.getUserInfo();
    console.log("Fetched current user's info:", response.data);
    return response.data; 
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfoById.fulfilled, (state, action) => {
        console.log("Fetched user info successfully:", action.payload);
        state.status = "succeeded";
        state.user = action.payload;
        state.userId = action.payload.id;
      })
      .addCase(fetchUserInfoById.rejected, (state, action) => {
        console.log("Fetch failed:", action.payload);
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.userId = action.payload.id;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
