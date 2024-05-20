import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";
import { ROUTES } from "../../utils/routers";
import SingleProduct from "../Products/SingleProduct";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />}></Route>
            <Route path={ROUTES.PRODUCT} element={<SingleProduct></SingleProduct>} />
        </Routes>
    )
};

export default AppRoutes;