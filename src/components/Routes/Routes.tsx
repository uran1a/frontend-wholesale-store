import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";
import { ROUTES } from "../../utils/routers";
import SingleProduct from "../Products/SingleProduct";
import Profile from "../Profile/Profile";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />}></Route>
            <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmation />} />
        </Routes>
    )
};

export default AppRoutes;