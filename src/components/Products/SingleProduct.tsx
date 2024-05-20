import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routers";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../features/products/productsReducer";
import Products from "./Products";
import { IRootState } from "../../features/store";
import { addListener } from "@reduxjs/toolkit";


const SingleProduct: React.FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();
    if (!id) {
        return <div>Invalid ID</div>;
    }
    const numericId = parseInt(id, 10);

    const products = useSelector(({ products }: IRootState) => products);

    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery(numericId);

    useEffect(() => {
        if(!isFetching && !isLoading && !isSuccess){
            navigate(ROUTES.HOME);
        }
    }, [isFetching, isLoading, isSuccess]);

    useEffect(() => {
        if(!data || !products.list.length) return;
        
        dispatch(getRelatedProducts(data.category.id));
    }, [data, dispatch, products.list.length]);

    if (!data) {
        return <div>Invalid Data</div>;
    }

    console.log(data);
    
    return !data ? (
        <section className="preloader">Loading...</section>
    ) : (
        <>
            <Product item={data}></Product>
            <Products products={products.related} amount={5} title="Related products" style={""} />
        </>
    )
};

export default SingleProduct;