/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth_service_url, useAppData } from "@/context/AppContext";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ForgotPages = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isAuth } = useAppData();

  if (isAuth) return redirect("/");

  const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${auth_service_url}/api/auth/forgotPassword`,
        { email },
      );
      toast.success(data.message);
      setEmail("");
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-linear-to-r from-blue-600 to-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to reset your password
          </p>
        </div>

        <Card className="p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mb-6" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We&apos;ll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={SubmitHandler} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 border-blue-200 focus:border-blue-500 dark:border-blue-800 dark:focus:border-blue-600"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={btnLoading}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {btnLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <Separator className="my-6 bg-linear-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-blue-900/30" />

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We&apos;ve sent a password reset link to your email address.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Didn&apos;t receive the email? Check your spam folder or
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                >
                  Try Again
                </Button>
                <Link href="/login" className="block">
                  <Button
                    variant="ghost"
                    className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPages;
