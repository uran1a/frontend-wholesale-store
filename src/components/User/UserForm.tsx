import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/User.module.css';

import { IRootState } from '../../features/store';
import UserSignupForm from './UserSignupForm';
import { toggleForm, toggleFormType } from '../../features/user/userSlice';
import UserLoginForm from './UserLoginForm';

const UserForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: IRootState) => state.user);

    const closeForm = () => dispatch(toggleForm(false));
    const toggleCurrentFormType = (type: string) => dispatch(toggleFormType(type))

    return (
        user.showForm ? (
            <>
                <div className={styles.overlay} onClick={closeForm}></div>
                { user.formType === "signup" ?  
                    <UserSignupForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType}/> 
                    : 
                    <UserLoginForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType}/> }
            </>
        )
        : <></>
    );
}

export default UserForm;