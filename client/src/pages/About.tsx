import { Navbar } from "@/components/layout/Navbar";
import { SimpleBackground } from "@/components/layout/SimpleBackground";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  return (
    <main className="min-h-screen font-sans antialiased text-slate-900 relative flex flex-col">
      <SimpleBackground />
      <Navbar />
      
      {/* 
        This is a placeholder for the teammate's work on the About page.
        They can replace this container's content with their actual logic.
      */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-12">
        <div className="text-center space-y-4 max-w-2xl px-6">
          <h1 className="text-4xl font-serif font-medium text-slate-800">About</h1>
          <p className="text-slate-500 font-light text-lg">
            This page is currently under development by the team.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
