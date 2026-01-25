"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  BriefcaseBusinessIcon,
  LucideHome,
  User,
  LogIn,
  LogOut,
  InfoIcon,
  Menu,
  X,
  ChevronDown,
  Search,
  Sparkles,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = true; //TODO: replace with real auth check

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    //TODO:
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60 supports-backdrop-filter:dark:bg-slate-950/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={"/"} className="group flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Jobvyn
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href={"/"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 px-3 cursor-pointer"
              >
                <LucideHome className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href={"/jobs"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 px-3 cursor-pointer"
              >
                <BriefcaseBusinessIcon className="h-4 w-4" />
                Jobs
              </Button>
            </Link>
            <Link href={"/about"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 px-3 cursor-pointer"
              >
                <InfoIcon className="h-4 w-4" />
                About
              </Button>
            </Link>
          </div>

          {/* Right side Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
            </Button>

            {/* Auth Section */}
            {isAuth ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-700 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                        AK
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        Arun
                      </span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">
                        arunkoo072@gmail.com
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-56 p-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  align="end"
                  sideOffset={8}
                >
                  <div className="px-3 py-2 mb-2 border-b border-gray-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Arun
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                      arunkoo072@gmail.com
                    </p>
                  </div>
                  <Link href={"/account"}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      <User className="h-4 w-4" />
                      My Account
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm mt-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    onClick={logoutHandler}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={"/login"}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href={"/register"}>
                  <Button
                    size="sm"
                    className="gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow cursor-pointer"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <ModeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </Button>
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-slate-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 border-t border-gray-200 dark:border-slate-800"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
            <Link href={"/"} onClick={toggleMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 cursor-pointer"
              >
                <LucideHome className="h-5 w-5" />
                Home
              </Button>
            </Link>
            <Link href={"/jobs"} onClick={toggleMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 cursor-pointer"
              >
                <BriefcaseBusinessIcon className="h-5 w-5" />
                Jobs
              </Button>
            </Link>
            <Link href={"/about"} onClick={toggleMenu}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 cursor-pointer"
              >
                <InfoIcon className="h-5 w-5" />
                About
              </Button>
            </Link>

            {/* Mobile Auth Section */}
            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-slate-800">
              {isAuth ? (
                <>
                  {/* <div className="flex items-center gap-3 px-3 py-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        AK
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Arun
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        arunkoo072@gmail.com
                      </p>
                    </div>
                  </div> */}
                  <Link href={"/account"} onClick={toggleMenu}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 cursor-pointer"
                    >
                      <User className="h-5 w-5" />
                      My Account
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                    onClick={() => {
                      logoutHandler();
                      toggleMenu();
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href={"/login"} onClick={toggleMenu}>
                    <Button
                      variant="outline"
                      className="w-full justify-center gap-3 h-12 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <LogIn className="h-5 w-5" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href={"/register"} onClick={toggleMenu}>
                    <Button className="w-full justify-center gap-3 h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow cursor-pointer">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
