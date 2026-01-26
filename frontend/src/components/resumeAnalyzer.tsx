"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Loader2,
  ArrowRight,
  FileCheck,
  Zap,
} from "lucide-react";
import axios from "axios";
import { ResumeAnalysisResponse, utils_service_url } from "@/type";
import { Badge } from "./ui/badge";

const ResumeAnalyzer = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResumeAnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload a resume");
      return;
    }
    setLoading(true);
    try {
      const base64 = await convertToBase64(file);
      const { data } = await axios.post(
        `${utils_service_url}/api/utils/resumeAnalyzer`,
        {
          pdfBase64: base64,
        },
      );
      setResponse(data);
      alert("Resume analyzed successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to analyze resume");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setFile(null);
    setResponse(null);
    setOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80)
      return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
    if (score >= 60)
      return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800";
    return "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high")
      return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800";
    if (priority === "medium")
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 md:py-24 lg:py-28">
      {/* Background gradient matching hero section */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 via-white to-purple-50/20 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950/10" />

      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-10 dark:bg-red-900/10" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-10 dark:bg-purple-900/10" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-6 gap-2 rounded-full border-red-200 bg-red-50/50 px-4 py-2 text-sm font-semibold text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-300"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white p-1 dark:bg-slate-800">
                <FileCheck className="h-3 w-3 text-red-600 dark:text-red-400" />
              </div>
              <span>AI-Powered ATS Analysis</span>
            </div>
          </Badge>

          {/* Title */}
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Optimize Your{" "}
            <span className="bg-linear-to-r from-red-500 to-purple-600 dark:from-red-400 dark:to-purple-400 bg-clip-text text-transparent">
              Resume for ATS
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
            Get instant feedback on your resume&apos;s compatibility with
            Applicant Tracking Systems. Improve your chances of getting noticed
            by recruiters.
          </p>

          {/* CTA Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="group h-12 px-8 gap-2 cursor-pointer bg-linear-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <FileText className="h-4 w-4" />
                Analyze My Resume
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-2xl">
              {!response ? (
                <>
                  {/* Upload Dialog */}
                  <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="flex items-center gap-4 text-2xl font-semibold text-slate-900 dark:text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-red-500/10 to-purple-500/10">
                        <FileText className="h-6 w-6 text-red-500 dark:text-red-400" />
                      </div>
                      <div className="text-left">
                        Upload Your Resume
                        <DialogDescription className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                          Upload your resume in PDF format for instant ATS
                          compatibility analysis
                        </DialogDescription>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 p-6 pt-0">
                    {/* Upload Area */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-red-400 dark:border-slate-700 dark:hover:border-red-500 transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-linear-to-r from-red-100 to-purple-100 dark:from-red-900/20 dark:to-purple-900/20 flex items-center justify-center">
                          <Upload
                            size={32}
                            className="text-red-500 dark:text-red-400"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white mb-1">
                            {file ? file.name : "Click to upload your resume"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">
                            PDF format only, maximum 5MB
                          </p>
                        </div>
                        {file && (
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle2 size={18} />
                            <span className="text-sm font-medium">
                              File uploaded successfully
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hidden File Input */}
                    <input
                      title="fileInput"
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {/* Analyze Button */}
                    <Button
                      onClick={analyzeResume}
                      disabled={loading || !file}
                      className="w-full h-11 gap-2 bg-linear-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white shadow-md"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing Your Resume...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          Analyze Resume
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Results Dialog */}
                  <DialogHeader className="border-b border-slate-200 p-6 pb-4 dark:border-slate-800">
                    <DialogTitle className="flex items-center gap-4 text-2xl font-semibold text-slate-900 dark:text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-red-500/10 to-purple-500/10">
                        <FileCheck className="h-6 w-6 text-red-500 dark:text-red-400" />
                      </div>
                      Your Resume Analysis
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 p-6">
                    {/* Overall Score */}
                    <div
                      className={`p-6 rounded-xl border-2 ${getScoreBgColor(response.atsScore)}`}
                    >
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-2">
                          ATS Compatibility Score
                        </p>
                        <div
                          className={`text-5xl md:text-6xl font-bold ${getScoreColor(response.atsScore)}`}
                        >
                          {response.atsScore}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                          out of 100
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-800/30 dark:bg-blue-900/20">
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                        {response.summary}
                      </p>
                    </div>

                    {/* Score Breakdown */}
                    <div>
                      <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                        <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                          <TrendingUp className="h-5 w-5 text-red-500 dark:text-red-400" />
                        </div>
                        Detailed Score Breakdown
                      </h3>

                      <div className="grid gap-4 md:grid-cols-2">
                        {Object.entries(response.scoreBreakdown).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-800/50"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <p className="font-semibold text-slate-900 dark:text-white capitalize">
                                  {key}
                                </p>
                                <span
                                  className={`text-lg font-bold ${getScoreColor(value.score)}`}
                                >
                                  {value.score}%
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-slate-400">
                                {value.feedback}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="rounded-xl border border-green-200 bg-green-50/50 p-5 dark:border-green-800/30 dark:bg-green-900/20">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                        <div className="rounded-lg bg-white p-2 dark:bg-slate-800">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        What Your Resume Does Well
                      </h3>
                      <ul className="space-y-3">
                        {response.strengths.map((strength, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="text-green-600 dark:text-green-400 mt-0.5">
                              ✓
                            </span>
                            <span className="text-gray-700 dark:text-slate-300">
                              {strength}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                        <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/30">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        Recommendations for Improvement
                      </h3>
                      <div className="space-y-4">
                        {response.suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-800/50"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                                {suggestion.category}
                              </h4>
                              <span
                                className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(suggestion.priority)} self-start sm:self-center`}
                              >
                                {suggestion.priority}
                              </span>
                            </div>
                            <div className="space-y-3 text-sm">
                              <div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                  Issue:{" "}
                                </span>
                                <span className="text-gray-600 dark:text-slate-400">
                                  {suggestion.issue}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                  Fix:{" "}
                                </span>
                                <span className="text-gray-600 dark:text-slate-400">
                                  {suggestion.recommendation}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reset Button */}
                    <Button
                      onClick={resetDialog}
                      variant="outline"
                      className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Analyze Another Resume
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ResumeAnalyzer;
