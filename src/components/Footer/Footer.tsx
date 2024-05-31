import React from "react";

import styles from "../../styles/Footer.module.css";
import { ROUTES } from "../../utils/routers";
import { Link } from "react-router-dom";

import LOGO from "../../images/logo.png";

const Footer = () => {
    return (
        <section className={styles.footer}>
            <div className = {styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="OfficeTrade" />
                </Link>
            </div>

            <div className={styles.rights}>
                Developed by{" "}
                <a href="https://github.com/uran1a" target="_blank" rel="noreferrer" >Zaburdyayev</a>
                
            </div>
            <div className={styles.socials}>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer" >
                    <svg className="icon">
                        <use xlinkHref={`/sprite.svg#instagram`} />
                    </svg>
                </a>

                <a href="https://facebook.com/" target="_blank" rel="noreferrer" >
                    <svg className="icon">
                        <use xlinkHref={`/sprite.svg#facebook`} />
                    </svg>
                </a>

                <a href="https://youtube.com/" target="_blank" rel="noreferrer" >
                    <svg className="icon">
                        <use xlinkHref={`/sprite.svg#youtube`} />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default Footer;