import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/features/HeroSection";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

export default function Home() {
  return (
    <main className="w-full min-h-screen font-sans antialiased text-slate-900 overflow-x-hidden relative bg-transparent">
      
      {/* 
        CRITICAL BACKGROUND RENDER 
        Locked at z-0, meaning it will absolutely render under all z-10 content.
      */}
      <AnimatedBackground />

      {/* Main Page Content - Wrapper ensures background shows through */}
      <div className="relative z-10 w-full h-full bg-transparent">
        <Navbar />
        <HeroSection />
        <section id="about" className="h-48 border-t border-slate-200/20 bg-transparent flex items-center justify-center text-slate-500">
            [ Biography Section Mapping ]
        </section>
      </div>

    </main>
  );
}
