"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadResume } from "../actions/uploadResume";

export default function UploadPage() {
  const searchParams = useSearchParams();
  const selectedModel = searchParams.get("model") || "Not Selected";

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const { id } = await uploadResume(formData);
      console.log(id);
      router.push(`/selectModel?id=${id}`);
    } catch (error) {
      console.error("Error uploading resume:", error);
      setMessage("An error occurred while uploading the file.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen tech-gradient tech-grid overflow-hidden">
      {/* Ambient glows */}
      <div className="glow-effect bg-[#2d1b69] top-1/4 -left-20" />
      <div className="glow-effect bg-[#E2E1E6] bottom-1/4 -right-20" />

      <div className="relative min-h-screen p-4 md:p-8">
        {/* Back button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="text-[#E2E1E6]/60 hover:text-[#E2E1E6]"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto pt-12">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gradient">
              Upload Resume
            </h1>
            <p className="text-[#E2E1E6]/60 text-xl">
              Let AI optimize your career path
            </p>
            {/* ✅ Display the selected model */}
            <p className="text-lg text-indigo-400">
              Selected Model: {selectedModel}
            </p>
          </div>

          {/* Upload Card */}
          <Card className="glass-effect border-0 mx-auto max-w-md hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-[#E2E1E6] ">
                Select Your File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className="flex flex-col items-center justify-center p-8 border-2 
                      border-dashed border-[#E2E1E6]/20 rounded-xl 
                      hover:border-[#E2E1E6]/40 transition-colors"
                >
                  {/* Label wraps everything to make the whole box clickable */}
                  <label
                    htmlFor="resume"
                    className="cursor-pointer flex flex-col items-center text-center"
                  >
                    {/* Clickable Upload Icon */}
                    <Upload className="h-12 w-12 text-[#E2E1E6]/60 mb-4 hover:text-[#E2E1E6]" />

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />

                    {/* Click to Upload Text */}
                    <span className="text-[#E2E1E6]/60 hover:text-[#E2E1E6] transition-colors">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <p className="text-sm text-[#E2E1E6]/40 mt-2">
                      PDF, DOC, DOCX (max 10MB)
                    </p>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={!file || uploading}
                  className="w-full bg-gradient-to-r from-[#2d1b69] to-[#1a1a2e]
                 hover:from-[#3d2b79] hover:to-[#2a2a3e]
                 text-white border border-[#E2E1E6]/10
                 py-6 text-lg rounded-xl transition-all duration-300 
                 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,27,105,0.5)]
                 disabled:opacity-50 disabled:hover:translate-y-0
                 disabled:hover:shadow-none"
                >
                  {uploading ? "Uploading..." : "Start Your Journey"}
                </Button>
              </form>

              {message && (
                <p
                  className={`mt-4 text-sm text-center ${
                    message.includes("successfully")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
