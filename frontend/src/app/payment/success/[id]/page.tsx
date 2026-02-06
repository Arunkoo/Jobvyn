"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const PaymentVerification = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 sm:p-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle2
              size={36}
              className="text-green-600 dark:text-green-400"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Payment Successful
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Your subscription has been activated successfully.
        </p>

        {/* Transaction ID */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Transaction ID
          </p>
          <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-words">
            {id}
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href="/account">Go to Account</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>

        {/* Support */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <Link
              href="/support"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact support
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PaymentVerification;
