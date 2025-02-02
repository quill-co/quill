"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function ApplyingPage() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/table");
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-800">
            AI is Working Its Magic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">
            Our AI is now analyzing your resume and applying to suitable
            internships for you.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            This process may take a few minutes. We'll notify you once it's
            complete.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
