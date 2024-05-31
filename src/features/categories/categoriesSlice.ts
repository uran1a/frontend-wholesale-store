import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import Category from "../../types/Category";

export interface CategoriesState {
    list: Category[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    list: [],
    isLoading: false,
    error: null,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoriesStart: (state): CategoriesState => ({
            ...state,
            isLoading: true,
        }),
        categoriesSuccess: (state, action: PayloadAction<Category[]>): CategoriesState => ({
            ...state,
            list: action.payload,
            isLoading: false,
            error: null
        }),
        categoriesFailure: (state, action: PayloadAction<Category[]>): CategoriesState => ({
            ...state,
            isLoading: false,
            error: "failure categories"
        }),
    }
});

export const { categoriesStart, categoriesSuccess, categoriesFailure } = categoriesSlice.actions;

export default categoriesSlice.reducer;