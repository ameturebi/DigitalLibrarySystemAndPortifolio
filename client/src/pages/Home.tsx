import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/features/HeroSection";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-full h-screen font-sans antialiased text-slate-900 relative bg-transparent overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      
      {/* 
        CRITICAL BACKGROUND RENDER 
        Locked using fixed so it persists while scrolling.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 w-full min-h-screen snap-start flex flex-col">
        <HeroSection />
      </div>

      {/* About Section Placeholder */}
      <div id="about-section" className="relative z-10 w-full min-h-screen snap-start flex items-center justify-center bg-white/40 backdrop-blur-sm">
        <div className="text-center space-y-4 max-w-2xl px-6">
          <h2 className="text-4xl font-serif font-medium text-slate-800">About</h2>
          <p className="text-slate-600 text-lg">
            (Teammate: Replace this content with the About section logic)
          </p>
        </div>
      </div>

      {/* Gallery Highlight Section */}
      <div id="gallery-section" className="relative z-10 w-full min-h-screen snap-start flex items-center justify-center bg-slate-50/80 backdrop-blur-sm py-24">
        <div className="text-center space-y-8 max-w-4xl px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight">Featured Works</h2>
          <p className="text-slate-600 font-light text-lg">
            A curated selection of thoughts, dialogues, and historical texts.
          </p>
          <div className="pt-8 flex justify-center">
            <Link to="/gallery" className="inline-block">
              <button className="h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-slate-800 hover:bg-blue-50/50 backdrop-blur-md flex items-center justify-center w-full">
                Enter Full Gallery
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 snap-start">
        <Footer />
      </div>

    </main>
  );
}
