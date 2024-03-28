import userReducer from "@/redux/features/user/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import carReducer from "./features/cars/carSlice";
import BookingReducer from "./features/booking/bookingSlice";
import featureReducer from "./features/features/featureSlice";

const rootReducer = combineReducers({
  car: carReducer,
  feature: featureReducer,
  user: userReducer,
  booking: BookingReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
