import React from "react";

import styles from "../../styles/Products.module.css";
import { Link } from "react-router-dom";
import Product from "../../types/Product";

interface ProductsProps {
    title: string,
    products: Product[],
    style: string,
    amount: number
}

const Products: React.FC<ProductsProps> = (props: ProductsProps) => {
    const list = props.products.filter((_, i) => i < props.amount);
    
    return (
        <section className={styles.products}>
            {props.title && <h2>{props.title}</h2>}

            <div className={styles.list}>
                {list.map(
                    (product: Product) => (
                        <Link to={`/products/${product.id}`} key={product.id} className={styles.product}>
                            <div 
                                className={styles.image} 
                                style={{backgroundImage: `url(${product.images[0]})`}}>
                            </div>

                            <div className={styles.wrapper}>
                                <h3 className={styles.title}>{product.title}</h3>
                                <div className={styles.cat}>{product.category.name}</div>
                                <div className={styles.info}>
                                    <div className={styles.prices}>
                                        <div className={styles.price}>{product.price}₽</div>
                                        <div className={styles.oldPrice}>
                                            {Math.floor(product.price * 0.8)}₽
                                        </div>
                                    </div>

                                    <div className={styles.purchases}>
                                        Купили {Math.floor(Math.random() * 20 + 1)} шт.
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                )}
            </div>
        </section>
    );
};

export default Products;