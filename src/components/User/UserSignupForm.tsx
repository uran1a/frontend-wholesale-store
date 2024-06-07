import React, { ChangeEvent, useEffect, useState } from 'react';

import styles from '../../styles/User.module.css';

import { createUser } from '../../features/user/userActions';
import { IRootState, store, useAppDispatch } from '../../features/store';
import UserSignup from '../../types/UserSignup';
import ValidationErrors from '../ValidationErrors/ValidationErrors';
import { useSelector } from 'react-redux';

interface UserSignupFormProps {
    closeForm: () => void;
    toggleCurrentFormType: (type: string) => {};
}

const UserSignupForm: React.FC<UserSignupFormProps> = ({ toggleCurrentFormType, closeForm }) => {
    const { currentUser } = useSelector((state: IRootState) => state.user);
    const dispatch = useAppDispatch();

    const [values, setValues] = useState<UserSignup>({
        name: "",
        email: "",
        password: "",
        avatar: "",
        phoneNumber: "",
        address: "",
    });

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

        await dispatch(createUser(values));
    }

    useEffect(() => {
        if (currentUser != null) {
            closeForm();
        } else {
            console.log(currentUser);
        }
    }, [currentUser]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={closeForm} >
                <svg className="icon">
                    <use xlinkHref={`/sprite.svg#close`} />
                </svg>
            </div>

            <div className={styles.title}>
                Регистрация
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>

                <ValidationErrors />

                <div className={styles.group}>
                    <input 
                        type="text" 
                        placeholder="Ваша элект. почта" 
                        name="email" 
                        value={values.email} 
                        autoComplete="off" 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.group}>
                    <input 
                        type="name" 
                        placeholder="Ваше имя" 
                        name="name" 
                        value={values.name} 
                        autoComplete="off" 
                        onChange={handleChange} 
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
                    />
                </div>
                <div className={styles.group}>
                    <input 
                        type="avatar" 
                        placeholder="Аваратка" 
                        name="avatar" 
                        value={values.avatar}
                        autoComplete="off" 
                        onChange={handleChange} 
                    />
                </div>

                <div className={styles.group}>
                    <input 
                        type="phoneNumber" 
                        placeholder="Моб. телефон" 
                        name="phoneNumber" 
                        value={values.phoneNumber}
                        autoComplete="off" 
                        onChange={handleChange} 
                    />
                </div>

                <div className={styles.group}>
                    <input 
                        type="address" 
                        placeholder="Адрес доставки" 
                        name="address" 
                        value={values.address}
                        autoComplete="off" 
                        onChange={handleChange} 
                    />
                </div>

                <div className={styles.link} onClick={() => toggleCurrentFormType("login")}>
                    У вас есть аккаунт
                </div>

                <button type="submit" className={styles.submit}>
                    Создать аккаунт
                </button>
            </form>
        </div>

    );
};

export default UserSignupForm;