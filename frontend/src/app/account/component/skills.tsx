"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import { Award } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Skills: React.FC<AccountProps> = ({ isYourAccount, user }) => {
  const [skill, setSkill] = useState("");
  const { addSkill } = useAppData();
  //   add
  const addSkillHandler = () => {
    if (!skill.trim()) {
      toast.error("Please enter a Skill");
      return;
    }
    //addSkill..
    addSkill(skill);
    setSkill("");
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkillHandler();
    }
  };
  // remove
  const removeSkillHandler = (skillToRemove: string) => {
    if (confirm(`Are you sure you want to remove ${skillToRemove} ?`)) {
    }
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Card className="shadow-lg border-2 overflow-hidden">
        <div className="bg-blue-500 p-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Award size={20} className="text-blue-600" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl text-white">
              {isYourAccount ? "YourSkills" : "UserSkills"}
            </CardTitle>
            {isYourAccount && (
              <CardDescription className="text-sm mt-1 text-white">
                Showcase your expertise and abilities
              </CardDescription>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Skills;
