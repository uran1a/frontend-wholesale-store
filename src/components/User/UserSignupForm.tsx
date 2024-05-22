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
                Sign Up
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input 
                        type="email" 
                        placeholder="Your email" 
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
                        placeholder="Your name" 
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
                        placeholder="Your password" 
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
                        placeholder="Your avatar" 
                        name="avatar" 
                        value={values.avatar}
                        autoComplete="off" 
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className={styles.link} onClick={() => toggleCurrentFormType("login")}>
                    I already have an account
                </div>

                <button type="submit" className={styles.submit}>
                    Create an account
                </button>
            </form>
        </div>

    );
};

export default UserSignupForm;