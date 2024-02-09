import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Feature } from '@/types';
import { featuresAPI } from '@/api/features';

export const fetchFeatures = createAsyncThunk(
    'features/fetch',
    async () => {
        const response = await featuresAPI.getFeatureList();
        return response.data
    },
)

interface FeatureState {
    featureList: Feature[],
    success: Boolean,
    loading: Boolean,
    error: string | null;
}

const initialState = {
    featureList: [],
    success: false,
    loading: false,
    error: "",
} as FeatureState

const featureSlice = createSlice({
    name: 'feature',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFeatures.pending, (state, action) => {
            console.log('Fetch Features Called-------------------');

            state.success = false;
            state.loading = true;
            state.error = "";
            state.featureList = []
        })
        builder.addCase(fetchFeatures.fulfilled, (state, action) => {
            console.log('Fetch Features res - ' + JSON.stringify(action.payload));
            state.success = true;
            state.loading = false;
            state.error = "";
            state.featureList = action.payload?.features;
        })
        builder.addCase(fetchFeatures.rejected, (state, action) => {
            console.log('Fetch Features error - ' + action?.error);
            state.success = false;
            state.loading = false;
            state.error = action?.error?.message ?? 'An error occurred';
        })
    },
})

export const { } = featureSlice.actions
export default featureSlice.reducer