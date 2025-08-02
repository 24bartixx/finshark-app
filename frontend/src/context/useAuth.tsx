import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserProfile } from "../types/user";
import axios from "axios";
import { loginAPI, registerAPI } from "../services/AuthServices";
import { handleError } from "../helper/ErrorHandler";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  isLoggedIn: () => boolean;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const nav = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result?.data.token);

          const userObj = {
            userName: result?.data.userName,
            email: result?.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(result?.data.token);
          setUser(userObj);

          nav("/search");
        }
      })
      .catch((error) => handleError(error));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result?.data.token);

          const userObj = {
            userName: result?.data.userName,
            email: result?.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(result?.data.token);
          setUser(userObj);

          nav("/search");
        }
      })
      .catch((error) => handleError(error));
  };

  const isLoggedIn = () => {
    return !!user && !!token;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    nav("/");
  };

  return (
    <UserContext.Provider
      value={{ token, user, registerUser, loginUser, isLoggedIn, logout }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
