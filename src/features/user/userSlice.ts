import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { UserState } from "../../types/UserState";
import UserSignup from "../../types/UserSignup";
import User from "../../types/User";


const initialState: UserState = {
    currentUser: null,
    accessToken: "",
    cart: [],
    formType: "signup",
    showForm: false,
    isLoading: false,
    error: null,
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

        toggleForm: (state, { payload }) => {
            state.showForm = payload;
        },

        toggleFormType: (state, { payload }) => {
            state.formType = payload;
        },

        createUserStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        createUserSuccess: (state, action: PayloadAction<UserSignup>): UserState => ({
            ...state,
            //currentUser: action.payload,
            isLoading: false,
            error: null
        }),
        createUserFailure: (state, action: PayloadAction<string>): UserState => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),

        loginUserStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        loginUserSuccess: (state, action: PayloadAction<string>): UserState => ({
            ...state,
            accessToken: action.payload,
            isLoading: false,
            error: null
        }),
        loginUserFailure: (state, action: PayloadAction<string>): UserState => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),

        getProfileStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        getProfileSuccess: (state, action: PayloadAction<User>): UserState => ({
            ...state,
            currentUser: action.payload,
            isLoading: false,
            error: null
        }),
        getProfileFailure: (state, action: PayloadAction<string>): UserState => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),

        updateUserStart: (state): UserState => ({
            ...state,
            isLoading: true,
        }),
        updateUserSuccess: (state, action: PayloadAction<User>): UserState => ({
            ...state,
            currentUser: action.payload,
            isLoading: false,
            error: null
        }),
        updateUserFailure: (state, action: PayloadAction<string>): UserState => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),
     
    }
});

export const { createUserStart, createUserSuccess, createUserFailure, 
    addItemToCart, removeItemFromCart,
    toggleForm, toggleFormType,
    loginUserStart, loginUserSuccess, loginUserFailure,
    getProfileStart, getProfileSuccess, getProfileFailure,
    updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

export default userSlice.reducer;