import React, { useEffect } from "react";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch, store } from "../../features/store";

import { getCategories } from "../../features/categories/categoriesActions";
import { getProducts } from "../../features/products/productsActions";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const clear = async () => {
            await store.dispatch(getCategories());
            await store.dispatch(getProducts());
        };
        clear() 
    }, [dispatch]);

    return (
        <div className="app">
            <Header />
            <div className="container">
                <Sidebar />
                <AppRoutes />
            </div>
            <Footer />
        </div>
    )
};

export default App;