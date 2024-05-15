import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Categories.module.css";
import { Category } from "../../features/categories/categoriesReducer";


interface CategoriesProps {
    title: string,
    categories: Category[],
    style: string,
    amount: number
}

const Categories: React.FC<CategoriesProps> = (props: CategoriesProps) => {
    const list = props.categories.filter((_, i) => i < props.amount);

    return (
        <section className={styles.section}>
            <h2>{props.title}</h2>

            <div className={styles.list}>
                {list.map((category: Category) => (
                    <Link to={`/categories/${category.id}`} key={category.id} className={styles.item}>
                        <div 
                            className={styles.image}
                            style={{backgroundImage: `url(${category.image})`}}
                        />
                        <h3 className={styles.title}>{category.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Categories;