import { RootState } from "@/redux/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: null,
    user: {
      _id: null,
      name: null,
      email: null,
      dob: null,
      role: null,
      isConfirmed: null,
      __v: 0,
    },
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    },
    logoutUser: (state) => {
      toast.success("Logged out successfully!");
      state.isLoggedIn = false;
      state.token = null;
      state.user = {
        _id: null,
        name: null,
        email: null,
        dob: null,
        role: null,
        isConfirmed: null,
        __v: 0,
      };
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

// Create a combined selector if needed
export const selectUserData = createSelector(
  selectUser,
  selectToken,
  (user, token) => ({ user, token })
);
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
