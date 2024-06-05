import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Cart.module.css";

import { IRootState } from "../../features/store";
import { sumBy } from "../../utils/common";
import { addItemToCart, removeItemFromCart } from "../../features/user/userSlice";
import Product from "../../types/Product";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(({ user }: IRootState) => user)

    const changeQuantity = (item: Product, quantity: number) => { //проверку макс кол-во на складе
        dispatch(addItemToCart({ ...item, quantity }));
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeItemFromCart(id));
    }

    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Ваша корзина</h2>
            {!cart.length ? (
                <div className={styles.empty}>Корзина пуста</div>
            ) : (
                <>
                    <div className={styles.list}>
                        {cart.map((item) => {
                            const { id, title, category, images, price, quantity } = item

                            return <>
                                    <div className={styles.item} key={id}>
                                        <div 
                                            className={styles.image}
                                            style={{ backgroundImage: `url(${images[0]})` }}
                                        />
                                        
                                        <div className={styles.info}>
                                            <h3 className={styles.name}>{title}</h3>
                                            <div className={styles.category}>{category.name}</div>
                                        </div>

                                        <div className={styles.quantity}>
                                            <div 
                                                className={styles.minus}   
                                                onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                                            >
                                                <svg className="icon">
                                                    <use xlinkHref={`/sprite.svg#minus`} />
                                                </svg>
                                            </div>
                                            <span>{quantity}</span>
                                            <div 
                                                className={styles.plus}
                                                onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                                            >
                                                <svg className="icon">
                                                    <use xlinkHref={`/sprite.svg#plus`} />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className={styles.total}>{price * quantity}$</div>

                                        <div 
                                            className={styles.close}
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <svg className="icon">
                                                <use xlinkHref={`/sprite.svg#close`} />
                                            </svg>
                                        </div>
                                    </div>
                            </>
                        
                        })}
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.total}>
                            ИТОГОВАЯ ЦЕНА: {" "}
                            <span>
                                {sumBy(cart.map(({ quantity, price}) => quantity * price ))}$
                            </span>
                        </div>      

                        <button className={styles.proceed}>Оформить заказ</button>       
                    </div>
                </>
            )}
        </section>
    );
};

export default Cart;