import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from '../../styles/Header.module.css';

import { ROUTES } from "../../utils/routers";

import LOGO from "../../images/logo.png";
import AVATAR from "../../images/avatar.jpg";
import { IRootState } from "../../features/store";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Product from "../../types/Product";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const { user } = useSelector((state: IRootState) => state);

    const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

    const { data, isLoading } = useGetProductsQuery({ title: searchValue });

    useEffect(() => {
        if(!user.currentUser) return;

        setValues(user.currentUser);
    }, [user.currentUser]);

    const handleClick = () => {
        if(!user.currentUser) dispatch(toggleForm(true));
        else navigate(ROUTES.PROFILE);
    }

    const handleSearch = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(value);
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="OfficeTrade" />
                </Link>
            </div>
        
            <div className={styles.info}>
                <div className={styles.user} onClick={handleClick}>
                    <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }} />
                    <div className={styles.username}>{values.name}</div>
                </div>

                <form className={styles.form}>
                    <div className={styles.icon}>
                        <svg className="icon">
                            <use xlinkHref={`/sprite.svg#search`} />
                        </svg>
                    </div>
                    <div className={styles.input}> 
                        <input 
                            type="search" 
                            name="search" 
                            placeholder="Ищите что угодно..."
                            autoComplete="off"
                            onChange={handleSearch}
                            value={searchValue} 
                        />
                    </div>

                    { searchValue && (
                        <div className={styles.box}>
                            {isLoading ?
                                "Loading"
                                : !data?.length
                                ? "No results"
                                : data.map(({ id, title, images}: Product) => {
                                    return (
                                        <Link
                                            key={id} 
                                            className={styles.item} 
                                            to={`/products/${id}`}
                                            onClick={() => setSearchValue("")}
                                        >
                                            <div 
                                                className={styles.image}
                                                style={{ backgroundImage: `url(${images[0]})` }}
                                            />
                                            <div className="{styles.title">{title}</div>
                                        </Link>
                                    )
                                })}                            
                        </div> 
                    )}
                </form>
                <div className={styles.account}>
                    <Link to={ROUTES.HOME} className={styles.favourites}>
                        <svg className={styles["icon-fav"]}>
                            <use xlinkHref={`/sprite.svg#heart`} />
                        </svg>
                    </Link>
                    <Link to={ROUTES.CART} className={styles.cart}>
                        <svg className={styles["icon-cart"]}>
                            <use xlinkHref={`/sprite.svg#bag`} />
                        </svg>
                        {!!user.cart.length && (<span className={styles.count}>{user.cart.length}</span>)}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;