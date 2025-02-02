"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ApplyingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Initializing...");
  const id = searchParams.get("id");

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?clientId=${id}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "log") {
        setStatus(data.message);
      }
      if (data.message === "Found job listings!") {
        router.push(`/table?id=${id}`);
      }
    };

    fetch("http://localhost:3000/api/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: id,
      }),
      mode: "no-cors",
    });

    return () => {
      ws.close();
    };
  }, [router, id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] p-8">
      {/* Back Button */}
      <Link href="/">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </Link>

      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md bg-[#1f1f2e]/50 backdrop-blur-sm border border-purple-500/10 shadow-2xl hover:shadow-purple-500/5 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
              AI is Working Its Magic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-300 text-lg">{status}</p>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-purple-400/20 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-purple-400 animate-spin"></div>
              </div>
            </div>
            <p className="text-center text-gray-400">
              This process may take a few minutes. We&apos;ll notify you once
              it&apos;s complete.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
