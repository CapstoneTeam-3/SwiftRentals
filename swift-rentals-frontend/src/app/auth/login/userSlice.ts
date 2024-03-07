import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: null,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        console.log(action.payload.user, action.payload.token);

        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    },
    logoutUser: (state) => {
      toast.success("Logged out successfully!");
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
