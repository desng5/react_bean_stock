import axios, { AxiosResponse } from "axios";
import { UserType } from "../types/user";
import {
  APIResponse,
  TokenType,
  apiClientNoAuth,
  apiClientBasicAuth,
  apiClientTokenAuth,
} from "./auth";
import { CoffeeType } from "../types/coffee";

const userEndpoint = "/users";
const coffeeEndpoint = "/coffees";

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
      error = "Something went wrong during register";
    }
  }
  return { error, data };
};

export const login = async (
  email: string,
  password: string
): Promise<APIResponse<TokenType>> => {
  let error, data;
  try {
    const response: AxiosResponse<TokenType> = await apiClientBasicAuth(
      email,
      password
    ).get("/token");
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.error;
    } else {
      error = "Something went wrong during login";
    }
  }
  return { error, data };
};

export const getMe = async (token: string): Promise<APIResponse<UserType>> => {
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
      error = "Something went wrong during getMe";
    }
  }
  return { error, data };
};

export const getAllCoffees = async (): Promise<APIResponse<CoffeeType[]>> => {
  let error, data;
  try {
    const response: AxiosResponse<CoffeeType[]> = await apiClientNoAuth().get(
      coffeeEndpoint
    );
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.message;
    } else {
      error = "Something went wrong during getAllCoffees";
    }
  }
  return { error, data };
};

export const createCoffee = async (
  newCoffee: CoffeeType,
  token: string
): Promise<APIResponse<CoffeeType>> => {
  let error, data;
  try {
    const response: AxiosResponse<CoffeeType> = await apiClientTokenAuth(
      token
    ).post(coffeeEndpoint, newCoffee);
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.error;
    } else {
      error = "Something went wrong during createCoffee";
    }
  }
  return { error, data };
};

export const deleteCoffee = async (
  coffeeId: number,
  token: string
): Promise<APIResponse<string>> => {
  let error, data;
  try {
    const response: AxiosResponse<{ success: string }> =
      await apiClientTokenAuth(token).delete(coffeeEndpoint + "/" + coffeeId);
    data = response.data.success;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data.error;
    } else {
      error = "Something went wrong during deleteCoffee";
    }
  }
  return { error, data };
};
