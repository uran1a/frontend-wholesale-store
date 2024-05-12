import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import categoriesSlice from "./categories/categoriesReducer";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
    },
    devTools: true,
})

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch 