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
import { Globe } from "lucide-react";
import toast from "react-hot-toast";

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
          headers: { Authorization: `Bearer: ${token}` },
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
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
