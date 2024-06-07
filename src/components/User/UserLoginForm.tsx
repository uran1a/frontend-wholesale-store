import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/User.module.css';

import { loginUser } from '../../features/user/userActions';
import { IRootState, useAppDispatch } from '../../features/store';

import UserLogin from '../../types/UserLogin';
import ValidationErrors from '../ValidationErrors/ValidationErrors';

interface UserLoginFormProps {
    closeForm: () => void;
    toggleCurrentFormType: (type: string) => {};
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({ toggleCurrentFormType, closeForm }) => {
    const { currentUser } = useSelector((state: IRootState) => state.user);
    const dispatch = useAppDispatch();

    const [values, setValues] = useState<UserLogin>({
        email: "",
        password: "",
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
        
        if(isEmpty)
            return;

        await dispatch(loginUser(values));
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
                Вход
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
                        type="password" 
                        placeholder="Пароль" 
                        name="password" 
                        value={values.password} 
                        autoComplete="off" 
                        onChange={handleChange} 
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