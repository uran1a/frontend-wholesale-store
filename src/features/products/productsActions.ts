import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../utils/constants";
import { productsFailure, productsStart, productsSuccess } from "./productsSlice";

export const getProducts = () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            dispatch(productsStart());
            
            const res = await axios(`${API_URL}/products`);
            
            console.log(res.data);
            
            dispatch(productsSuccess(res.data));
        } catch (e: any) {
            console.log(e);
            dispatch(productsFailure(e.message));
        }
    }