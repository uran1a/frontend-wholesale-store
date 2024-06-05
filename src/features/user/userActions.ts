import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../utils/constants";

import UserLogin from "../../types/UserLogin";
import UserSignup from "../../types/UserSignup";

import { createUserFailure, createUserStart, createUserSuccess, getProfileFailure, getProfileStart, getProfileSuccess, loginUserFailure, loginUserStart, loginUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userSlice";
import User from "../../types/User";
import ProfileRequest from "../../types/ProfileRequest";
import UpdateUser from "../../types/UpdateUser";



export const createUser =
  (data: UserSignup) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(createUserStart())
        
        console.log(data);

        const res = await axios.post(`${API_URL}/auth`, data);

        console.log(res.data);

        dispatch(createUserSuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(createUserFailure(e.message))
      }
    }

export const loginUser =
  (data: UserLogin) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginUserStart())

        const res = await axios.post(`${API_URL}/auth/login`, data);

        console.log(res.data);

        dispatch(loginUserSuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(loginUserFailure(e.message))
      }
    }

export const updateUser =
  (id: number, data: UpdateUser) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(updateUserStart())

        const res = await axios.put(`${API_URL}/auth/users/${id}`, data);

        console.log(res.data);

        dispatch(updateUserSuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(updateUserFailure(e.message))
      }
    }