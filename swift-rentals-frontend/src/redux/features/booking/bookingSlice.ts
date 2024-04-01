import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { carAPI } from "@/api/cars";
import { Booking, Car } from "@/types";
import { selectToken } from "../user/userSlice";
import { RootState } from "@/redux/store";

export const fetchBooking = createAsyncThunk(
  "bookings/fetch",
  async ({ user_id, active }, { getState }) => {
    const token = selectToken(getState() as RootState);
    const response = await carAPI.getAllBookingRequestsWithFilter({
      user_id: user_id,
      active,
      token,
    });
    return response.data;
  }
);

interface BookingState {
  selectedBooking: Booking | null;
  bookingList: any[];
  success: Boolean;
  loading: Boolean;
  error: string | null;
}

const initialState = {
  selectedBooking: null,
  bookingList: [],
  success: false,
  loading: false,
  error: "",
} as BookingState;

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooking.pending, (state) => {
      state = initialState;
    });
    builder.addCase(
      fetchBooking.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.error = "";
        state.bookingList = action.payload;
      }
    );
    builder.addCase(fetchBooking.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error?.message ?? "An error occurred";
      state.bookingList = [];
    });
  },
});

export default bookingSlice.reducer;
