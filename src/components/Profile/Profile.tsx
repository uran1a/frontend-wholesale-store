import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/Profile.module.css';

import { IRootState, store } from '../../features/store';
import { updateUser } from '../../features/user/userActions';

import User from '../../types/User';

const Profile = () => {
    const currentUser = useSelector(({ user }: IRootState) => user.currentUser);

    const [values, setValues] = useState<User>({
        id: 0,
        name: "",
        email: "",
        password: "",
        avatar: "",
        role: "",
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

        await store.dispatch(updateUser(values));
    }

    return (
        <section className={styles.profile}>
            {!currentUser ? <span>You need to log in</span> : (
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
                    
                    <button type="submit" className={styles.submit}>
                        Update
                    </button>
             </form>
            )}
        </section>
    );
};

export default Profile;