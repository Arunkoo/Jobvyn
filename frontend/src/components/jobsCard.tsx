/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppData } from "@/context/AppContext";
import { jobs } from "@/type";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  IndianRupee,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: jobs;
}

const JobsCard: React.FC<JobCardProps> = ({ job }) => {
  const { user, applyJob, application } = useAppData();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Check if user has already applied
  useEffect(() => {
    if (application && job.job_id && Array.isArray(application)) {
      const hasApplied = application.some(
        (item: any) => item.job_id === job.job_id,
      );
      setIsApplied(hasApplied);
    }
  }, [application, job.job_id]);

  const handleApply = async () => {
    if (isApplied || isApplying) return;

    setIsApplying(true);
    try {
      await applyJob(job.job_id);
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

  const isPositionClosed = job.is_active === false;
  const isRemote = job.location?.toLowerCase().includes("remote");

  // Get short description (1-2 lines max)
  const getShortDescription = () => {
    if (!job.description) return "Exciting opportunity with a growing team.";

    const words = job.description.split(" ");
    if (words.length <= 15) return job.description;

    return words.slice(0, 15).join(" ") + "...";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border hover:border-gray-300 dark:hover:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 h-full flex flex-col">
      <CardContent className="p-6 grow">
        {/* Status Tag */}
        <div className="mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              isPositionClosed
                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
            }`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${isPositionClosed ? "bg-red-500" : "bg-green-500"}`}
            />
            {isPositionClosed ? "Position Closed" : "Active • Hiring"}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Building2 className="h-4 w-4" />
              <span className="truncate">{job.company_name}</span>
            </div>
          </div>

          <Link
            href={`/company/${job.company_id}`}
            className="shrink-0 hover:opacity-90 transition-opacity"
          >
            <div className="relative w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800">
              <Image
                src={job.company_logo || "/placeholder-company.png"}
                alt={job.company_name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          </Link>
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {getShortDescription()}
          </p>
        </div>

        {/* Job Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
              {isRemote && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                  Remote
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
            <IndianRupee className="h-4 w-4" />
            <span className="font-medium">{formatSalary(job.salary)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex gap-3 w-full">
          <Link href={`/jobs/${job.job_id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full gap-2 h-10 rounded-lg border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
            >
              View Details
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          {user?.role === "jobseeker" && !isPositionClosed && (
            <div className="flex-1">
              {isApplied ? (
                <div className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Applied</span>
                </div>
              ) : (
                <Button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full gap-2 h-10 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-sm"
                >
                  {isApplying ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Applying
                    </>
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5" />
                      Apply
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {!user && !isPositionClosed && (
            <Button className="flex-1 gap-2 h-10 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Briefcase className="h-3.5 w-3.5" />
              Apply
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobsCard;
