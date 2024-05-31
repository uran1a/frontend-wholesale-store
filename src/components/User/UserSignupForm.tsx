import React, { ChangeEvent, useState } from 'react';

import styles from '../../styles/User.module.css';

import { createUser } from '../../features/user/userActions';
import { store } from '../../features/store';
import UserSignup from '../../types/UserSignup';

interface UserSignupFormProps {
    closeForm: () => void;
    toggleCurrentFormType: (type: string) => {};
}

const UserSignupForm: React.FC<UserSignupFormProps> = ({ toggleCurrentFormType, closeForm }) => {
    const [values, setValues] = useState<UserSignup>({
        name: "",
        email: "",
        password: "",
        avatar: "",
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

        await store.dispatch(createUser(values));
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
                Регистрация
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
                        type="name" 
                        placeholder="Ваше имя" 
                        name="name" 
                        value={values.name} 
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
                <div className={styles.group}>
                    <input 
                        type="avatar" 
                        placeholder="Аваратка" 
                        name="avatar" 
                        value={values.avatar}
                        autoComplete="off" 
                        onChange={handleChange} 
                        required
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