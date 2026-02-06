/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const useRazorPay = () => {
  const [loaded, setLoaded] = useState(
    typeof window !== "undefined" && !!window.Razorpay,
  );

  useEffect(() => {
    if (typeof window === "undefined" || window.Razorpay) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);
  }, []);

  return loaded;
};

export default useRazorPay;
