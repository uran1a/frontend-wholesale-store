import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import categoriesSlice from "./categories/categoriesReducer";
import productsSlice from "./products/productsReducer";
import { apiSlice } from "./api/apiSlice";
import userSlice from "./user/userReducer";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch 