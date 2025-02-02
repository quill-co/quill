"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Application {
  company: string;
  jobTitle: string;
  url: string;
  location: string;
  status: string;
}

export default function TablePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?clientId=${id}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "status":
            const updatedApplication = message.data as Application;
            setApplications((prevApplications) =>
              prevApplications.map((app) =>
                app.company === updatedApplication.company &&
                app.jobTitle === updatedApplication.jobTitle
                  ? { ...app, status: updatedApplication.status }
                  : app
              )
            );
            break;

          case "job_listing":
            const newJob = message.data as Application;
            setApplications((prevApplications) => [
              ...prevApplications,
              newJob,
            ]);
            break;

          case "finished":
            const finishedJob = message.data as Application;
            setApplications((prevApplications) =>
              prevApplications.map((app) =>
                app.company === finishedJob.company &&
                app.jobTitle === finishedJob.jobTitle
                  ? { ...app, status: "Completed" }
                  : app
              )
            );
            break;

          default:
            console.log("Unknown message type:", message.type);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, [id]); // Added id to dependency array

  const formatUrl = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

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

      {/* Page Header */}
      <div className="max-w-6xl mx-auto text-center space-y-4 mt-8 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
          Job Application Status
        </h1>
      </div>

      {/* Table Container */}
      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden bg-[#1f1f2e]/50 backdrop-blur-sm border border-purple-500/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-purple-900/40 text-gray-200 text-sm uppercase tracking-wider">
                <th className="py-4 px-6 text-left font-medium">Company</th>
                <th className="py-4 px-6 text-left font-medium">Job Title</th>
                <th className="py-4 px-6 text-left font-medium">URL</th>
                <th className="py-4 px-6 text-left font-medium">Location</th>
                <th className="py-4 px-6 text-left font-medium">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-purple-500/10">
              {applications.map((app, index) => (
                <tr
                  key={index}
                  className="text-gray-300 hover:bg-purple-900/20 transition-colors duration-150"
                >
                  <td className="py-4 px-6 text-sm whitespace-nowrap">
                    {app.company}
                  </td>
                  <td className="py-4 px-6 text-sm whitespace-nowrap">
                    {app.jobTitle}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {formatUrl(app.url)}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-sm whitespace-nowrap">
                    {app.location || "Remote"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        app.status === "Initializing"
                          ? "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                          : app.status === "Filling Out Form"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : app.status === "Uploading Resume"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : app.status === "Completed"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
