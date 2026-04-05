import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slideData = [
  {
    image: "/src/assets/hero-1.png",
    subtitle: "Ethiopian Philosopher & Author",
    theme: "from-blue-500/20 to-purple-500/20 border-blue-500/30 text-slate-800 hover:bg-blue-50/50",
  },
  {
    image: "/src/assets/hero-2.png",
    subtitle: "Passionate Speaker & Thought Leader",
    theme: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-slate-800 hover:bg-purple-50/50",
  },
  {
    image: "/src/assets/hero-3.png",
    subtitle: "Extensive Digital Archive",
    theme: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-slate-800 hover:bg-cyan-50/50",
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 4000); // Shift every 4s for smoother engagement
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-auto min-h-[calc(100vh-80px)] mt-[80px] bg-transparent flex items-center justify-center py-8 lg:py-0 overflow-hidden">

      {/* Container spacing setup over the invisible background overlay */}
      <div className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-16 h-full">

        {/* Left Side: Text Structure */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium text-slate-900 leading-[1.1] tracking-tight">
            Mohammed Ali <br className="hidden md:block" />
            <span className="font-serif italic font-light text-slate-700">(Burhan)</span>
          </h1>

          {/* Dynamic Subtitle Component */}
          <div className="h-10 relative w-full flex justify-center md:justify-start">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-xl text-primary font-medium absolute"
              >
                {slideData[currentSlide].subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="pt-4 drop-shadow-sm">
            <Link to="/gallery">
              <Button
                size="lg"
                className={`h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r backdrop-blur-md border border-solid ${slideData[currentSlide].theme}`}
              >
                Explore Works
              </Button>
            </Link>
          </div>

          {/* Dots Navigation */}
          <div className="flex space-x-3 pt-4">
            {slideData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-10 bg-slate-800" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side: bounded responsive image container */}
        <div className="flex-1 w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[320px] sm:max-w-sm lg:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slideData[currentSlide].image}
                alt="Portrait of Mohammed Ali Burhan"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Burhan+Image+${currentSlide + 1}&size=800&background=random&color=fff&font-size=0.1`;
                }}
              />
            </AnimatePresence>

            {/* Gradient overlay for aesthetic pop on images */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
