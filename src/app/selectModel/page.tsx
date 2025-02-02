"use client";

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"


const models = [
    { id: "gpt-4", name: "GPT-4", description: "Most powerful model, best for complex reasoning and accuracy.", speed: "Fast" },
    { id: "deepseek", name: "DeepSeek", description: "Efficient and cost-effective, strong in multilingual tasks.", speed: "Fast" },
    { id: "claude", name: "Claude", description: "Great for analytical thinking and long-form responses.", speed: "Standard" },
    { id: "llama", name: "LLaMA", description: "Open-source alternative.", speed: "Very Fast" },
  ]

export default function SelectModelPage() {
    const router = useRouter()

    const handleSelectModel = (modelId: string) => {
        router.push(`/applying?modelID=${modelId}`) //actually updates the url
        
    

    }


  return (
    <div className="min-h-screen fintech-gradient grid-pattern relative overflow-hidden">
      <Link href="/">
        <Button variant="ghost" className="text-gray-400 hover:text-white">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">Quill</h1>
          <p className="text-xl text-gray-400">Select your preferred AI model</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {models.map((model) => (
            <button key={model.id} className="gradient-border rounded-xl hover-glow transition-all duration-300" onClick={() => handleSelectModel(model.id)}>
              <div className="bg-[#1A1A2E] p-6 rounded-xl h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{model.name}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                    {model.speed}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{model.description}</p>
              </div>
            </button>
          ))}
        </div> 
      </div>
    </div>
  )
}