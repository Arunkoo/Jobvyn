/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth_service_url, useAppData } from "@/context/AppContext";
import axios from "axios";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Lock, ArrowLeft, CheckCircle, Key } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ResetPages = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isAuth } = useAppData();

  if (isAuth) return redirect("/");

  const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${auth_service_url}/api/auth/reset/${token}`,
        { password },
      );
      toast.success(data.message);
      setPassword("");
      setConfirmPassword("");
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
            <Key className="w-8 h-8 text-linear-to-r from-blue-600 to-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new password for your account
          </p>
        </div>

        <Card className="p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mb-6" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter and confirm your new password below
                </p>
              </div>

              <form onSubmit={SubmitHandler} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pl-10 border-blue-200 focus:border-blue-500 dark:border-blue-800 dark:focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 border-blue-200 focus:border-blue-500 dark:border-blue-800 dark:focus:border-blue-600"
                      />
                    </div>
                    {password &&
                      confirmPassword &&
                      password !== confirmPassword && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Passwords don&apos;t match
                        </p>
                      )}
                    {password &&
                      confirmPassword &&
                      password === confirmPassword && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Passwords match
                        </p>
                      )}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 6 characters long
                  </p>
                  <Button
                    type="submit"
                    disabled={
                      btnLoading ||
                      !password ||
                      !confirmPassword ||
                      password !== confirmPassword
                    }
                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {btnLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Resetting Password...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>
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
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Password Reset Successful
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your password has been reset successfully. You can now log in
                with your new password.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block">
                  <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Go to Login
                  </Button>
                </Link>
                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                  >
                    Return to Home
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

export default ResetPages;
