import axios, { AxiosResponse } from "axios";
import { UserType } from "../types/user";

const base: string = "https://brew-stock.onrender.com";
const userEndpoint: string = "/user";
const coffeeEndpoint = "/coffee";

const apiClientTokenAuth = (token: string) =>
  axios.create({
    baseURL: base,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

type APIRespone<T> = {
  error: string | undefined;
  data: T | undefined;
};

export const getMe = async (token: string): Promise<AxiosResponse<UserType>> => {
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
};
