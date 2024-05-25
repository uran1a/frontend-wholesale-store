import React from "react";

import styles from "../../styles/Home.module.css";

const Banner = () => (
    <section className={styles.banner}>
        <div className={styles.left}>
            <p className={styles.content}>
                НОВЫЙ УЧЕБНЫЙ ГОД
                <span>СКИДКИ</span>
            </p>
            <button className={styles.more}>Смотреть больше</button>
        </div>

        <div className={styles.right}>
            <div className={styles.overlay}></div>
            <img src="https://img.xn--80ady2a0c.xn--p1ai/uploads/posts/2022-07/portfel.jpg"></img>
            <p className={styles.discount}>
                сэкономь <span>50%</span> на канцелярии
            </p>
        </div>
    </section>
);

export default Banner;