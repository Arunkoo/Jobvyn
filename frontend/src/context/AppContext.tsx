"use client";

import { AppContextType, AppProviderProps, User } from "@/type";
import React, { createContext, useContext, useState } from "react";
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
