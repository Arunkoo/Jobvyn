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
  Spotlight,
  Feather,
  Menu,
  X,
  HomeIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const isAuth = false; //TODO: replace with real auth check
  const logoutHandler = () => {
    //TODO:
  };

  return (
    <nav className="z-50 sticky top-0 bg-background/80 border-b backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center gap-2 group">
              {/* <Feather /> */}
              <div className="text-2xl font-bold tracking-tight">Jobvyn</div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1 ">
            <Link href={"/"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 font-medium cursor-pointer"
              >
                <LucideHome size={16} />
                Home
              </Button>
            </Link>
            <Link href={"/jobs"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 font-medium cursor-pointer"
              >
                <BriefcaseBusinessIcon size={16} />
                Jobs
              </Button>
            </Link>
            <Link href={"/about"}>
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 font-medium cursor-pointer"
              >
                <InfoIcon size={16} />
                About Us
              </Button>
            </Link>
          </div>

          {/*Right side Action*/}
          <div className="hidden md:flex items-center gap-3">
            {isAuth ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-offset-background ring-purple-500/20 cursor-pointer hover:ring-purple-500/40 transition-all">
                    <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-600">
                      AK
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent
                  className="w-56 p-2"
                  align="end"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="px-3 py-2 mb-2 border-b">
                    <p className="text-sm font-semibold">Arun</p>
                    <p className="text-xs opacity-60 truncate">
                      arunkoo072@gmail.com
                    </p>
                  </div>
                  <Link href={"/account"}>
                    <Button
                      className="w-full justify-start gap-2 cursor-pointer"
                      variant={"ghost"}
                    >
                      <User size={16} /> My Account
                    </Button>
                  </Link>
                  <Button
                    className="w-full justify-start gap-2 mt-2 cursor-pointer"
                    variant={"default"}
                    onClick={logoutHandler}
                  >
                    <LogOut size={16} /> Sign Out
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Link href={"/login"}>
                <Button variant={"default"} className="gap-2 cursor-pointer">
                  <LogIn size={16} />
                  Sign In
                </Button>
              </Link>
            )}
            <ModeToggle />
          </div>

          {/* Mobile Navigation.. */}
          <div className="md:hidden flex items-center gap-3">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div
        className={`md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-3 py-3 space-y-1 bg-background/95 backdrop-blur-md">
          {/* Auth or user */}
          <Link href={"/"} onClick={toggleMenu}>
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-3 h-11"
            >
              <HomeIcon size={18} /> Home
            </Button>
          </Link>
          <Link href={"/jobs"} onClick={toggleMenu}>
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-3 h-11"
            >
              <BriefcaseBusinessIcon size={18} /> Jobs
            </Button>
          </Link>
          <Link href={"/about"} onClick={toggleMenu}>
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-3 h-11"
            >
              <InfoIcon size={18} /> About
            </Button>
          </Link>

          {isAuth ? (
            <>
              <Link href={"/myAccount"} onClick={toggleMenu}>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start gap-3 h-11 mt-2"
                >
                  <User size={18} /> My Account
                </Button>
              </Link>
              <Button
                variant={"default"}
                className="w-full justify-start gap-3 h-11"
                onClick={() => {
                  logoutHandler();
                  toggleMenu();
                }}
              >
                <LogOut size={18} /> Sign Out
              </Button>
            </>
          ) : (
            <Link href={"/login"} onClick={toggleMenu}>
              <Button
                variant={"default"}
                className="w-full justify-start gap-3 h-11 mt-2"
              >
                <LogIn size={18} /> Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
