/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CareerGuideResponse } from "@/type";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Lightbulb,
  Loader2,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { utils_service_url } from "@/context/AppContext";

const CareerGuidance = () => {
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerGuideResponse | null>(null);

  const addSkill = () => {
    const normalizedSkill = currentSkill.trim().toLowerCase();
    if (normalizedSkill && !skill.includes(normalizedSkill)) {
      setSkill([...skill, normalizedSkill]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkill(skill.filter((s) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  const getCareerGuidance = async () => {
    if (skill.length === 0) {
      alert("Please add at least one skill.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${utils_service_url}/api/utils/career`,
        { skill: skill },
      );
      setResponse(data);
    } catch (error: any) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSkill([]);
    setResponse(null);
    setCurrentSkill("");
    setOpen(false);
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 md:py-24 lg:py-28">
      {/* Background gradient matching hero section */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950/10" />

      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20 dark:bg-blue-900/10" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 dark:bg-purple-900/10" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-6 gap-2 rounded-full border-blue-200 bg-blue-50/50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white p-1 dark:bg-slate-800">
                <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span>AI Career Guidance</span>
            </div>
          </Badge>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Discover Your{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Ideal Career Path
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
            Add your skills and get AI-powered career recommendations, learning
            paths, and job opportunities tailored just for you.
          </p>

          {/* CTA */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="group h-12 px-8 gap-2 cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <Sparkles className="h-4 w-4" />
                Start Career Analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-2xl">
              {!response ? (
                <>
                  <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="flex items-center gap-4 text-2xl font-semibold text-slate-900 dark:text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-blue-500/10 to-purple-500/10">
                        <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-left">
                        Add Your Skills
                        <DialogDescription className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                          Enter your technical skills for personalized career
                          insights
                        </DialogDescription>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 p-6 pt-0">
                    {/* Skill Input */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="skill"
                        className="text-slate-700 dark:text-slate-300"
                      >
                        Enter Skills
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="skill"
                          placeholder="e.g., React, Python, AWS, Figma..."
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          className="h-11 border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800"
                          onKeyUp={handleKeyPress}
                        />
                        <Button
                          onClick={addSkill}
                          size="sm"
                          className="h-11 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>

                    {/* Skills List */}
                    {skill.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-700 dark:text-slate-300">
                            Your Skills ({skill.length})
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSkill([])}
                            className="h-8 text-xs text-gray-600 hover:text-red-600 dark:text-slate-400"
                          >
                            Clear All
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skill.map((s) => (
                            <Badge
                              key={s}
                              variant="secondary"
                              className="group gap-2 pl-3 pr-2 py-1.5 rounded-full border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {s}
                              <button
                                title="removeSkill"
                                onClick={() => removeSkill(s)}
                                className="ml-1 h-5 w-5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Generate Button */}
                    <Button
                      onClick={getCareerGuidance}
                      disabled={loading || skill.length === 0}
                      className="w-full h-11 gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing Your Skills...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate Career Insights
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <DialogHeader className="border-b border-slate-200 p-6 pb-4 dark:border-slate-800">
                    <DialogTitle className="flex items-center gap-4 text-2xl font-semibold text-slate-900 dark:text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-blue-500/10 to-purple-500/10">
                        <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      Your Career Roadmap
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 p-6">
                    {/* Career Summary */}
                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800/30 dark:bg-blue-900/20">
                      <div className="flex gap-4">
                        <div className="mt-0.5 shrink-0 rounded-lg bg-white p-2 dark:bg-slate-800">
                          <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                            Career Summary
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                            {response.summary}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Career Paths */}
                    <div>
                      <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                          <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        Recommended Career Paths
                      </h3>
                      <div className="space-y-4">
                        {response.jobOptions.map((job, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-blue-800"
                          >
                            <h4 className="mb-3 font-semibold text-base text-slate-900 dark:text-white">
                              {job.title}
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                  Responsibilities:{" "}
                                </span>
                                <span className="text-gray-600 dark:text-slate-400">
                                  {job.responsibilities}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                  Why This Role:{" "}
                                </span>
                                <span className="text-gray-600 dark:text-slate-400">
                                  {job.why}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills to Learn */}
                    <div>
                      <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                        <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                          <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        Skills to Enhance Your Career
                      </h3>
                      <div className="space-y-6">
                        {response.skillsToLearn.map((category, index) => (
                          <div key={index} className="space-y-4">
                            <h4 className="font-semibold text-sm text-blue-600 dark:text-blue-400">
                              {category.category}
                            </h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {category.skills.map((skill, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50"
                                >
                                  <p className="mb-2 font-medium text-slate-900 dark:text-white">
                                    {skill.title}
                                  </p>
                                  <div className="space-y-2">
                                    <p className="text-xs text-gray-600 dark:text-slate-400">
                                      <span className="font-medium">Why: </span>
                                      {skill.why}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-slate-400">
                                      <span className="font-medium">How: </span>
                                      {skill.how}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Learning Approach */}
                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-800/30 dark:bg-blue-900/20">
                      <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                        <div className="rounded-lg bg-white p-2 dark:bg-slate-800">
                          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        {response.learningApproach.title}
                      </h3>
                      <ul className="space-y-3">
                        {response.learningApproach.points.map(
                          (point, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-sm"
                            >
                              <span className="mt-0.5 text-blue-600 dark:text-blue-400">
                                •
                              </span>
                              <span
                                className="text-gray-700 dark:text-slate-300"
                                dangerouslySetInnerHTML={{ __html: point }}
                              />
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    {/* Reset Button */}
                    <Button
                      onClick={resetDialog}
                      variant="outline"
                      className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Start New Analysis
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

export default CareerGuidance;
