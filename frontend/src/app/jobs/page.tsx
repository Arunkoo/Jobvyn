/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { jobs } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { job_service_url } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Briefcase, FilterIcon } from "lucide-react";
import Loading from "@/components/loading";
import JobsCard from "@/components/jobsCard";
const location: string[] = [
  "Delhi",
  "Mumbai",
  "Banglore",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Chennai",
  "Remote",
];
const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<jobs[]>([]);
  const [title, setTitle] = useState("");
  const [Location, setLocation] = useState("");
  const token = Cookies.get("token");
  const ref = useRef<HTMLButtonElement>(null);
  async function fetchJobs() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${job_service_url}/api/job/all?title=${title}&location=${Location}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(data);
      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Explore <span className="text-red-500">opportunities</span>
              </h1>
              <p className="text-base opacity-70 ">{jobs.length} jobs</p>
            </div>
            <Button className="gap-2 h-11">
              <FilterIcon size={18} />
              Filters
            </Button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              {jobs && jobs.length > 0 ? (
                <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {jobs.map((j) => (
                    <JobsCard key={j.job_id} job={j} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray dark:bg-gray-800 mb-4">
                    <Briefcase size={40} className=" opacity-40" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
