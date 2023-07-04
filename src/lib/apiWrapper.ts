import axios, { AxiosResponse } from "axios";
import { UserType } from "../types/user";

const base: string = "https://brew-stock.onrender.com";
const userEndpoint: string = "/user";
const coffeeEndpoint = "/coffee";

const apiClientNoAuth = () => axios.create({ baseURL: base });
const apiClientBasicAuth = (username: string, password: string) =>
  axios.create({
    baseURL: base,
    headers: { Authorization: "Bearer " + btoa(username + ":" + password) },
  });

const apiClientTokenAuth = (token: string) =>
  axios.create({
    baseURL: base,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

type APIResponse<T> = {
  error: string | undefined;
  data: T | undefined;
};

export const register = async (
  newUser: UserType
): Promise<APIResponse<UserType>> => {
  let error, data;
  try {
    const response: AxiosResponse<UserType> = await apiClientNoAuth().post(
      userEndpoint,
      newUser
    );
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.error;
    } else {
      error = "Something went wrong";
    }
  }
  return { error, data };
};

export const login = async (username: string, password: string): Promise<APIResponse<UserType>> => {
    let error, data;
  try {
    const response: AxiosResponse<UserType> = await apiClientBasicAuth(username, password).get("/token")
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.error;
    } else {
      error = "Something went wrong";
    }
  }
  return { error, data };
}

export const getMe = async (
  token: string
): Promise<AxiosResponse<UserType>> => {
  let error, data;
  try {
    const response: AxiosResponse<UserType> = await apiClientTokenAuth(
      token
    ).get("/me");
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.error;
    } else {
      error = "Something went wrong";
    }
  }
  return {
    error,
    data,
  };
};
