import { motion } from "framer-motion";

export function SimpleBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#fafafa] pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-100/50 blur-[120px]"
      />
    </div>
  );
}
