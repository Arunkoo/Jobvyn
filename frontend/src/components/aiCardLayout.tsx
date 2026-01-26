import CareerGuidance from "@/components/carrerGuidance";
import ResumeAnalyzer from "@/components/resumeAnalyzer";
import { FileCheck, Sparkles, Target } from "lucide-react";
import React from "react";

const AiCardLayout = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-10 dark:bg-blue-900/10" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-10 dark:bg-purple-900/10" />
      </div>

      {/* Services Section Header */}
      <div className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                AI Career Assistant
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Your{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Career Advantage
            </h2>
            <p className="text-lg text-gray-600 dark:text-slate-300">
              Leverage AI to navigate your career path and optimize your job
              search
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid - Compact Version */}
      <div className="relative pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Career Guidance Card - Left */}
            <div className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Icon and Header - Compact */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-blue-500/10 to-purple-500/10">
                  <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Smart Career Guidance
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Discover your ideal career path
                  </p>
                </div>
              </div>

              {/* Brief Description */}
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Get personalized career recommendations, skill-based matching,
                and a clear growth roadmap tailored to your unique abilities.
              </p>

              {/* Compact Feature Highlights */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    50K+
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Paths
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    95%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Accuracy
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    AI
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Powered
                  </div>
                </div>
              </div>

              {/* Button - Compact */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <CareerGuidance />
              </div>
            </div>

            {/* Resume Analyzer Card - Right */}
            <div className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Icon and Header - Compact */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-red-500/10 to-purple-500/10">
                  <FileCheck className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    ATS Resume Analyzer
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Optimize for Applicant Tracking Systems
                  </p>
                </div>
              </div>

              {/* Brief Description */}
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Get instant feedback on your resume&apos;s ATS compatibility
                with actionable suggestions and keyword optimization.
              </p>

              {/* Compact Feature Highlights */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">
                    A+
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Score
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">
                    40%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Improvement
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">
                    AI
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Analysis
                  </div>
                </div>
              </div>

              {/* Button - Compact */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <ResumeAnalyzer />
              </div>
            </div>
          </div>

          {/* Combined Value Proposition - Smaller */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/20">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Pro Tip:</span> Use both tools
                together for best results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCardLayout;
