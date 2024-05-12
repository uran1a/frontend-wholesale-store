import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";
import { categoriesFailure, categoriesStart, categoriesSuccess } from "./categoriesReducer";

// export const getCategories = createAsyncThunk<string[], void>('categories/getCategories', async (_, thunkAPI) => {
//     try{
//         const res = 
//         return res.data;
//     } catch(err) {
//         console.log(err);
//         return thunkAPI.rejectWithValue(err);
//     }
// });

export const getCategories = () =>
    async (dispath: Dispatch<any>): Promise<void> => {
        try {
            dispath(categoriesStart());

            const res = await axios(`${BASE_URL}/categories`);
            
            console.log(res.data);

            dispath(categoriesSuccess(res.data));
        } catch (e: any) {
            console.log(e);
            dispath(categoriesFailure(e.message));
        }
    }