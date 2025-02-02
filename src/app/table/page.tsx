"use client"

import { useState } from "react"

export default function TablePage() {
  // Example data for table
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
  ])

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-10">
      <h1 className="text-4xl font-bold text-center text-[#E2E1E6] mb-8">Job Application Status</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-[#2d1b69] text-white">
              <th className="py-3 px-6 text-left">Company</th>
              <th className="py-3 px-6 text-left">Job Title</th>
              <th className="py-3 px-6 text-left">URL</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="border-b border-[#2d2d4d] hover:bg-[#282848] transition">
                <td className="py-3 px-6">{app.company}</td>
                <td className="py-3 px-6">{app.jobTitle}</td>
                <td className="py-3 px-6">
                  <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                    {app.url}
                  </a>
                </td>
                <td className="py-3 px-6">{app.location}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      app.status === "Initializing" ? "bg-gray-600 text-gray-200" :
                      app.status === "Filling Out Form" ? "bg-blue-600 text-blue-100" :
                      app.status === "Uploading Resume" ? "bg-yellow-600 text-yellow-100" :
                      "bg-green-600 text-green-100"
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
  )
}
