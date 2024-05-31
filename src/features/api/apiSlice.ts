import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from "../../utils/constants";
import { buildUrl } from '../../utils/common';

import Product from '../../types/Product';
import SearchParams from '../../types/SearchParams';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: ["Product"],
        }),
        getProducts: builder.query<Product[], SearchParams>({
            query: (params) => buildUrl("/products/search", params),
            providesTags: ["Product"],
        })
    })
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice