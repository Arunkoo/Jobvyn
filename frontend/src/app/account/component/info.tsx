/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import {
  Briefcase,
  CameraIcon,
  Edit,
  FileText,
  Mail,
  Notebook,
  NotepadText,
  Phone,
} from "lucide-react";

import Link from "next/link";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

const Info: React.FC<AccountProps> = ({ isYourAccount, user }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const { updateProfilePic, updateResume, btnLoading, updateUser } =
    useAppData();
  const handleClick = () => {
    inputRef.current?.click();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      updateProfilePic(formData);
    }
  };
  const handleEditClick = () => {
    editRef.current?.click();
    setName(user?.name || "");
    setPhoneNumber(user?.phone_number || "");
    setBio(user?.bio || "");
  };

  const updateProfileHandler = () => {
    updateUser(name, phoneNumber, bio);
  };
  const handleResumeClick = () => {
    resumeRef.current?.click();
  };
  const changeResumeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      updateResume(formData);
    }
  };
  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Profile header */}
      <div className="relative h-32 bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-950/30 dark:to-purple-900/30">
        <div className="absolute -bottom-10 left-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-white dark:bg-slate-800">
              <img
                src={
                  user?.profile_pic
                    ? (user?.profile_pic as string)
                    : "/AvatarForAccountsPage.png"
                }
                alt={user?.name ? user.name : "Profile Picture"}
                className="w-full h-full object-cover"
              />
            </div>

            {isYourAccount && (
              <>
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  onClick={handleClick}
                  className="cursor-pointer absolute bottom-0 right-0 rounded-full h-7 w-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow"
                >
                  <CameraIcon
                    size={14}
                    className="text-slate-600 dark:text-slate-400"
                  />
                </Button>
                <input
                  title="file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={inputRef}
                  onChange={changeHandler}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-12 pb-6 px-6 space-y-6">
        {/* Name and edit */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {user?.name}
              </h1>
              {isYourAccount && (
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="h-7 w-7 p-0 cursor-pointer text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  onClick={handleEditClick}
                >
                  <Edit size={14} />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Briefcase size={14} />
              <span className="capitalize">{user?.role}</span>
            </div>
          </div>
        </div>

        {/* Bio section */}
        {user?.role === "jobseeker" && user?.bio && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <FileText size={14} />
              About
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {user.bio}
            </p>
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Mail size={14} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="h-8 w-8 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Phone
                  size={14}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                  {user?.phone_number || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resume section */}
        {user?.role === "jobseeker" && user.resume && isYourAccount && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Notebook size={14} />
              Resume
            </h3>
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <NotepadText
                    size={14}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Resume Document
                  </p>
                  <Link
                    href={user.resume}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                  >
                    View PDF
                  </Link>
                </div>
              </div>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={handleResumeClick}
                className="text-xs h-8 px-3 cursor-pointer"
              >
                Update
              </Button>
            </div>
            <input
              title="file"
              type="file"
              ref={resumeRef}
              className="hidden"
              accept="application/pdf"
              onChange={changeResumeHandler}
            />
          </div>
        )}
      </div>

      {/* Edit Profile Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={editRef} variant={"outline"} className="hidden">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            {user?.role === "jobseeker" && isYourAccount && (
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  placeholder="Tell about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full min-h-24 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent text-sm resize-none"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              disabled={btnLoading}
              onClick={updateProfileHandler}
              className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-700"
            >
              {btnLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Info;
