import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Cpu, Network } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen tech-gradient tech-grid overflow-hidden">
      {/* Ambient glows */}
      <div className="glow-effect bg-[#2d1b69] top-1/4 -left-20" />
      <div className="glow-effect bg-[#E2E1E6] bottom-1/4 -right-20" />

      {/* Code pattern background */}
      <div className="code-pattern top-10 left-10 rotate-[-10deg] text-white">
        {`function accelerateCareer() {
  const ai = new AI();
  return ai.optimize(career);
}`}
      </div>
      <div className="code-pattern bottom-10 right-10 rotate-[10deg]">
        {`async function findOpportunities() {
  await ai.analyze(resume);
  return matches.filter(perfect);
}`}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-12 max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="space-y-8 animate-[float_6s_ease-in-out_infinite]">
            {/* <h1 className="text-8xl md:text-[10rem] font-bold tracking-tight text-gradient">Quill</h1> */}
            

            {/* ✅ LinkedIn Banner Image - Optimized with Next.js Image */}
            <div className="flex justify-center items-center mt-6">
              <Image
                src="/images/Group 2.png"  // ✅ Ensure this image is in public/images/
                alt="Group 2"
                width={470}  // Adjust as needed
                height={300} // Adjust as needed
                className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              />
              
            </div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-[#E2E1E6]/80 max-w-2xl mx-auto">
            AI-Powered Career Acceleration Platform
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Link href="/upload">
              <Button
                className="group relative text-lg px-10 py-7 rounded-xl
                         bg-gradient-to-r from-[#2d1b69] to-[#1a1a2e]
                         hover:from-[#3d2b79] hover:to-[#2a2a3e]
                         text-white border border-[#E2E1E6]/10
                         transition-all duration-300 hover:-translate-y-1
                         hover:shadow-[0_0_30px_rgba(45,27,105,0.5)]"
              >
                Start Building Your Future
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
            {[
              {
                icon: Code2,
                title: "Smart Matching",
                desc: "AI-powered algorithm finds your perfect opportunities",
              },
              {
                icon: Cpu,
                title: "Automated Apply",
                desc: "Let AI handle the application process",
              },
              {
                icon: Network,
                title: "Career Analytics",
                desc: "Track and optimize your application success",
              },
            ].map((feature, i) => (
              <div key={i} className="glass-effect p-8 rounded-xl hover-glow border border-[#E2E1E6]/10">
                <feature.icon className="h-8 w-8 text-[#E2E1E6] mb-4" />
                <h3 className="text-[#E2E1E6] font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-[#E2E1E6]/60">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stats */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99%", label: "Success Rate" },
              { value: "24/7", label: "AI Support" },
              { value: "<2min", label: "Apply Time" },
              { value: "100K+", label: "Applications" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-[#E2E1E6]/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
