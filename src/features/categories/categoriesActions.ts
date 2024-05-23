import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../utils/constants";
import { categoriesFailure, categoriesStart, categoriesSuccess } from "./categoriesSlice";

export const getCategories = () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            dispatch(categoriesStart());

            const res = await axios(`${API_URL}/categories`);
            
            console.log(res.data);

            dispatch(categoriesSuccess(res.data));
        } catch (e: any) {
            console.log(e);
            dispatch(categoriesFailure(e.message));
        }
    }