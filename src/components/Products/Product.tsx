import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from '../../styles/Product.module.css';
import { ROUTES } from '../../utils/routers';
import { addItemToCart } from '../../features/user/userSlice';
import type Product from '../../types/Product';

const SIZES = [4, 4.5, 5];

interface ProductProps {
    item: Product,
}

const Product: React.FC<ProductProps> = ({ item }) => {
    const { title, price, images, description } = item;

    const dispatch = useDispatch();

    const [currentImage, setCurrentImage] = useState<string | undefined>(undefined);
    const [currentSize, setcurrentSize] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(!images.length) return;

        setCurrentImage(images[0]);
    }, [images]);

    const addToCart = () => {
        dispatch(addItemToCart(item))
    }

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div 
                    className={styles.current} 
                    style={{ backgroundImage: `url(${currentImage})` }}     
                />
                <div className={styles["images-list"]}>
                    {images.map((image, i) => (
                            <div 
                                key = {i}
                                className={styles.image}
                                style={{ backgroundImage: `url(${image})` }}
                                onClick={() => setCurrentImage(image)}
                            />
                        )
                    )}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>
                    {price}$
                </div>
            
                <p className={styles.description}>{description}</p>

                <div className={styles.actions}>
                    <button onClick={addToCart} className={styles.add} >В корзину</button>
                    <button className={styles.favourite}>В избранное</button>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.purchase}>19 человек купили</div>

                    <Link to={ROUTES.HOME}>Вернуться на главное</Link>
                </div>
            </div>
        </section>
    );
};

export default Product;