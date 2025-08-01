import axios from "axios";
import { handleError } from "../helper/ErrorHandler";
import { UserProfileToken } from "../types/user";

const API = "http://localhost:5013/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(API + "account/login", {
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(API + "account/register", {
      email: email,
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};
