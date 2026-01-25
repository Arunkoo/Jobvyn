import {
  ArrowUpRight,
  BriefcaseBusinessIcon,
  Search,
  TrendingUp,
  Shield,
  CheckCircle,
  Users,
  Building,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950/20" />

      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40 dark:bg-blue-900/20 dark:opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40 dark:bg-purple-900/20 dark:opacity-30" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="w-full space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <TrendingUp
                    size={14}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
                  #FindYourFit • Work that grows with you
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Jobvyn
                </span>{" "}
                <span className="text-slate-900 dark:text-white">
                  Where Skills Meet Real Opportunities
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-slate-300 leading-relaxed">
                Your career deserves more than just another job listing. Jobvyn
                helps you find opportunities that support real growth, with
                companies that value your skills.
              </p>
            </div>

            {/* Stats - Mobile: Horizontal, Desktop: Grid */}
            <div className="py-4">
              <div className="flex flex-wrap justify-between gap-6 sm:grid sm:grid-cols-3 sm:gap-8">
                {/* Active Jobs Stat */}
                <div className="flex-1 min-w-25 sm:flex-auto">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <Building
                          size={14}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        15K+
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 text-center sm:text-left">
                      Active Jobs
                    </p>
                  </div>
                </div>

                {/* Companies Stat */}
                <div className="flex-1 min-w-25 sm:flex-auto">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                        <Users
                          size={14}
                          className="text-purple-600 dark:text-purple-400"
                        />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        8K+
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 text-center sm:text-left">
                      Companies
                    </p>
                  </div>
                </div>

                {/* Job Seekers Stat */}
                <div className="flex-1 min-w-25 sm:flex-auto">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle
                          size={14}
                          className="text-green-600 dark:text-green-400"
                        />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        60K+
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 text-center sm:text-left">
                      Job Seekers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - ALWAYS in row */}
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4 pt-2">
              <Link href="/jobs" className="flex-1 min-w-35">
                <Button
                  size="lg"
                  className=" cursor-pointer w-full text-sm sm:text-base px-4 sm:px-8 h-11 sm:h-12 gap-2 group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Search size={18} />
                  <span className="whitespace-nowrap">Explore Jobs</span>
                  <ArrowUpRight
                    size={18}
                    className=" group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
                  />
                </Button>
              </Link>
              <Link href="/about" className="flex-1 min-w-35">
                <Button
                  variant="outline"
                  size="lg"
                  className=" cursor-pointer w-full text-sm sm:text-base px-4 sm:px-8 h-11 sm:h-12 gap-2 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 shadow-sm hover:shadow transition-all duration-300"
                >
                  <BriefcaseBusinessIcon size={18} />
                  <span className="whitespace-nowrap">Learn More</span>
                </Button>
              </Link>
            </div>

            {/* Trust Indicators - Always in row, wraps when needed */}
            <div className="pt-4 sm:pt-6">
              <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500 dark:text-slate-400">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="shrink-0 p-0.5 bg-green-50 dark:bg-green-900/30 rounded-full">
                    <CheckCircle
                      size={14}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <span>No cost to get started</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-slate-700" />
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="shrink-0 p-0.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    <Shield
                      size={14}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <span>Trusted Employers</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-slate-700" />
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="shrink-0 p-0.5 bg-purple-50 dark:bg-purple-900/30 rounded-full">
                    <Shield
                      size={14}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <span>Secure Platform</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section - Hidden on mobile, visible on lg+ */}
          <div className="hidden lg:block relative w-full">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-linear-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 bg-white dark:bg-slate-800">
                <div className="aspect-4/3 w-full relative overflow-hidden">
                  <Image
                    src="/hero1.png"
                    alt="Jobvyn Platform Dashboard"
                    fill
                    sizes="(max-width: 1024px) 0vw, 50vw"
                    className="object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-white/5 via-transparent to-transparent dark:from-slate-900/5" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      15K+ Matches
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      This month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
