import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterByPrice } from "../../features/products/productsSlice";
import { IRootState } from "../../features/store";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";

const Home = () => {
    const dispatch = useDispatch();

    const state = useSelector((state: IRootState) => state);

    useEffect(() => {
        if(!state.products.list.length) return;

        dispatch(filterByPrice(100));
    }, [dispatch, state.products.list.length]);

    return (
        <>
            <Poster />
            <Products title="Trending" products={state.products.list} amount={5} style={""} />
            <Categories title="Worth seeing" categories={state.categories.list} amount={5} style={""} />
            <Banner />
            <Products title="Less then 100$" products={state.products.filtered} amount={5} style={""} />
        </>
    );
};

export default Home;