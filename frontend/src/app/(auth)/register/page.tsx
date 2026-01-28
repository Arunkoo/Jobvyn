/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { auth_service_url, useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Loader,
  Lock,
  Mail,
  Eye,
  EyeOff,
  TrendingUp,
  Briefcase,
  User,
  Phone,
  FileText,
  UserCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

const RegisterPage = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showJobseekerFields, setShowJobseekerFields] = useState(false);

  const { isAuth, setUser, loading, setIsAuth } = useAppData();
  if (loading) {
    return <Loading />;
  }
  if (isAuth) return redirect("/");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    if (role === "jobseeker") {
      formData.append("bio", bio);
      if (resume) {
        formData.append("resume", resume);
      }
    }
    try {
      const { data } = await axios.post(
        `${auth_service_url}/api/auth/register`,
        formData,
      );

      toast.success(data.message);

      Cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        path: "/",
      });
      setUser(data.registeredUser);
      setIsAuth(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white dark:bg-slate-950">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950/20 -z-10" />
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20 dark:bg-blue-900/10 dark:opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 dark:bg-purple-900/10 dark:opacity-20" />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="p-2 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-lg">
              <TrendingUp size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Jobvyn
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
            Join thousands finding their perfect opportunities
          </p>
        </div>

        {/* Registration Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-slate-800 shadow-lg">
            <form onSubmit={submitHandler} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  I want to join as *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("jobseeker")}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      role === "jobseeker"
                        ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <User
                        className={`h-4 w-4 ${role === "jobseeker" ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-slate-500"}`}
                      />
                      <span
                        className={`text-xs font-medium ${role === "jobseeker" ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-slate-300"}`}
                      >
                        Job Seeker
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("recruiter")}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      role === "recruiter"
                        ? "border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Briefcase
                        className={`h-4 w-4 ${role === "recruiter" ? "text-purple-600 dark:text-purple-400" : "text-gray-400 dark:text-slate-500"}`}
                      />
                      <span
                        className={`text-xs font-medium ${role === "recruiter" ? "text-purple-700 dark:text-purple-300" : "text-gray-700 dark:text-slate-300"}`}
                      >
                        Recruiter
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {role && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-xs font-medium text-gray-700 dark:text-slate-300"
                      >
                        Full Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="pl-8 h-9 text-sm bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs font-medium text-gray-700 dark:text-slate-300"
                      >
                        Email *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-8 h-9 text-sm bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Password Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-xs font-medium text-gray-700 dark:text-slate-300"
                      >
                        Phone *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="+91 9876543210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          className="pl-8 h-9 text-sm bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-xs font-medium text-gray-700 dark:text-slate-300"
                      >
                        Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-8 pr-8 h-9 text-sm bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute cursor-pointer right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                        >
                          {showPassword ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Job Seeker Additional Fields - Collapsible */}
                  {role === "jobseeker" && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setShowJobseekerFields(!showJobseekerFields)
                        }
                        className=" cursor-pointer flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-2"
                      >
                        {showJobseekerFields ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                        <span>Additional details for job seekers</span>
                      </button>

                      {showJobseekerFields && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                          <div className="space-y-2">
                            <Label
                              htmlFor="bio"
                              className="text-xs font-medium text-gray-700 dark:text-slate-300"
                            >
                              Bio *
                            </Label>
                            <div className="relative">
                              <UserCircle className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 dark:text-slate-500" />
                              <textarea
                                id="bio"
                                placeholder="Brief about yourself..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                required
                                rows={2}
                                className="w-full pl-8 pr-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 resize-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="resume"
                              className="text-xs font-medium text-gray-700 dark:text-slate-300"
                            >
                              Resume (PDF) *
                            </Label>
                            <div className="relative">
                              <FileText className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
                              <Input
                                id="resume"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setResume(e.target.files[0]);
                                  }
                                }}
                                required
                                className="pl-8 py-1.5 text-sm bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 file:mr-2 file:py-0.5 file:px-2 file:border-0 file:text-xs file:bg-blue-50 file:text-blue-600 dark:file:bg-blue-900/30 dark:file:text-blue-400 file:rounded"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={btnLoading}
                    className="w-full h-10 cursor-pointer gap-2 group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 text-sm"
                  >
                    {btnLoading ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Login Link */}
              {role && (
                <div className="pt-3 text-center border-t border-gray-200 dark:border-slate-800 mt-4">
                  <p className="text-xs text-gray-600 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-slate-500">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
