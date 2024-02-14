import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/cars/carSlice";
import featureReducer from "./features/features/featureSlice";

export const store = configureStore({
    reducer: {
        car: carReducer,
        feature: featureReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;