/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { job_service_url, useAppData } from "@/context/AppContext";
import { Company, jobs } from "@/type";
import axios from "axios";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  CheckCircleIcon,
  Clock2,
  DollarSign,
  Eye,
  Globe,
  MapPin,
  Pencil,
  PlusIcon,
  User,
  XCircle,
  Building2,
  Calendar,
  Users,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CompanyPage = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { user } = useAppData();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<jobs | null>(null);

  const addModalRef = useRef<HTMLButtonElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [openings, setOpenings] = useState("");
  const [job_type, setJob_Type] = useState("");
  const [work_location, setWork_Location] = useState("");
  const [is_active, setIs_Active] = useState(true);

  const clearInput = () => {
    setTitle("");
    setDescription("");
    setRole("");
    setSalary("");
    setLocation("");
    setOpenings("");
    setJob_Type("");
    setWork_Location("");
    setIs_Active(true);
  };

  const addJobHandler = async () => {
    setBtnLoading(true);
    try {
      const jobData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        company_id: id,
      };

      const { data } = await axios.post(
        `${job_service_url}/api/job/new`,
        jobData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success(data.message);
      fetchCompany();
      clearInput();
      addModalRef.current?.click();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  // const deleteJobHandler = async (jobId: number) => {
  //   if (confirm("Are you sure you want to delete this job?")) {
  //     setBtnLoading(true);
  //     try {
  //       await axios.delete(`${job_service_url}/api/job/${jobId}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       toast.success("Job has been deleted");
  //       fetchCompany();
  //     } catch (error: any) {
  //       toast.error(error.response.data.message);
  //     } finally {
  //       setBtnLoading(false);
  //     }
  //   }
  // };

  const handleOpenUpdateModal = (job: jobs) => {
    setSelectedJob(job);
    setTitle(job.title);
    setDescription(job.description);
    setRole(job.role);
    setSalary(String(job.salary || ""));
    setLocation(job.location || "");
    setOpenings(String(job.openings));
    setJob_Type(job.job_type);
    setWork_Location(job.work_location);
    setIs_Active(job.is_active);
    setIsUpdatedModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdatedModalOpen(false);
    setSelectedJob(null);
    clearInput();
  };

  const updateJobHandler = async () => {
    if (!selectedJob) return;
    setBtnLoading(true);
    try {
      const updateJobData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        is_active,
      };
      const { data } = await axios.put(
        `${job_service_url}/api/job/update/${selectedJob.job_id}`,
        updateJobData,
        { headers: { Authorization: `Bearer: ${token}` } },
      );

      toast.success(data.message);
      fetchCompany();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  async function fetchCompany() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${job_service_url}/api/job/company/${id}`,
      );

      setCompany(data.companyData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;

  const isRecruiterOwner =
    user && company && user.user_id === company.recruiter_id;

  const getStatusColor = (active: boolean) => {
    return active
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  };

  const getWorkLocationColor = (location: string) => {
    if (location === "Remote")
      return "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    if (location === "Hybrid")
      return "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
    return "border-gray-200 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  };

  const getJobTypeColor = (type: string) => {
    if (type === "Full-Time") return "text-blue-600 dark:text-blue-400";
    if (type === "Part-Time") return "text-purple-600 dark:text-purple-400";
    if (type === "Contract") return "text-blue-700 dark:text-blue-300";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:to-gray-950">
      {company && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Company Header */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <div className="relative w-24 h-24 rounded-xl border-2 border-blue-100 dark:border-blue-900/30 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10" />
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain p-4 relative z-10"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {company.name}
                  </h1>
                  <div className="h-2 w-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl leading-relaxed">
                  {company.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={company.website} target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </Button>
                  </Link>
                  {isRecruiterOwner && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm"
                        >
                          <PlusIcon className="w-4 h-4" />
                          Post New Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-gray-900 dark:text-white">
                            Post New Job
                            <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700 dark:text-gray-300">
                              Job Title
                            </Label>
                            <Input
                              placeholder="e.g. Senior Frontend Developer"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700 dark:text-gray-300">
                              Description
                            </Label>
                            <Input
                              placeholder="Job description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-gray-700 dark:text-gray-300">
                                Role
                              </Label>
                              <Input
                                placeholder="e.g. Engineering"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-700 dark:text-gray-300">
                                Salary
                              </Label>
                              <Input
                                type="number"
                                placeholder="Annual salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-gray-700 dark:text-gray-300">
                                Location
                              </Label>
                              <Input
                                placeholder="e.g. San Francisco"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-700 dark:text-gray-300">
                                Openings
                              </Label>
                              <Input
                                type="number"
                                placeholder="Number of positions"
                                value={openings}
                                onChange={(e) => setOpenings(e.target.value)}
                                className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-gray-700 dark:text-gray-300">
                                Job Type
                              </Label>
                              <Select
                                value={job_type}
                                onValueChange={setJob_Type}
                              >
                                <SelectTrigger className="border-blue-200 focus:border-blue-500 dark:border-blue-800">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value="Full-Time"
                                    className="text-blue-600 dark:text-blue-400"
                                  >
                                    Full-Time
                                  </SelectItem>
                                  <SelectItem
                                    value="Part-Time"
                                    className="text-purple-600 dark:text-purple-400"
                                  >
                                    Part-Time
                                  </SelectItem>
                                  <SelectItem
                                    value="Contract"
                                    className="text-blue-700 dark:text-blue-300"
                                  >
                                    Contract
                                  </SelectItem>
                                  <SelectItem
                                    value="Internship"
                                    className="text-purple-700 dark:text-purple-300"
                                  >
                                    Internship
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-700 dark:text-gray-300">
                                Work Location
                              </Label>
                              <Select
                                value={work_location}
                                onValueChange={setWork_Location}
                              >
                                <SelectTrigger className="border-blue-200 focus:border-blue-500 dark:border-blue-800">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value="On-site"
                                    className="text-gray-600 dark:text-gray-400"
                                  >
                                    On-site
                                  </SelectItem>
                                  <SelectItem
                                    value="Remote"
                                    className="text-blue-600 dark:text-blue-400"
                                  >
                                    Remote
                                  </SelectItem>
                                  <SelectItem
                                    value="Hybrid"
                                    className="text-purple-600 dark:text-purple-400"
                                  >
                                    Hybrid
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" ref={addModalRef}>
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            onClick={addJobHandler}
                            disabled={btnLoading}
                            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            {btnLoading ? "Posting..." : "Post Job"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {company.jobs?.length || 0} positions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {company.jobs?.reduce(
                    (sum, job) => sum + (job.openings || 0),
                    0,
                  ) || 0}{" "}
                  total openings
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-linear-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-blue-900/30" />

          {/* Jobs Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Open Positions
                </h2>
                <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>
              {isRecruiterOwner && company.jobs && company.jobs.length > 0 && (
                <div className="text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {company.jobs.filter((j) => j.is_active).length} active
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {company.jobs.filter((j) => !j.is_active).length} inactive
                  </span>
                </div>
              )}
            </div>

            {company.jobs && company.jobs.length > 0 ? (
              <div className="space-y-5">
                {company.jobs.map((job) => (
                  <Card
                    key={job.job_id}
                    className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800/50"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {job.title}
                          </h3>
                          <Badge className={getStatusColor(job.is_active)}>
                            {job.is_active ? (
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {job.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getWorkLocationColor(job.work_location)}
                          >
                            {job.work_location}
                          </Badge>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-5 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Building2 className="w-4 h-4 text-blue-500" />
                            <span>{job.role}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">
                              {job.salary
                                ? `₹${job.salary.toLocaleString()}`
                                : "Salary not disclosed"}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-2 ${getJobTypeColor(job.job_type)}`}
                          >
                            <Clock2 className="w-4 h-4" />
                            <span className="font-medium">{job.job_type}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-5 text-sm">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                            <User className="w-4 h-4" />
                            <span>
                              {job.openings} opening
                              {job.openings > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Posted{" "}
                              {new Date(job.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-fit">
                        <Link href={`/jobs/${job.job_id}`}>
                          <Button className="w-full gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm">
                            <Eye className="w-4 h-4" />
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        {isRecruiterOwner && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => handleOpenUpdateModal(job)}
                              className="flex-1 gap-2 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            >
                              <Pencil className="w-4 h-4" />
                              Edit
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center border-2 border-dashed border-blue-200 dark:border-blue-900/30 bg-linear-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
                <div className="mx-auto w-16 h-16 rounded-full bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-linear-to-r from-blue-600 to-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No positions yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  This company hasn&apos;t posted any job openings yet.
                </p>
                {isRecruiterOwner && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Post your first job
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                )}
              </Card>
            )}
          </div>

          {/* Update Job Modal */}
          <Dialog
            open={isUpdatedModalOpen}
            onOpenChange={setIsUpdatedModalOpen}
          >
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">
                  Update Job
                  <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">
                    Job Title
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">
                    Description
                  </Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Role
                    </Label>
                    <Input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Salary
                    </Label>
                    <Input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Location
                    </Label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Openings
                    </Label>
                    <Input
                      type="number"
                      value={openings}
                      onChange={(e) => setOpenings(e.target.value)}
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Job Type
                    </Label>
                    <Select value={job_type} onValueChange={setJob_Type}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-500 dark:border-blue-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="Full-Time"
                          className="text-blue-600 dark:text-blue-400"
                        >
                          Full-Time
                        </SelectItem>
                        <SelectItem
                          value="Part-Time"
                          className="text-purple-600 dark:text-purple-400"
                        >
                          Part-Time
                        </SelectItem>
                        <SelectItem
                          value="Contract"
                          className="text-blue-700 dark:text-blue-300"
                        >
                          Contract
                        </SelectItem>
                        <SelectItem
                          value="Internship"
                          className="text-purple-700 dark:text-purple-300"
                        >
                          Internship
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Work Location
                    </Label>
                    <Select
                      value={work_location}
                      onValueChange={setWork_Location}
                    >
                      <SelectTrigger className="border-blue-200 focus:border-blue-500 dark:border-blue-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="On-site"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          On-site
                        </SelectItem>
                        <SelectItem
                          value="Remote"
                          className="text-blue-600 dark:text-blue-400"
                        >
                          Remote
                        </SelectItem>
                        <SelectItem
                          value="Hybrid"
                          className="text-purple-600 dark:text-purple-400"
                        >
                          Hybrid
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">
                    Status
                  </Label>
                  <Select
                    value={is_active ? "true" : "false"}
                    onValueChange={(value) => setIs_Active(value === "true")}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-500 dark:border-blue-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="true"
                        className="text-green-600 dark:text-green-400"
                      >
                        Active
                      </SelectItem>
                      <SelectItem
                        value="false"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseUpdateModal}>
                  Cancel
                </Button>
                <Button
                  onClick={updateJobHandler}
                  disabled={btnLoading}
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {btnLoading ? "Updating..." : "Update Job"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
