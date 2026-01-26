/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CarrerGuideResponse, utils_service_url } from "@/type";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Lightbulb,
  Loader2,
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

const CarrerGuidance = () => {
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CarrerGuideResponse | null>(null);
  //addSkill function...
  const addSkill = () => {
    const normalizedSkill = currentSkill.trim().toLowerCase();
    if (normalizedSkill.trim() && !skill.includes(normalizedSkill.trim())) {
      setSkill([...skill, normalizedSkill.trim()]);
      setCurrentSkill("");
    }
  };

  //removeSkill function...
  const removeSkill = (skillToRemove: string) => {
    setSkill(skill.filter((s) => s !== skillToRemove));
  };
  //handle Key Event...
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  //get carrer Gudance..
  const getCarrerGuidance = async () => {
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
      alert("Career guidance generated successfully.");
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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex item-center gap-2 px-4 py-2 rounded-full border bg-blue-50 dark:bg-blue-950 mb-4">
          <Sparkles size={16} className="text-blue-600" />
          <span className="text-sm font-medium">AI-Guided Career Pathways</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Build the Career That Suits You
        </h2>
        <p className="text-lg opcaity-70 max-w-2xl mx-auto mb-8">
          Access personalized job matches and learning roadmaps tailored to your
          skills
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size={"lg"} className="gap-2 h-12 px-8 cursor-pointer">
              <Sparkles size={18} />
              Get Career Guidance
              <ArrowRight size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {!response ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="text-blue-600" />
                    🧐 What skills do you have?
                  </DialogTitle>
                  <DialogDescription>
                    Add technical skills for smart, personalized career
                    recommendations
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill">Add Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skill"
                        placeholder="e.g Node.js, Javascript, Express.js..."
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        className="h-11"
                        onKeyUp={handleKeyPress}
                      />
                      <Button onClick={addSkill} className="gap-2">
                        Add
                      </Button>
                    </div>
                  </div>
                  {skill.length > 0 && (
                    <div className="space-y-2">
                      <Label>Your Skills ({skill.length})</Label>
                      <div className="flex flex-wrap gap-2">
                        {skill.map((s) => (
                          <div
                            key={s}
                            className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                          >
                            <span className="text-sm font-medium">{s}</span>
                            <button
                              title="remove"
                              onClick={() => removeSkill(s)}
                              className="h-5 w-5 rounded-full bg-red-500 text-white flex in-checked: justify-center items-center cursor-pointer"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={getCarrerGuidance}
                    disabled={loading || skill.length === 0}
                    className="w-full h-11 gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing skill data...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Generate Career Insights
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Target className="text-blue-600" />
                    Your Personalized Career Roadmap
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* summary */}
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-b-blue-200 dark:border-b-blue-800">
                    <div className="flex items-start gap-3">
                      <Lightbulb
                        className="text-blue-600 mt-1 shrink-0"
                        size={20}
                      />
                      <div>
                        <h3 className="font-semibold mb-2">Career Summary</h3>
                        <p className="text-sm leading-relaxed opacity-90">
                          {response.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* job options */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Briefcase size={20} className="text-blue-600" />
                      Recommend Career Paths
                    </h3>
                    <div className="space-y-3">
                      {response.jobOptions.map((job, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border hover:border-blue-500 transition-colors"
                        >
                          <h4 className="font-semibold text-base mb-2">
                            {job.title}
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium opacity-70">
                                Responsibilities:
                              </span>
                              <span className="opacity-80">
                                {job.responsibilities}
                              </span>
                            </div>
                          </div>
                          <span className="font-medium opacity-70">
                            Why this Role:
                          </span>
                          <span className="opacity-80">{job.why}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* skills to Learn */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp size={20} className="text-green-600" />
                      Skills To Enhanve Your Career
                    </h3>
                    <div className="space-y-4">
                      {response.skillsToLearn.map((category, index) => (
                        <div className="space-y-2" key={index}>
                          <h4 className="font-semibold text-sm text-blue-600">
                            {category.category}
                          </h4>
                          <div className="space-y-2">
                            {category.skills.map((skill, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-lg bg-secondary border text-sm"
                              >
                                <p className="font-medium mb-1">
                                  {skill.title}
                                </p>
                                <p className="text-xs opacity-70 mb-1">
                                  <span className="font-medium">Why: </span>
                                  {skill.why}
                                </p>
                                <p className="text-xs opacity-70 mb-1">
                                  <span className="font-medium">Why: </span>
                                  {skill.how}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* learning Approach */}
                  <div className="p-4 rounded-lg border bg-blue-950/20 dark:bg-red-950/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <BookOpen size={20} className="text-blue-600" />
                      {response.learningApproach.title}
                    </h3>
                    <ul className="space-y-2">
                      {response.learningApproach.points.map((point, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-start gap-2"
                        >
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span
                            className="opacity-90"
                            dangerouslySetInnerHTML={{ __html: point }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={resetDialog}
                    variant={"outline"}
                    className="w-full"
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
  );
};

export default CarrerGuidance;
