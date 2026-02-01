/* eslint-disable @typescript-eslint/no-explicit-any */
"use Client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { job_service_url, useAppData } from "@/context/AppContext";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import { Building2, Eye, Globe, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company } from "@/type";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Companies = () => {
  const addRef = useRef<HTMLButtonElement | null>(null);
  const openDialog = () => {
    addRef.current?.click();
  };
  const { loading } = useAppData();
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyLoading, setCompanyLoading] = useState(true);

  const clearData = () => {
    setName("");
    setDiscription("");
    setWebsite("");
    setLogo(null);
  };

  const token = Cookies.get("token");

  async function fetchCompanies() {
    try {
      const { data } = await axios.get(
        `${job_service_url}/api/job/company/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setCompanies(data.companies);
    } catch (error) {
      console.log(error);
    } finally {
      setCompanyLoading(false);
    }
  }

  async function addCompaniesHandler() {
    if (!name || !description || !website || !logo) {
      toast.error("Please Provide All Details");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("file", logo as File);

    try {
      setBtnLoading(true);
      const { data } = await axios.post(
        `${job_service_url}/api/job/company/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
      clearData();
      fetchCompanies();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  async function deleteCompaniesHandler(id: string) {
    if (confirm("Are you sure you want to delete this company")) {
      try {
        setBtnLoading(true);
        const { data } = await axios.delete(
          `${job_service_url}/api/job/company/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        toast.success(data.message);
        fetchCompanies();
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setBtnLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header - Compact */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              My Companies
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {companies.length}/4 companies registered
            </p>
          </div>
          {companies.length < 4 && (
            <Button
              onClick={openDialog}
              className="gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 h-9"
              size="sm"
            >
              <Plus size={16} />
              Add Company
            </Button>
          )}
        </div>
      </div>

      {/* Companies List - Compact Layout */}
      {companyLoading ? (
        <Loading />
      ) : (
        <>
          {companies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {companies.map((c) => (
                <Card
                  key={c.company_id}
                  className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      {/* Logo and Basic Info */}
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="h-12 w-12 relative rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800 shrink-0">
                          <Image
                            src={c.logo}
                            alt={c.name}
                            fill
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                              {c.name}
                            </h3>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                            {c.description}
                          </p>

                          <div className="flex items-center gap-2">
                            <Globe
                              size={12}
                              className="text-slate-400 shrink-0"
                            />
                            <Link
                              href={c.website}
                              target="_blank"
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate"
                              title={c.website}
                            >
                              {c.website.replace(/^https?:\/\//, "")}
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Actions - Compact */}
                      <div className="flex flex-col gap-1 shrink-0">
                        <Link href={`/company/${c.company_id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                          onClick={() => deleteCompaniesHandler(c.company_id)}
                          title="Delete Company"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State - Compact */
            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 mb-3">
                  <Building2
                    className="text-slate-400 dark:text-slate-600"
                    size={24}
                  />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  No Companies Yet
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-sm mx-auto">
                  Add your first company to start posting jobs
                </p>
                {companies.length < 4 && (
                  <Button
                    onClick={openDialog}
                    className="gap-2 cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="sm"
                  >
                    <Plus size={16} />
                    Add Company
                  </Button>
                )}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Add Company Dialog - Compact */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" ref={addRef}></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              Add New Company
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm">
                Company Name
              </Label>
              <Input
                id="name"
                placeholder="Enter company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm">
                Description
              </Label>
              <textarea
                id="description"
                placeholder="Brief description..."
                value={description}
                onChange={(e) => setDiscription(e.target.value)}
                className="w-full min-h-20 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-transparent text-sm resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="website" className="text-sm">
                Website URL
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://company.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="logo" className="text-sm">
                Company Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                className="h-9 cursor-pointer text-sm"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLogo(e.target.files?.[0] || null)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={clearData}
              className="h-9 text-sm"
              size="sm"
            >
              Clear
            </Button>
            <Button
              disabled={btnLoading}
              onClick={addCompaniesHandler}
              className="h-9 text-sm bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="sm"
            >
              {btnLoading ? "Saving..." : "Add Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Companies;
