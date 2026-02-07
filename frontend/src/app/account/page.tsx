"use client";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";
import React from "react";
import Info from "./component/info";
import Skills from "./component/skills";
import Companies from "./component/companies";
import { redirect } from "next/navigation";
import AppliedJobs from "./component/appliedJobs";

const Accountpage = () => {
  const { isAuth, user, loading, application } = useAppData();
  if (loading) return <Loading />;
  if (!isAuth) redirect("/");
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            My Account
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your profile and personal information
          </p>
        </div>

        {user && (
          <div className="space-y-6 md:space-y-8">
            <Info user={user} isYourAccount={true} />
            {user.role === "jobseeker" && (
              <Skills user={user} isYourAccount={true} />
            )}
            {user.role === "jobseeker" && (
              <AppliedJobs applications={application} />
            )}
            {user.role === "recruiter" && <Companies />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accountpage;
