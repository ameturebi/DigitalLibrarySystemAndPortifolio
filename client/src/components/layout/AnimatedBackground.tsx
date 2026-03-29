import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Generate an array of 75 distinct glowing floating circles
const generateParticles = () => {
  return Array.from({ length: 75 }).map((_, i) => ({
    id: i,
    size: Math.random() * 35 + 10, // Small circles: 10px to 45px
    xPos: Math.random() * 100, // 0 to 100vw
    yPos: Math.random() * 100, // 0 to 100vh
    duration: Math.random() * 25 + 20, // 20s to 45s loop (Soft ambient float)
    delay: Math.random() * 2, // Tiny stagger so they are immediately visible on load
    colorIndex: Math.floor(Math.random() * 5), // Premium gradient palette
    xDrift: (Math.random() - 0.5) * 200, // Drift left or right by up to 100px
    yDrift: (Math.random() - 0.5) * 200, // Drift up or down by up to 100px
    opacityMax: Math.random() * 0.5 + 0.4, // Generates a bold opacity peak between 0.4 and 0.9
  }));
};

const colors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-teal-400",
  "bg-indigo-600",
  "bg-cyan-500"
];

export function AnimatedBackground() {
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-slate-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full shadow-[0_0_20px_rgba(0,0,0,0.15)] ${colors[particle.colorIndex]}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.xPos}%`,
            top: `${particle.yPos}%`,
          }}
          initial={{ opacity: particle.opacityMax * 0.7 }}
          animate={{
            y: [0, particle.yDrift, 0],
            x: [0, particle.xDrift, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [particle.opacityMax * 0.5, particle.opacityMax, particle.opacityMax * 0.5], // Breathes dynamically into bold colors
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Super light glass overlay to keep the text readable while the orbs float freely */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
    </div>
  );
}
