import React from "react";
import { TrendingUp } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Gradient spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200/50 dark:border-blue-900/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-purple-600 border-b-blue-600 border-l-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-2 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-lg">
              <TrendingUp size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* Text with animated dots */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-slate-300 font-medium">
            Loading
          </span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
            <div
              className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
