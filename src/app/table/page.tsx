"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TablePage() {
  const [applications, setApplications] = useState([
    {
      company: "Google",
      jobTitle: "Software Engineer",
      url: "https://careers.google.com",
      location: "Mountain View, CA",
      status: "Initializing",
    },
    {
      company: "Microsoft",
      jobTitle: "Data Scientist",
      url: "https://careers.microsoft.com",
      location: "Redmond, WA",
      status: "Filling Out Form",
    },
    {
      company: "Amazon",
      jobTitle: "Product Manager",
      url: "https://amazon.jobs",
      location: "Seattle, WA",
      status: "Uploading Resume",
    },
    {
      company: "Tesla",
      jobTitle: "AI Researcher",
      url: "https://www.tesla.com/careers",
      location: "Palo Alto, CA",
      status: "Applied",
    },
  ]);

  return (
    <div className="min-h-screen tech-gradient tech-grid overflow-hidden p-8">
      {/* Ambient glows */}
      <div className="glow-effect bg-[#2d1b69] top-1/4 -left-20" />
      <div className="glow-effect bg-[#E2E1E6] bottom-1/4 -right-20" />

      {/* Back Button */}
      <Link href="/">
        <Button
          variant="ghost"
          className="text-[#E2E1E6]/60 hover:text-[#E2E1E6]"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </Link>

      {/* Page Header */}
      <div className="max-w-5xl mx-auto text-center space-y-6 mt-12">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gradient">
          Job Application Status
        </h1>
      </div>

      {/* Table Container */}
      <div className="max-w-5xl mx-auto mt-12 rounded-2xl glass-effect border-0 shadow-lg hover-glow">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#2d1b69] text-white text-lg">
              <th className="py-4 px-6">Company</th>
              <th className="py-4 px-6">Job Title</th>
              <th className="py-4 px-6">URL</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {applications.map((app, index) => (
              <tr
                key={index}
                className="border-b border-[#2d2d4d]/50 hover:bg-[#29294a] transition-all duration-300"
              >
                <td className="py-4 px-6">{app.company}</td>
                <td className="py-4 px-6">{app.jobTitle}</td>
                <td className="py-4 px-6">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {app.url}
                  </a>
                </td>
                <td className="py-4 px-6">{app.location}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${
                      app.status === "Initializing"
                        ? "bg-gray-700 text-gray-300"
                        : app.status === "Filling Out Form"
                          ? "bg-blue-600 text-blue-100"
                          : app.status === "Uploading Resume"
                            ? "bg-yellow-600 text-yellow-100"
                            : "bg-green-600 text-green-100"
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
  );
}
