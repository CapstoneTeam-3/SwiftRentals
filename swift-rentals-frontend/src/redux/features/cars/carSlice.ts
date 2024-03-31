import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carAPI } from "@/api/cars";
import { Car } from "@/types";
import { selectToken } from "../user/userSlice";
import { RootState } from "@/redux/store";

export const fetchCars = createAsyncThunk(
  "cars/fetch",
  async (page: number, { getState }) => {
    const token = selectToken(getState() as RootState);
    const response = await carAPI.getCarList({ page, token });
    return response.data;
  }
);

interface CarState {
  selectedCar: Car | null;
  carList: any[];
  success: Boolean;
  loading: Boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalCars: number;
  totalPages: number;
}

const initialState = {
  selectedCar: null,
  carList: [],
  success: false,
  loading: false,
  error: "",
  page: 0,
  pageSize: 0,
  totalCars: 0,
  totalPages: 0,
} as CarState;

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload?.car;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state, action) => {
      Object.assign(state, initialState);
      state.loading = true;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = "";
      state.page = Number(action.payload?.page);
      state.pageSize = Number(action.payload?.pageSize);
      state.totalCars = Number(action.payload?.totalCars);
      state.totalPages = Number(action.payload?.totalPages);

      if (action.payload?.page === "1") {
        state.carList = action.payload?.cars;
      } else {
        state.carList = [...state?.carList, ...action.payload?.cars];
      }
    });
    builder.addCase(fetchCars.rejected, (state, action) => {
      Object.assign(state, initialState);
      state.error = action?.error?.message ?? "An error occurred";
    });
  },
});

export const { setSelectedCar } = carSlice.actions;
export default carSlice.reducer;
