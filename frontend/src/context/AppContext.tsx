"use client";

import { AppContextType, AppProviderProps, User } from "@/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
export const utils_service_url = "http://localhost:5001";
export const auth_service_url = "http://localhost:5000";
export const user_service_url = "http://localhost:5002";
export const job_service_url = "http://localhost:5003";
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const token = Cookies.get("token");

  async function fetchUserData() {
    try {
      const { data } = await axios.get(`${user_service_url}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppContext.Provider
      value={{
        user,
        btnLoading,
        loading,
        isAuth,
        setIsAuth,
        setLoading,
        setUser,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context;
};
