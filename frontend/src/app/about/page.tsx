import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowRight, Sparkles, Target, Users, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950/10" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge
                variant="outline"
                className="gap-2 rounded-full border-blue-200 bg-blue-50/50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300"
              >
                <Sparkles className="h-3 w-3" />
                About Jobvyn
              </Badge>
            </div>

            {/* Image */}
            <div className="mb-8">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/AboutUs.png"
                  alt="Jobvyn platform connecting talent with opportunities"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent dark:from-black/20" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Better Careers,{" "}
                <span className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Built Together
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Jobvyn is where talent meets opportunity. We help professionals
                discover meaningful work and companies find the right talent —
                powered by AI and human insight.
              </p>

              {/* Simple Stats */}
              <div className="flex flex-wrap justify-center gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    15K+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Active Jobs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    8K+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Companies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    60K+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Professionals
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Simple Grid */}
      <section className="py-16 md:py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                What Drives Us
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Simple principles for meaningful connections
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Clear Purpose
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  We make job searching efficient and opportunity discovery
                  effortless.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Rocket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Smart Technology
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  AI-powered matching that understands skills, experience, and
                  potential.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    For Everyone
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Creating equal opportunities for all professionals,
                  everywhere.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <Sparkles className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Always Evolving
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Continuously improving to meet the changing needs of the
                  workforce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Find Your Next Opportunity?
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Join professionals who are advancing their careers with Jobvyn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="gap-2 h-12 px-8 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  Browse Jobs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/companies">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 h-12 px-8 border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  For Employers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
