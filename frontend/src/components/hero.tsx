import {
  ArrowUpRight,
  BriefcaseBusinessIcon,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-5 py-16 md:py-24 relative">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-sm font-medium">
                #FindYourFit ⚡ Work that grows with you
              </span>
            </div>
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-purple-500">Jobvyn</span> Where Skills Meet
              Real Opportunities
            </h1>

            {/* description */}
            <p className="text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl">
              Your career deserves more than just another job listing. Jobvyn
              helps you find opportunities that support real growth.
            </p>

            {/* stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 py-4">
              <div className="text-center md:text-left">
                <p className="text-3xl font-bold text-blue-600">15K+</p>
                <p className="text-sm opcaity-70">Active Jobs</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-3xl font-bold text-blue-600">8K+</p>
                <p className="text-sm opcaity-70">Companies</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-3xl font-bold text-blue-600">60K+</p>
                <p className="text-sm opcaity-70">Job Seekers</p>
              </div>
            </div>

            {/*  */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href={"/jobs"}>
                <Button
                  size={"lg"}
                  className="text-base px-8 h-12 gap-2 group transition-all cursor-pointer"
                >
                  <Search size={18} />
                  Explore Jobs{" "}
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href={"/about"}>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="text-base px-8 h-12 gap-2  cursor-pointer"
                >
                  <BriefcaseBusinessIcon size={18} />
                  Learn More{" "}
                </Button>
              </Link>
            </div>

            {/* Trust indicator section */}
            <div className="flex items-center gap-2 text-sm opacity-60 pt-4">
              <span>✔️ Get started at no cost</span>
              <span>•</span>
              <span>✔️ Trusted Employers</span>
              <span>•</span>
              <span>✔️ Secure Platform</span>
              <span>•</span>
            </div>
          </div>

          {/* image section */}
          <div className="flex-1 relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-500 opcaity-20 blur-xl group-hover:opcaity-30 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                <img
                  src="/hero.png"
                  alt=""
                  className="object-cover object-center w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
