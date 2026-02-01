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
  BriefcaseBusiness,
  Building2,
  CheckCircleIcon,
  Clock2,
  DollarSign,
  Eye,
  FileText,
  Globe,
  Laptop,
  MapPin,
  Pencil,
  PlusIcon,
  User,
  XCircle,
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

const CompanyPage = () => {
  const { id } = useParams();

  const token = Cookies.get("token");
  const { user, isAuth } = useAppData();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<jobs | null>(null);

  const addModalRef = useRef<HTMLButtonElement>(null);
  const updateModalRef = useRef<HTMLButtonElement>(null);
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
  const deleteJobHandler = async (jobId: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setBtnLoading(true);
      try {
        await axios.delete(`${job_service_url}/api/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Job has been deleted");
        fetchCompany();
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setBtnLoading(false);
      }
    }
  };
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
  return (
    <div className="min-h-screen bg-secondary/30">
      {company && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Card className="overflow-hiddden shadow-lg border-2 mb-8">
            <div className="h-32  bg-blue-500 "></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16">
                <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-2xl border-4 border-background bg-background shadow-xl">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    priority
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 md:mb-4">
                  <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                  <p className="text-base leading-relaxed opacity-80 max-w-3xl ">
                    {company.description}
                  </p>
                </div>
                <Link
                  href={company.website}
                  target="_blank"
                  className="md:mb-4"
                >
                  <Button className="gap-4 cursor-pointer">
                    <Globe size={18} /> Visit Website
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
          <Dialog>
            {/* Jobs sections */}
            <Card className="shadow-lg border-2 overflow-hidden">
              <div className="bg-blue-600 border-b p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex item-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <BriefcaseBusiness size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Open Positions
                  </h2>
                  <p className="text-sm opacity-70 text-white">
                    {company.jobs?.length || 0} active jobs
                  </p>
                </div>
              </div>

              {isRecruiterOwner && (
                <>
                  <DialogTrigger asChild>
                    <Button className="gap-2 cursor-pointer">
                      <PlusIcon size={18} />
                      Post New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        Post a new job
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                          <Briefcase size={16} />
                          Job Title
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter job title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="description"
                          className="text-sm font-medium"
                        >
                          <FileText size={16} />
                          Description
                        </Label>
                        <Input
                          id="description"
                          type="text"
                          placeholder="Enter phone number"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-medium">
                          <Building2 size={16} />
                          Role/Department
                        </Label>
                        <Input
                          id="role"
                          type="text"
                          placeholder="Enter job role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary" className="text-sm font-medium">
                          <DollarSign size={16} />
                          Salary
                        </Label>
                        <Input
                          id="salary"
                          type="number"
                          placeholder="Enter job salary"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="openings"
                          className="text-sm font-medium"
                        >
                          <User size={16} />
                          Openings
                        </Label>
                        <Input
                          id="openings"
                          type="number"
                          placeholder="Enter job openings"
                          value={openings}
                          onChange={(e) => setOpenings(e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-sm font-medium"
                        >
                          <MapPin size={16} />
                          location
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="Enter job location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="grid md:grid-col-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="job_type"
                            className="text-sm font-medium flex items-center gap-1"
                          >
                            <Clock2 size={16} /> Job Type
                          </Label>
                          <Select value={job_type} onValueChange={setJob_Type}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="select job type"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-Time">
                                Full-Time
                              </SelectItem>
                              <SelectItem value="Part-Time">
                                Part-Time
                              </SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Internship">
                                Intern-ship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="work_location"
                            className="text-sm font-medium flex items-center gap-1"
                          >
                            <Laptop size={16} /> Work Location
                          </Label>
                          <Select
                            value={work_location}
                            onValueChange={setWork_Location}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="select work location"></SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="On-site">On-site</SelectItem>
                              <SelectItem value="Remote">Remote</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button ref={addModalRef} variant={"outline"}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={btnLoading}
                        onClick={addJobHandler}
                        className="gap-2"
                      >
                        {btnLoading ? "Posting job..." : "Post Job"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </>
              )}
              <div className="p-6">
                {company.jobs && company.jobs.length > 0 ? (
                  <div className="space-y-6">
                    {company.jobs.map((j) => (
                      <div
                        key={j.job_id}
                        className="p-5 rounded-lg border-2 hover:border-blue-500 transition-all bg-background"
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex item-center gap-3 mb-3 flex-wrap">
                              <h3 className="text-xl font-semibold">
                                {j.title}
                              </h3>
                              <span
                                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${j.is_active ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-gray-100 dark:bg-gray-800 text-gray-600"}`}
                              >
                                {j.is_active ? (
                                  <CheckCircleIcon size={14} />
                                ) : (
                                  <XCircle size={14} />
                                )}
                                {j.is_active ? "Active" : "InActive"}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                              <div className="flex items-center gap-2 opacity-70">
                                <Building2 size={16} />
                                <span>{j.role}</span>
                              </div>
                              <div className="flex items-center gap-2 opacity-70">
                                <DollarSign size={16} />
                                <span>
                                  {j.salary
                                    ? `₹${j.salary.toLocaleString()}`
                                    : "Not Disclosed"}
                                </span>
                              </div>
                              <div className="flex item-center gap-2 opacity-70">
                                <MapPin size={16} />
                                <span>{j.location}</span>
                              </div>
                              <div className="flex item-center gap-2 opacity-70">
                                <Laptop size={16} />
                                <span>
                                  {j.work_location} ({j.job_type})
                                </span>
                              </div>
                              <div className="flex item-center gap-2 opacity-70">
                                <User size={16} />
                                <span>{j.openings} openings</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/jobs/${j.job_id}`}>
                              <Button
                                variant={"outline"}
                                size={"sm"}
                                className="gap-2 cursor-pointer"
                              >
                                <Eye size={16} />
                                View
                              </Button>
                            </Link>
                            {isRecruiterOwner && (
                              <>
                                <Button
                                  onClick={() => handleOpenUpdateModal(j)}
                                  variant={"outline"}
                                  size={"sm"}
                                  className="gap-2 cursor-pointer"
                                >
                                  <Pencil size={16} />
                                  Update job
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <Briefcase size={32} className="opacity-40" />
                      </div>
                      <p className="text-base opacity-70 mb-2">
                        No jobs Posted yet
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </Dialog>

          <Dialog
            open={isUpdatedModalOpen}
            onOpenChange={setIsUpdatedModalOpen}
          >
            <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  Update a job
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    <Briefcase size={16} />
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter job title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    <FileText size={16} />
                    Description
                  </Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Enter phone number"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    <Building2 size={16} />
                    Role/Department
                  </Label>
                  <Input
                    id="role"
                    type="text"
                    placeholder="Enter job role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-sm font-medium">
                    <DollarSign size={16} />
                    Salary
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    placeholder="Enter job salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="openings" className="text-sm font-medium">
                    <User size={16} />
                    Openings
                  </Label>
                  <Input
                    id="openings"
                    type="number"
                    placeholder="Enter job openings"
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    <MapPin size={16} />
                    location
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter job location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="grid md:grid-col-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="job_type"
                      className="text-sm font-medium flex items-center gap-1"
                    >
                      <Clock2 size={16} /> Job Type
                    </Label>
                    <Select value={job_type} onValueChange={setJob_Type}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="select job type"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Intern-ship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="work_location"
                      className="text-sm font-medium flex items-center gap-1"
                    >
                      <Laptop size={16} /> Work Location
                    </Label>
                    <Select
                      value={work_location}
                      onValueChange={setWork_Location}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="select work location"></SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="On-site">On-site</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="update_is_active"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      {is_active ? (
                        <CheckCircleIcon size={16} className="text-green-600" />
                      ) : (
                        <XCircle size={16} className="text-gray-500" />
                      )}
                    </Label>
                    <Select
                      value={is_active ? "true" : "false"}
                      onValueChange={(value) => setIs_Active(value === "true")}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="select status"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">InActive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button ref={addModalRef} variant={"outline"}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={btnLoading}
                  onClick={updateJobHandler}
                  className="gap-2"
                >
                  {btnLoading ? "Updating job..." : "Update Job"}
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
