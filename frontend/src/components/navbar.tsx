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
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAuth = true; //TODO:
  const logoutHandler = () => {
    //TODO:
  };

  console.log("isAuth value:", isAuth);
  console.log("isAuth type:", typeof isAuth);
  return (
    <nav className="z-50 sticky top-0 bg-background/80 border-b backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center gap-1 group:">
              <div className="text-2xl font-bold tracking-tight">
                <span>Jobvyn</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
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
          </div>

          {/*Right side Action*/}
          <div className="hidden md:flex items-center gap-3">
            {isAuth ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-offset-background ring-green-500/20 cursor-pointer hover:ring-green-500/40 transition-all">
                      <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-600">
                        AK
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  <div className="px-3 py-2 mb-2 border-b">
                    <p className="text-sm font-semibold">Arun</p>
                    <p className="text-xs opacity-60 truncate">
                      arunkoo072@gmail.com
                    </p>
                  </div>
                  <Link href={"/account"}>
                    <Button
                      className="w-full justify-start gap-2"
                      variant={"ghost"}
                    >
                      <User size={16} /> My Account
                    </Button>
                  </Link>
                  <Button
                    className="w-full justify-start gap-2 mt-1"
                    variant={"ghost"}
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
