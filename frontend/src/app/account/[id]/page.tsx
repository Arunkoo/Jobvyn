"use client";

import { useAppData, user_service_url } from "@/context/AppContext";
import { User } from "@/type";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/loading";
import Info from "../component/info";
import Skills from "../component/skills";
const UserAccountPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoding] = useState(true);
  const { isAuth } = useAppData();

  async function fetchUserData() {
    const token = Cookies.get("token");

    try {
      const { data } = await axios.get(`${user_service_url}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  }

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            View user profile and information
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <Info user={user} isYourAccount={false} />
          {user?.role === "jobseeker" && (
            <Skills user={user} isYourAccount={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
