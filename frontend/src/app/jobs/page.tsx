/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { jobs } from "@/type";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { job_service_url } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Search, X, Sparkles, TrendingUp } from "lucide-react";
import Loading from "@/components/loading";
import JobsCard from "@/components/jobsCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const locations = [
  "Remote",
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Chennai",
];

const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<jobs[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const token = Cookies.get("token");

  const hasActiveFilters = title || location;

  const clearFilters = () => {
    setTitle("");
    setLocation("");
    setActiveTab("all");
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${job_service_url}/api/job/all?title=${title}&location=${location}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [title, location]);

  const filteredJobs =
    activeTab === "remote"
      ? jobs.filter((job) => job.location?.toLowerCase().includes("remote"))
      : jobs;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Section */}
        <div className="sticky top-4 z-10 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border shadow-sm p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by Job Title or role"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="pl-10 h-12 border-gray-300 dark:border-gray-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="hidden sm:block"
                >
                  <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger value="all" className="rounded-md px-4">
                      All Jobs
                    </TabsTrigger>
                    <TabsTrigger value="remote" className="rounded-md px-4">
                      Remote
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 h-12 px-4 rounded-xl border-gray-300 dark:border-gray-700"
                    >
                      <Filter className="h-4 w-4" />
                      Location
                      {location && (
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        Filter by Location
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <button
                          onClick={() => setLocation("")}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                            !location
                              ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300"
                              : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                          }`}
                        >
                          All Locations
                        </button>
                        {locations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => setLocation(loc)}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                              location === loc
                                ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300"
                                : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setLocation("");
                          setIsFilterOpen(false);
                        }}
                        className="flex-1 rounded-xl"
                      >
                        Clear
                      </Button>
                      <Button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-xl"
                      >
                        Apply
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Active filters:
                  </span>
                  {title && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                      <Search className="h-3 w-3" />
                      {title}
                      <button
                        title="setTitle"
                        onClick={() => setTitle("")}
                        className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {location && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                      <MapPin className="h-3 w-3" />
                      {location}
                      <button
                        title="setLoc"
                        onClick={() => setLocation("")}
                        className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>{filteredJobs.length} matching positions</span>
              </div>
              {activeTab === "remote" && (
                <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">
                  Remote Only
                </div>
              )}
            </div>
            <button
              onClick={clearFilters}
              className={`text-sm transition-colors ${
                hasActiveFilters
                  ? "text-purple-600 hover:text-purple-700"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loading />
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading opportunities...
              </p>
            </div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobsCard key={job.job_id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No matches found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find more
              opportunities
            </p>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="gap-2 rounded-xl"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
