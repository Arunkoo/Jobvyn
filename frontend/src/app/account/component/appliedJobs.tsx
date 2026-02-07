"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Application } from "@/type";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Eye,
  HelpCircle,
  IndianRupee,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface AppliedJobsProps {
  applications: Application[] | null;
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ applications }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "hired":
        return {
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
          bg: "bg-green-50 dark:bg-green-900/20",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600 dark:text-red-400",
          bg: "bg-red-50 dark:bg-red-900/20",
        };
      case "submitted":
        return {
          icon: Clock,
          color: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-50 dark:bg-amber-900/20",
        };
      default:
        return {
          icon: HelpCircle,
          color: "text-slate-600 dark:text-slate-400",
          bg: "bg-slate-50 dark:bg-slate-900/20",
        };
    }
  };

  const formatSalary = (salary: number | null | undefined) => {
    if (!salary) return "Competitive";
    if (salary >= 1000000) {
      return `₹${(salary / 1000000).toFixed(1)}L/yr`;
    }
    return `₹${(salary / 1000).toFixed(0)}k/yr`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
        {/* Compact Header */}
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Briefcase
                  size={18}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                  Applied Jobs
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {applications?.length || 0} applications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Applications List */}
        <div className="p-2 md:p-4">
          {applications && applications.length > 0 ? (
            <div className="space-y-2">
              {applications.map((a) => {
                const statusConfig = getStatusConfig(a.status);
                const StatusIcon = statusConfig?.icon;

                return (
                  <div
                    key={a.application_id}
                    className="p-3 md:p-4 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-3">
                      {/* Job Title & Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-sm md:text-base font-medium text-slate-900 dark:text-white truncate">
                            {a.job_title}
                          </h3>
                          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded text-xs">
                            <span className="text-slate-500 dark:text-slate-400">
                              ID:
                            </span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {a.application_id}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20">
                            <IndianRupee
                              size={12}
                              className="text-emerald-600 dark:text-emerald-400"
                            />
                            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                              {formatSalary(a.job_salary)}
                            </span>
                          </div>

                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-md ${statusConfig?.bg}`}
                          >
                            <StatusIcon
                              size={12}
                              className={statusConfig.color}
                            />
                            <span
                              className={`text-xs font-medium ${statusConfig.color}`}
                            >
                              {a.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Link
                            href={`/jobs/${a.job_id}`}
                            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <Eye size={14} />
                            <span className="hidden sm:inline">View</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Compact Empty State
            <div className="py-8 text-center">
              <div className="max-w-xs mx-auto">
                <div className="h-12 w-12 mx-auto rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                  <Briefcase
                    size={20}
                    className="text-slate-400 dark:text-slate-500"
                  />
                </div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                  No applications yet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Start exploring opportunities
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppliedJobs;
