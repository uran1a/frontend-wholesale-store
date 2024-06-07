import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { UserState } from "../../types/UserState";
import User from "../../types/User";
import ValidationError from "../../types/ValidationError";


const initialState: UserState = {
    currentUser: null,
    accessToken: "",
    cart: [],
    formType: "signup",
    showForm: false,
    showConfirmation: false,
    isLoading: false,
    errors: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({ id }) => id === payload.id)

            if(found){
                newCart = newCart.map((item) => {
                    return item.id === payload.id 
                        ? { ...item, quantity: payload.quantity || item.quantity + 1}
                        : item;
                });
            } else {
                newCart.push({...payload, quantity: 1});
            }

            state.cart = newCart;
        },

        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id !== payload);
        },

        clearCart: (state) => {
            state.cart = [];
        },

        toggleForm: (state, { payload }) => {
            state.showForm = payload;
            state.errors = null;
        },

        toggleConfirmation: (state, { payload }) => {
            state.showConfirmation = payload;
        },

        toggleFormType: (state, { payload }) => {
            state.formType = payload;
            state.errors = null;
        },

        createUserStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        createUserSuccess: (state, action: PayloadAction<User>): UserState => ({
            ...state,
            currentUser: action.payload,
            isLoading: false,
            errors: null
        }),
        createUserFailure: (state, action: PayloadAction<ValidationError[]>): UserState => ({
            ...state,
            isLoading: false,
            errors: action.payload,
        }),

        loginUserStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        loginUserSuccess: (state, action: PayloadAction<User>): UserState => ({
            ...state,
            currentUser: action.payload,
            isLoading: false,
            errors: null
        }),
        loginUserFailure: (state, action: PayloadAction<ValidationError[]>): UserState => ({
            ...state,
            isLoading: false,
            errors: action.payload,
        }),

        getProfileStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        getProfileSuccess: (state, action: PayloadAction<User>): UserState => ({
            ...state,
            currentUser: action.payload,
            isLoading: false,
            errors: null
        }),
        getProfileFailure: (state, action: PayloadAction<ValidationError[]>): UserState => ({
            ...state,
            isLoading: false,
            errors: action.payload,
        }),

        updateUserStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        updateUserSuccess: (state, action: PayloadAction<User>): UserState => ({
            ...state,
            currentUser: action.payload,
            isLoading: false,
            errors: null
        }),
        updateUserFailure: (state, action: PayloadAction<ValidationError[]>): UserState => ({
            ...state,
            isLoading: false,
            errors: action.payload,
        }),
     
    }
});

export const { createUserStart, createUserSuccess, createUserFailure, 
    addItemToCart, removeItemFromCart, clearCart,
    toggleForm, toggleFormType, toggleConfirmation,
    loginUserStart, loginUserSuccess, loginUserFailure,
    getProfileStart, getProfileSuccess, getProfileFailure,
    updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

export default userSlice.reducer;