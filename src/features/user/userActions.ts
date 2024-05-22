import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";

import User from "../../types/User";
import UserLogin from "../../types/UserLogin";

import { createUserFailure, createUserStart, createUserSuccess, getProfileFailure, getProfileStart, getProfileSuccess, loginUserFailure, loginUserStart, loginUserSuccess } from "./userSlice";



export const createUser =
  (data: User) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(createUserStart())

        const res = await axios.post(`${BASE_URL}/users`, data);

        console.log(res.data);

        dispatch(createUserSuccess(res.data))
        //dispatch(getProfile())
        
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
        //dispatch(getProfile())
        
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
