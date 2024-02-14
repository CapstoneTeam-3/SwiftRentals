import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
        state.token = action.payload;
      }
    },
    logoutUser: (state) => {
      toast.success("Logged out successfully!");
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
