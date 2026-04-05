import { useState, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themes = [
  "from-blue-500/20 to-purple-500/20 border-blue-500/30 text-slate-800 hover:bg-blue-50/50",
  "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-slate-800 hover:bg-purple-50/50",
  "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-slate-800 hover:bg-cyan-50/50"
];

export function DynamicButton({ className, children, ...props }: ButtonProps) {
  const [currentTheme, setCurrentTheme] = useState(0);

  useEffect(() => {
    // We update the gradient every 4s to match HeroSection
    const timer = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Button
      className={cn(
        "bg-gradient-to-r backdrop-blur-md border border-solid transition-[background-image,border-color,background-color] duration-1000",
        themes[currentTheme],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
