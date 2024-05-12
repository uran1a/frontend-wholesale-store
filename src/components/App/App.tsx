import React, { useEffect } from "react";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch, store } from "../../features/store";
import { getCategories } from "../../features/categories/categoriesActionCreators";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const clear = async () => {
            await store.dispatch(getCategories());
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