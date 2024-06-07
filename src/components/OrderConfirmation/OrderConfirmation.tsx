import React from "react";
import { useSelector } from "react-redux";

import styles from '../../styles/User.module.css';
import { IRootState, useAppDispatch } from "../../features/store";
import { clearCart, toggleConfirmation } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routers";

const OrderConfirmation = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: IRootState) => state.user);

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        dispatch(toggleConfirmation(false));
        dispatch(clearCart());
        navigate(ROUTES.HOME);
    }

    return (
        user.showConfirmation ? (
            <>
                <div className={styles.overlay} onClick={handleClick}></div>
                <div className={styles.wrapper}>
                    <div className={styles.close} onClick={handleClick} >
                        <svg className="icon">
                            <use xlinkHref={`/sprite.svg#close`} />
                        </svg>
                    </div>
                    <div className={styles.title}>
                        <strong>Заказ оформлен</strong>
                    </div>
                    <form className={styles.form}>
                        <div className={styles.group}>
                        <p>Уважаемый <strong>{user.currentUser!.name}</strong>!</p>
                        </div>
                        <div className={styles.group}>
                            <p>Ваш заказ будет доставлен по адрес: <strong>{user.currentUser!.address}</strong>.</p>
                        </div>
                        <div className={styles.group}>
                            <p>В течении <strong>24 часов</strong>.</p>
                        </div>
                        <div className={styles.group}>
                            <p>Спасибо, что выбрали наш магазин!</p>
                        </div>

                        <button onClick={handleClick} className={styles.submit}>
                            Хорошо
                        </button>
                    </form>
                </div>
            </>
        ) 
        : <></>
    );
};

export default OrderConfirmation;