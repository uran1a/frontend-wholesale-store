import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/User.module.css';

import { getProfile, loginUser } from '../../features/user/userActions';
import { store } from '../../features/store';
import { IRootState } from "../../features/store";

import UserLogin from '../../types/UserLogin';
import ProfileRequest from '../../types/ProfileRequest';

interface UserLoginFormProps {
    closeForm: () => void;
    toggleCurrentFormType: (type: string) => {};
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({ toggleCurrentFormType, closeForm }) => {
    const [values, setValues] = useState<UserLogin>({
        email: "",
        password: "",
    });

    const accessToken = useSelector(({ user } : IRootState) => user.accessToken);

    const handleChange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
        setValues(prevValues => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const isEmpty = Object.values(values).some(val => !val);
        
        if(isEmpty) return; // проверка полей <p error>

        await store.dispatch(loginUser(values));
        
        closeForm();
    } 

    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={closeForm} >
                <svg className="icon">
                    <use xlinkHref={`/sprite.svg#close`} />
                </svg>
            </div>

            <div className={styles.title}>
                Вход
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input 
                        type="email" 
                        placeholder="Ваша элект. почта" 
                        name="email" 
                        value={values.email} 
                        autoComplete="off" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className={styles.group}>
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        name="password" 
                        value={values.password} 
                        autoComplete="off" 
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className={styles.link} onClick={() => toggleCurrentFormType("signup")}>
                    Создать аккаунт
                </div>

                <button type="submit" className={styles.submit}>
                    Вход
                </button>
            </form>
        </div>

    );
};

export default UserLoginForm;