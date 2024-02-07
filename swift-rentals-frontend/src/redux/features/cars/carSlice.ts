import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { carAPI } from '@/api/cars'

export const fetchCars = createAsyncThunk(
    'users/fetchByIdStatus',
    async () => {
        const response = await carAPI.getCarList();
        return response.data
    },
)

interface CarState {
    carList: [],
    success: Boolean,
    loading: Boolean,
    error: string | null;
    page: Number
    pageSize: Number
    totalCars: Number
    totalPages: Number
}

const initialState = {
    carList: [],
    success: false,
    loading: false,
    error: "",
    page: 0,
    pageSize: 0,
    totalCars: 0,
    totalPages: 0,
} as CarState

const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCars.pending, (state, action) => {
            console.log('Fetch Cars Called-------------------');

            state.success = false;
            state.loading = true;
            state.error = "";
            state.carList = []
        })
        builder.addCase(fetchCars.fulfilled, (state, action) => {
            console.log('Fetch Cars res - ' + JSON.stringify(action.payload));
            state.success = true;
            state.loading = false;
            state.error = "";
            state.carList = action.payload?.cars;
            state.page = action.payload?.page;
            state.pageSize = action.payload?.pageSize;
            state.totalCars = action.payload?.totalCars;
            state.totalPages = action.payload?.totalPages;
        })
        builder.addCase(fetchCars.rejected, (state, action) => {
            console.log('Fetch Cars error - ' + action?.error);
            state.success = false;
            state.loading = false;
            state.error = action?.error?.message ?? 'An error occurred';
        })
    },
})

export const { } = carSlice.actions
export default carSlice.reducer