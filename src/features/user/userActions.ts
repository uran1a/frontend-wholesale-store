import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";

import UserLogin from "../../types/UserLogin";
import UserSignup from "../../types/UserSignup";

import { createUserFailure, createUserStart, createUserSuccess, getProfileFailure, getProfileStart, getProfileSuccess, loginUserFailure, loginUserStart, loginUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userSlice";
import User from "../../types/User";



export const createUser =
  (data: UserSignup) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(createUserStart())

        const res = await axios.post(`${BASE_URL}/users`, data);

        console.log(res.data);

        dispatch(createUserSuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(createUserFailure(e.message))
      }
    }

export const getProfile =
  (access_token: string) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(getProfileStart())

        const login = await axios(`${BASE_URL}/auth/profile`, {
          headers: {
            "Authorization": `Bearer ${access_token}`,
          }
        });

        console.log(login.data);

        dispatch(getProfileSuccess(login.data))
      } catch (e: any) {
        console.error(e)

        dispatch(getProfileFailure(e.message))
      }
    }

export const loginUser =
  (data: UserLogin) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginUserStart())

        const res = await axios.post(`${BASE_URL}/auth/login`, data);

        console.log(res.data.access_token);

        dispatch(loginUserSuccess(res.data.access_token))
        
      } catch (e: any) {
        console.error(e)

        dispatch(loginUserFailure(e.message))
      }
    }

export const updateUser =
  (data: User) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(updateUserStart())

        const res = await axios.put(`${BASE_URL}/users/${data.id}`, data);

        console.log(res.data);

        dispatch(updateUserSuccess(res.data))
      } catch (e: any) {
        console.error(e)

        dispatch(updateUserFailure(e.message))
      }
    }