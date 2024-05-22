import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../../styles/Sidebar.module.css";

import { IRootState } from "../../features/store";
import { Category } from "../../features/categories/categoriesSlice";

const Sidebar = () => {
    const list = useSelector((state: IRootState) => state.categories.list) as Category[];

    const limitedList = list.slice(0, 10);

    console.log("list", list);

    return (
        <section className={styles.sidebar}>
            <div className={styles.title}>CATEGORIES</div>
            <nav>
                <ul className={styles.menu}>
                    { limitedList.map(item => (
                        <li key={item.id}>
                            <NavLink 
                                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                                to={`/categories/${item.id}`}>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.footer}>
                <a href="/help" target="_blank" className={styles.link}>
                    Help
                </a>
                <a href="/temps" target="_blank" className={styles.link} style={{textDecoration: "underline"}}>
                    Terms & Conditions
                </a>
            </div>
        </section>
    );
};

export default Sidebar;