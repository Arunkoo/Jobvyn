/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { job_service_url, useAppData } from "@/context/AppContext";
import { Application, jobs } from "@/type";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  DollarSign,
  Users,
  FileText,
  UserCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Jobpage = () => {
  const { id } = useParams();
  const { user, applyJob, application, btnLoading } = useAppData();
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
  const [statusValue, setStatusValue] = useState("");

  // Handle apply job
  const handleApply = async () => {
    if (isApplied || isApplying || !id) return;

    setIsApplying(true);
    try {
      await applyJob(Number(id));
      setIsApplied(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Application error:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsApplying(false);
    }
  };

  const formatSalary = (salary: number | null | undefined) => {
    if (!salary) return "Competitive";
    if (salary >= 1000000) {
      return `₹${(salary / 1000000).toFixed(1)}L/yr`;
    }
    return `₹${(salary / 1000).toFixed(0)}k/yr`;
  };

  // Fetch job applications
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

  // Fetch single job
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

  const updateApplicationHandler = async (applicationId: number) => {
    if (statusValue === "") return toast.error("Please select a status");
    try {
      const { data } = await axios.put(
        `${job_service_url}/api/job/application/update/${applicationId}`,
        { status: statusValue },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchJobApplications();
      toast.success(data.message);
      setStatusValue("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    if (application && id && Array.isArray(application)) {
      const hasApplied = application.some(
        (item: any) => item.job_id.toString() === id,
      );
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {job && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Back button */}
              <Button
                variant="ghost"
                className="mb-6 gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                onClick={() => router.back()}
              >
                <ArrowLeft size={18} />
                Back to jobs
              </Button>

              {/* Job Header Card */}
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 mb-8">
                <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                            job.is_active
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {job.is_active
                            ? "Active • Hiring"
                            : "Position Closed"}
                        </Badge>
                        {job.location?.toLowerCase().includes("remote") && (
                          <Badge className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium">
                            Remote
                          </Badge>
                        )}
                      </div>

                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {job.title}
                      </h1>

                      <div className="flex items-center gap-3 text-white/90">
                        <div className="flex items-center gap-2">
                          <Building2 size={20} />
                          <span className="font-medium">
                            {job.company_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={20} />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Apply Button Section */}
                    {user?.role === "jobseeker" && (
                      <div className="shrink-0">
                        {isApplied ? (
                          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                            <CheckCircle2 size={20} />
                            <span className="font-medium">Applied</span>
                          </div>
                        ) : job.is_active ? (
                          <Button
                            onClick={handleApply}
                            disabled={btnLoading || isApplying}
                            className="gap-3 h-12 px-8 rounded-xl bg-white text-purple-600 hover:bg-white/90 font-semibold"
                          >
                            <Briefcase size={20} />
                            {isApplying || btnLoading
                              ? "Applying..."
                              : "Apply Now"}
                          </Button>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Stats */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                        <MapPin
                          size={20}
                          className="text-purple-600 dark:text-purple-400"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Location
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {job.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <DollarSign
                          size={20}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Salary
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatSalary(job.salary)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <Users
                          size={20}
                          className="text-green-600 dark:text-green-400"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Openings
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {job.openings} positions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-linear-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
                        <FileText
                          size={20}
                          className="text-purple-600 dark:text-purple-400"
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Job Description
                      </h2>
                    </div>

                    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {job.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Applications Section (for recruiters only) */}
              {user && job && user.user_id === job.posted_by_recruiter_id && (
                <div className="mt-12">
                  <Card className="p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          Applications
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {jobApplication?.length || 0} total applications
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Select
                          value={filterStatus}
                          onValueChange={setFilterStatus}
                        >
                          <SelectTrigger className="w-45">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All status</SelectItem>
                            <SelectItem value="Submitted">Submitted</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                            <SelectItem value="Hired">Hired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {jobApplication && jobApplication.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {filteredApplication?.map((application) => (
                            <Card
                              key={application.applicant_id}
                              className="p-5 border border-gray-200 dark:border-gray-800"
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <Badge
                                      className={`px-3 py-1 rounded-full text-sm ${
                                        application.status === "Hired"
                                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                          : application.status === "Rejected"
                                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                      }`}
                                    >
                                      {application.status}
                                    </Badge>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      Applied on{" "}
                                      {new Date(
                                        application.applied_at,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-4 flex-wrap">
                                    <Link
                                      target="_blank"
                                      href={application.resume}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium"
                                    >
                                      <FileText size={16} />
                                      View Resume
                                    </Link>

                                    <Link
                                      target="_blank"
                                      href={`/account/${application.applicant_id}`}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium"
                                    >
                                      <UserCircle size={16} />
                                      View Profile
                                    </Link>
                                  </div>
                                </div>

                                {/* Status Update Section */}
                                <div className="flex gap-3">
                                  <Select
                                    value={statusValue}
                                    onValueChange={setStatusValue}
                                  >
                                    <SelectTrigger className="w-35">
                                      <SelectValue placeholder="Update status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Submitted">
                                        Submitted
                                      </SelectItem>
                                      <SelectItem value="Rejected">
                                        Rejected
                                      </SelectItem>
                                      <SelectItem value="Hired">
                                        Hired
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <Button
                                    onClick={() =>
                                      updateApplicationHandler(
                                        application.application_id,
                                      )
                                    }
                                    disabled={!statusValue}
                                    className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                  >
                                    Update
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>

                        {filteredApplication?.length === 0 && (
                          <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                              <Users size={24} className="text-gray-400" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                              No applications with status &quot;{filterStatus}
                              &quot;
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                          <Users size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No applications yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Candidates will appear here when they apply
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobpage;
