"use client";

import AiCardLayout from "@/components/aiCardLayout";
import HeroSection from "@/components/hero";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";

import React from "react";

const Home = () => {
  const { loading } = useAppData();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <AiCardLayout />
    </div>
  );
};

export default Home;
