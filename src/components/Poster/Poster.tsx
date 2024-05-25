import React from "react";

import styles from "../../styles/Home.module.css";

import BG from "../../images/backpack.png";

const Poster: React.FC = () => {
    return <section className={styles.home}>
        <div className={styles.title}>СКИДКА 20%</div>
        <div className={styles.product}>
            <div className={styles.text}>
                <div className={styles.subtitle}>хит продаж 2024 года</div>
                <h1 className={styles.head}>Рюкзак JanSport SuperBreak</h1>
                <button className={styles.button}>Купить сейчас</button>
            </div>
            <div className={styles.image}>
                <img src={BG} alt="" />
            </div>
        </div>
    </section>;
}

export default Poster;