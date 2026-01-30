"use client";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";
import React from "react";
import Info from "./component/info";
import Skills from "./component/skills";

const Accountpage = () => {
  const { isAuth, user, loading } = useAppData();
  if (loading) return <Loading />;

  return (
    <>
      {user && (
        <div className="w-[90%] md:w-[60%] m-auto">
          <Info user={user} isYourAccount={true} />
          {user.role === "jobseeker" && (
            <Skills user={user} isYourAccount={true} />
          )}
          {user.role === "recruiter" && (
            <Skills user={user} isYourAccount={true} />
          )}
        </div>
      )}
    </>
  );
};

export default Accountpage;
