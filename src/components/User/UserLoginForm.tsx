import React, { ChangeEvent, useState } from 'react';

import styles from '../../styles/User.module.css';

import { getProfile, loginUser } from '../../features/user/userActions';
import { store } from '../../features/store';
import UserLogin from '../../types/UserLogin';
import { IRootState } from "../../features/store";
import { useSelector } from 'react-redux';

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

        console.log(accessToken);
        
        await store.dispatch(getProfile(accessToken));
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
                Log In
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
                        type="password" 
                        placeholder="Your password" 
                        name="password" 
                        value={values.password} 
                        autoComplete="off" 
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className={styles.link} onClick={() => toggleCurrentFormType("signup")}>
                    Create an account
                </div>

                <button type="submit" className={styles.submit}>
                    Login
                </button>
            </form>
        </div>

    );
};

export default UserLoginForm;