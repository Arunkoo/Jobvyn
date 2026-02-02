/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppContextType, Application, AppProviderProps, User } from "@/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
  const [application, setApplication] = useState<Application[] | null>(null);

  async function fetchUserData() {
    if (!token) {
      setLoading(false);
      setIsAuth(false);
      return;
    }

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
  // Update Profile Pic..

  async function updateProfilePic(formData: any) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service_url}/api/user/update/profile_pic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchUserData();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // resume Update..
  async function updateResume(formData: any) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service_url}/api/user/update/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchUserData();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  //update bio,name, phoneNumber....
  async function updateUser(name: string, phoneNumber: string, bio: string) {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service_url}/api/user/update/profile`,
        { name, phoneNumber, bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchUserData();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  //addSkillHandler....
  async function addSkill(
    skill: string,
    setSkill: React.Dispatch<React.SetStateAction<string>>,
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service_url}/api/user/skill/add`,
        { skillName: skill },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);
      setSkill("");
      fetchUserData();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  //remove skill...
  async function removeSkill(skill: string) {
    try {
      const { data } = await axios.put(
        `${user_service_url}/api/user/skill/delete`,
        { skillName: skill },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);

      fetchUserData();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  //apply for jobs...
  async function applyJob(job_id: number) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service_url}/api/user/apply/job`,
        { job_id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);
      fetchApplication();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  //fetch all Application....
  async function fetchApplication() {
    try {
      const { data } = await axios.get(
        `${user_service_url}/api/user/application/all`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setApplication(data);
    } catch (error) {
      console.log(error);
    }
  }
  //logout function..
  async function logoutUser() {
    if (!token) return;
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out successfully");
  }

  useEffect(() => {
    fetchUserData();
    fetchApplication();
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
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill,
        applyJob,
        application,
        fetchApplication,
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
