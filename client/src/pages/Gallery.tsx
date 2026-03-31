import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox, type MediaItem } from "../components/ui/Lightbox";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

// Premium Curated Unsplash Images for immediate beautiful rendering
const initialGalleryItems: MediaItem[] = [
  {
    id: "1",
    type: "video",
    url: "https://www.youtube.com/embed/ACuwNYLGf8A?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/ACuwNYLGf8A/maxresdefault.jpg",
    title: "Philosophy of Dialogue",
    description: "An open discussion on social engagement and core principles.",
    category: "lectures"
  },
  {
    id: "2",
    type: "image",
    url: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1600",
    title: "Keynote Talk",
    description: "Annual summit discussing modern societal paradigms.",
    category: "events"
  },
  {
    id: "3",
    type: "video",
    url: "https://www.youtube.com/embed/CSZe4S2UvwI?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/CSZe4S2UvwI/maxresdefault.jpg",
    title: "Spiritual Ethics Seminar",
    description: "Exploring the boundaries of moral philosophy.",
    category: "lectures"
  },
  {
    id: "4",
    type: "image",
    url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1600",
    title: "Literary Collection",
    description: "Exploring historical texts and author's original manuscripts.",
    category: "writing"
  },
  {
    id: "5",
    type: "video",
    url: "https://www.youtube.com/embed/FHZ8CAk7jDg?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/FHZ8CAk7jDg/maxresdefault.jpg",
    title: "The Essence of Wisdom",
    description: "A profound segment on traditional values in modern times.",
    category: "lectures"
  },
  {
    id: "6",
    type: "image",
    url: "https://images.unsplash.com/photo-1523580494112-071dcb641c7b?auto=format&fit=crop&q=80&w=1600",
    title: "Community Outreach",
    description: "Empowering local youth through direct engagement.",
    category: "community"
  },
  {
    id: "7",
    type: "video",
    url: "https://www.youtube.com/embed/Azg0epi5SRw?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/Azg0epi5SRw/maxresdefault.jpg",
    title: "Community Leadership Talk",
    description: "Discussing strategies for effective leadership.",
    category: "community"
  },
  {
    id: "8",
    type: "image",
    url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1600",
    title: "Book Signing",
    description: "Meet and greet during the launch of the latest publication.",
    category: "writing"
  },
  {
    id: "9",
    type: "image",
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1600",
    title: "Global Forum 2023",
    description: "Panel discussion with international scholars.",
    category: "events"
  },
  {
    id: "10",
    type: "image",
    url: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=1600",
    title: "Study Retreat",
    description: "Focus and deep reading session.",
    category: "writing"
  },
  {
    id: "11",
    type: "image",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
    title: "Technology & Humanity",
    description: "Bridging the gap between code and philosophical limits.",
    category: "events"
  },
  {
    id: "12",
    type: "image",
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1600",
    title: "Corporate Seminar",
    description: "Advising enterprise leadership on morale and ethics.",
    category: "community"
  }
];

const categories = ["All", "Events", "Lectures", "Writing", "Community"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter items based on active category
  const filteredItems = initialGalleryItems.filter(item => 
    activeCategory === "All" || item.category === activeCategory.toLowerCase()
  );

  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleOpenLightbox = (item: MediaItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Allow exit animation to finish
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans antialiased text-slate-900 relative">
      <Navbar />
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 pt-[140px] pb-24 container max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6 font-serif">
            Gallery
          </h1>
          <p className="text-lg text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
            Moments, events, and contributions of Mohammed Ali Burhan
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(6); // Reset visible count on filter change
              }}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? "text-primary" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 tracking-wide">{category}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => handleOpenLightbox(item)}
              >
                {/* Thumbnail */}
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300 z-10 flex flex-col justify-end p-6">
                  
                  {/* Content reveals on hover */}
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75">
                    <span className="text-primary-100/80 text-xs font-semibold uppercase tracking-wider mb-2 block text-white/80">
                      {item.category}
                    </span>
                    <h3 className="text-white text-xl font-medium font-serif">{item.title}</h3>
                  </div>

                  {/* Play Icon indicator for videos */}
                  {item.type === "video" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <Play className="w-5 h-5 text-white ml-1 fill-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="rounded-full px-8 h-12 border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-all duration-300"
            >
              Load More
            </Button>
          </motion.div>
        )}

      </div>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
         <Lightbox
           isOpen={isLightboxOpen}
           item={selectedItem}
           onClose={handleCloseLightbox}
         />
      )}

    </main>
  );
}
