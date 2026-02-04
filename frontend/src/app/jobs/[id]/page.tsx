/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { job_service_url, useAppData } from "@/context/AppContext";
import { Application, jobs } from "@/type";
import axios from "axios";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  DollarSign,
  MapPin,
  User2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";
const Jobpage = () => {
  const { id } = useParams();
  const { user, isAuth, applyJob, application, btnLoading } = useAppData();
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [job, setJob] = useState<jobs | null>(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const [filterStatus, setFilterStatus] = useState("All");
  const [jobApplication, setJobApplication] = useState<Application[] | null>(
    null,
  );
  const [value, setValue] = useState("");
  // handle apply job..
  const handleApply = async () => {
    if (isApplied || isApplying) return;

    setIsApplying(true);
    try {
      await applyJob(Number(id));
      setIsApplied(true);
    } catch (error) {
      console.error("Application error:", error);
    } finally {
      setIsApplying(false);
    }
  };
  const formatSalary = (salary: number | null | undefined) => {
    if (!salary) return "Competitive";
    if (salary >= 1000000) {
      return `₹${(salary / 1000000).toFixed(1)}L PA`;
    }
    if (salary >= 1000) {
      return `₹${(salary / 1000).toFixed(0)}K PA`;
    }
    return `₹${salary} PA`;
  };
  //
  async function fetchJobApplications() {
    try {
      const { data } = await axios.get(
        `${job_service_url}/api/job/applications/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setJobApplication(data);
    } catch (error) {
      console.log(error);
    }
  }
  // fetch single job...
  async function fetchSingleJob() {
    try {
      const { data } = await axios.get(`${job_service_url}/api/job/${id}`);
      setJob(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const filteredApplication =
    filterStatus === "All"
      ? jobApplication
      : jobApplication?.filter((app) => app.status === filterStatus);
  const updateApplicationHandler = async (id: number) => {
    if (value === "") return toast.error("Please give valid value");
    try {
      const { data } = await axios.put(
        `${job_service_url}/api/job/application/update/${id}`,
        { status: value },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchSingleJob();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (application && id && Array.isArray(application)) {
      const hasApplied = application.some(
        (item: any) => item.job_id.toString() === id,
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsApplied(hasApplied);
    }
    fetchSingleJob();
  }, [application, id]);
  useEffect(() => {
    if (user && job && user.user_id === job.posted_by_recruiter_id) {
      fetchJobApplications();
    }
  }, [user, job]);
  return (
    <div className="min-h-screen bg-secondary/30">
      {loading ? (
        <Loading />
      ) : (
        <>
          {job && (
            <div className="max-w-5xl mx-auto px-4 py-8">
              <Button
                variant={"ghost"}
                className="mb-6 gap-2"
                onClick={() => router.back()}
              >
                <ArrowRight size={18} />
                Back to jobs
              </Button>

              <Card className="overflow-hidden shadow-lg border-2 mb-6">
                <div className="bg-blue-600 p-8 border-b">
                  <div className="flex items-start justify-between gap-4 flex-warp">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${job.is_active ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "text-red-100 bg-red-100 dark:bg-red-900/30"}`}
                        >
                          {job.is_active ? "Open" : "Closed"}
                        </span>
                      </div>
                      <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
                        {job.title}
                      </h1>
                      <div className="flex items-center gap-2 text-base opacity-70 mb-2 text-white">
                        <Building2 size={18} />
                        <span>Company Name</span>
                      </div>
                    </div>
                    {user && user.role === "jobseeker" && (
                      <div className="shrink-0">
                        {isApplied ? (
                          <>
                            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-100 dark:bg-gray-900/30 text-green-600 font-medium">
                              <CheckCircle size={20} />
                              Already Applied
                            </div>
                          </>
                        ) : (
                          <>
                            {job.is_active && (
                              <Button
                                onClick={() => handleApply()}
                                disabled={btnLoading}
                                className="gap-2 h-12 px-8"
                              >
                                <Briefcase size={18} />
                                {isApplying && btnLoading
                                  ? "Applying..."
                                  : "Easy Apply"}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3 p-4 rounded-lg border bg-background">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs opacity-70 font-medium mb-1">
                          Location
                        </p>
                        <p className="font-semibold ">{job.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg border bg-background">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <DollarSign size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs opacity-70 font-medium mb-1">
                          Salary
                        </p>
                        <p className="font-semibold ">
                          {formatSalary(job.salary)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg border bg-background">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <User2 size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs opacity-70 font-medium mb-1">
                          Openings
                        </p>
                        <p className="font-semibold ">
                          {job.openings}positions
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* job descripton */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex item-center gap-2">
                      <Briefcase size={24} className="text-blue-600" />
                      Job Description
                    </h2>
                    <div className="p-6 rounded-lg bg-secondary border">
                      <p className="text-base leading-relaxed whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
      {user && job && user.user_id === job.posted_by_recruiter_id && (
        <div className="w-[90%] md:w-2/3 container mx-auto mt-8 mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-2xl font-bold">All Applications</h2>
            <div className="flex items-center gap-2">
              <label htmlFor="filter-status" className="text-sm font-medium">
                Filter:
              </label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded-md bg-background"
              >
                <option value="All">All status</option>
                <option value="Submitted">Submitted</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
            </div>
          </div>
          {jobApplication && jobApplication.length > 0 ? (
            <>
              <div className="space-y-4">
                {filteredApplication?.map((e) => (
                  <div
                    className="p-4 rounded-lg border-2 bg-background"
                    key={e.applicant_id}
                  >
                    <div className="flex item-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${e.status === "Hired" ? "bg-green-100 dark:bg-green-900/30 text-green-600" : e.status === "Rejected" ? "bg-red-100 dark:bg-red-900/30 text-red-600" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"}`}
                      >
                        {e.status}
                      </span>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <Link
                        target="_blank"
                        href={e.resume}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View Resume
                      </Link>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <Link
                        target="_blank"
                        href={`/account/${e.applicant_id}`}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View Profile
                      </Link>
                    </div>
                    {/* update status of application.... */}
                    <div className="flex gap-2 pt-3 border-t">
                      <select
                        title="changeStatus"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="flex-1 p-2 border-2 border-gray-300 rounded-md bg-background"
                      >
                        <option value="All">Update status</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                      <Button
                        disabled={btnLoading}
                        onClick={() =>
                          updateApplicationHandler(e.application_id)
                        }
                      >
                        Update status
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {filteredApplication?.length === 0 && (
                <p className="text-center py-8 opacity-70">
                  No application with status {filterStatus}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-center py-8 opacity-70">No application yet</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobpage;
