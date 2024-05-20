import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number,
    images: string[],
    title: string,
    category: Category,
    price: number,
    description: string,
    quantity: number,
}

export interface ProductsState {
    list: Product[],
    filtered: Product[],
    related: Product[],
    isLoading: boolean,
    error: string | null
}

const initialState: ProductsState = {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
    error: null,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterByPrice: (state, action: PayloadAction<number>): ProductsState => ({
            ...state,
            filtered: state.list.filter((product: Product) => product.price < action.payload),
        }),
        getRelatedProducts: (state, action: PayloadAction<number>): ProductsState => ({
            ...state,
            related: state.list.filter((product: Product) => product.category.id === action.payload),
        }),
        productsStart: (state): ProductsState => ({
            ...state,
            isLoading: true,
        }),
        productsSuccess: (state, action: PayloadAction<Product[]>): ProductsState => ({
            ...state,
            list: action.payload,
            isLoading: false,
            error: null
        }),
        productsFailure: (state, action: PayloadAction<Product[]>): ProductsState => ({
            ...state,
            isLoading: false,
            error: "failure products"
        }),
    }
});

export const { productsStart, productsSuccess, productsFailure, filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;