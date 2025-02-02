"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplyingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Initializing...");
  const id = searchParams.get("id");

  useEffect(() => {
    // Connect to WebSocket first
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

    // Send HTTP request to start job search after socket is connected
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-800">
            AI is Working Its Magic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">{status}</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            This process may take a few minutes. We&apos;ll notify you once
            it&apos;s complete.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
