"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import { Award, Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Skills: React.FC<AccountProps> = ({ isYourAccount, user }) => {
  const [skill, setSkill] = useState("");
  const { addSkill, btnLoading, removeSkill } = useAppData();
  //   add
  const addSkillHandler = () => {
    if (!skill.trim()) {
      toast.error("Please enter a Skill");
      return;
    }
    //addSkill..
    addSkill(skill, setSkill);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkillHandler();
    }
  };
  // remove
  const removeSkillHandler = (skillToRemove: string) => {
    if (confirm(`Are you sure you want to remove ${skillToRemove} ?`)) {
      removeSkill(skillToRemove);
    }
  };
  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Award size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                {isYourAccount ? "Your Skills" : "Skills"}
              </CardTitle>
              {isYourAccount && (
                <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
                  Showcase your expertise
                </CardDescription>
              )}
            </div>
          </div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {user?.skills?.length || 0} skills
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add Skills Input */}
        {isYourAccount && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Sparkles
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                type="text"
                placeholder="Add a skill (e.g., React, Python...)"
                className="h-10 pl-10 text-sm"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyUp={handleKeyPress}
              />
            </div>
            <Button
              onClick={addSkillHandler}
              className="h-10 px-4 text-sm bg-blue-600 hover:bg-blue-700"
              disabled={!skill.trim() || btnLoading}
              size="sm"
            >
              <Plus size={16} className="mr-2" />
              Add
            </Button>
          </div>
        )}

        {/* Skills display */}
        <div>
          {user?.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((e, i) => (
                <div
                  key={i}
                  className="group relative inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {e}
                  </span>
                  {isYourAccount && (
                    <button
                      title="remove"
                      className="cursor-pointer h-5 w-5 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={() => removeSkillHandler(e)}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                <Award className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isYourAccount ? "Add your first skill" : "No skills added yet"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;
