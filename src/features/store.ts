import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import categoriesSlice from "./categories/categoriesReducer";
import productsSlice from "./products/productsReducer";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
    },
    devTools: true,
})

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch 