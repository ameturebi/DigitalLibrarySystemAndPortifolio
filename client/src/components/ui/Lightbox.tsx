import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ExternalLink } from "lucide-react";
import { useEffect } from "react";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category: string;
  price?: string;
  isNew?: boolean;
  publishDate?: string;
};

interface LightboxProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ item, isOpen, onClose }: LightboxProps) {
  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="relative w-full max-w-5xl max-h-full flex flex-col items-center bg-transparent"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
          >
            <div className="relative w-full rounded-lg overflow-hidden flex justify-center bg-black/40 shadow-2xl">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1542382103-11b3345de862?auto=format&fit=crop&q=80&w=1200`; // Fallback placeholder
                  }}
                />
              ) : (
                <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                  {item.url.includes("youtube.com") || item.url.includes("youtu.be") ? (
                    <iframe
                      src={item.url}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    ></iframe>
                  ) : (
                    <>
                      <img
                        src={item.thumbnail || item.url}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      <div className="z-10 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer hover:scale-105 transition-transform">
                        <Play className="w-10 h-10 text-white fill-white ml-2" />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center max-w-2xl px-4"
            >
              <h3 className="text-2xl font-serif text-white mb-2 tracking-wide">{item.title}</h3>
              {item.publishDate && (
                <div className="text-blue-300 text-sm font-medium mb-3 tracking-widest uppercase">
                  Published: {new Date(item.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
              {item.description && (
                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              )}

              {item.type === "video" && (
                <a 
                  href={item.url.replace("embed/", "watch?v=").split("?")[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 shadow-lg shadow-red-900/20 font-medium group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
