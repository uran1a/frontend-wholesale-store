import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";
import { productsFailure, productsStart, productsSuccess } from "./productsReducer";

export const getProducts = () =>
    async (dispath: Dispatch<any>): Promise<void> => {
        try {
            dispath(productsStart());

            const res = await axios(`${BASE_URL}/products`);
            
            console.log(res.data);

            dispath(productsSuccess(res.data));
        } catch (e: any) {
            console.log(e);
            dispath(productsFailure(e.message));
        }
    }