"use client";

import { useAppData, user_service_url } from "@/context/AppContext";
import { User } from "@/type";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/loading";
import Info from "../component/info";
import Skills from "../component/skills";
const UserAccountPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoding] = useState(true);

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
    <div className="w-[90%] md:w-[60%] m-auto">
      <Info user={user} isYourAccount={false} />
      {user?.role === "jobseeker" && (
        <Skills user={user} isYourAccount={false} />
      )}
    </div>
  );
};

export default UserAccountPage;
