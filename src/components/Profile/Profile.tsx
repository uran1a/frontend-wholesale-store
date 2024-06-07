import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/Profile.module.css';

import { IRootState, store } from '../../features/store';
import { updateUser } from '../../features/user/userActions';

import User from '../../types/User';
import UpdateUser from '../../types/UpdateUser';
import ValidationErrors from '../ValidationErrors/ValidationErrors';

const Profile = () => {
    const currentUser = useSelector(({ user }: IRootState) => user.currentUser);

    const [values, setValues] = useState<User>({
        id: 0,
        name: "",
        email: "",
        password: "",
        avatar: "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        if(!currentUser) return;

        setValues(currentUser);
    }, [currentUser]);
    
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
            return; // проверка полей <p error>

        var updatedUser: UpdateUser = {
            email: values.email,
            password: values.password,
            name: values.name,
            avatar: values.avatar,
            phoneNumber: values.phoneNumber,
            address: values.address,
        }

        await store.dispatch(updateUser(values.id, updatedUser));
    }

    return (
        <section className={styles.profile}>
            {!currentUser ? <span>Вам нужно войти в аккаунт</span> : (
                <form className={styles.form} onSubmit={handleSubmit}>

                    <ValidationErrors />
                    
                    <div className={styles.group}>
                        <input 
                            type="email" 
                            placeholder="Ваша элек. почта" 
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
                            placeholder="Ваш пароль" 
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
                            placeholder="Ваша аватарка" 
                            name="avatar" 
                            value={values.avatar}
                            autoComplete="off" 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input 
                            type="phoneNumber" 
                            placeholder="Ваш моб. телефон" 
                            name="phoneNumber" 
                            value={values.phoneNumber}
                            autoComplete="off" 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input 
                            type="address" 
                            placeholder="Ваш адрес" 
                            name="address" 
                            value={values.address}
                            autoComplete="off" 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    
                    <button type="submit" className={styles.submit}>
                        Изменить
                    </button>
             </form>
            )}
        </section>
    );
};

export default Profile;