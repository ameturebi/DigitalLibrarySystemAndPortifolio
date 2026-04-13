import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox, type MediaItem } from "../components/ui/Lightbox";
import { Navbar } from "@/components/layout/Navbar";
import { SimpleBackground } from "@/components/layout/SimpleBackground";
import { Footer } from "@/components/layout/Footer";
import { DynamicButton } from "@/components/ui/DynamicButton";
import { Play } from "lucide-react";
import { useSearchParams } from "react-router-dom";

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
    id: "9",
    type: "image",
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1600",
    title: "Global Forum 2023",
    description: "Panel discussion with international scholars.",
    category: "events"
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

const categories = ["All", "Events", "Lectures", "Books", "Community"];

// The unified primary button style derived from Explore Works
const unifiedButtonStyle = "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-slate-800 hover:bg-blue-50/50 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Create state to hold all gallery items including dynamically fetched books
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>(initialGalleryItems);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    // Fetch books from backend API
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/books");
        const formattedBooks: MediaItem[] = res.data.map((book: any) => {
          // Flag as new if created within the last 7 days
          const isNewRecord = new Date(book.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
          return {
            id: book.id,
            type: "image",
            url: book.image_url,
            title: book.title,
            description: book.description,
            category: "books",
            price: `$${book.price}`,
            isNew: isNewRecord,
            publishDate: book.publish_date
          };
        });
        
        setGalleryItems([...initialGalleryItems, ...formattedBooks]);
      } catch (err) {
        console.error("Failed to fetch books", err);
        setFetchError("Unable to load latest books at this time.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  useEffect(() => {
    if (tabParam && categories.includes(tabParam)) {
      setActiveCategory(tabParam);
      setVisibleCount(3);
    }
  }, [tabParam]);

  // Filter items based on active category
  const filteredItems = galleryItems.filter(item => 
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
    <main className="min-h-screen bg-transparent font-sans antialiased text-slate-900 relative flex flex-col">
      <SimpleBackground />
      <Navbar />
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 pt-[140px] pb-24 container max-w-7xl mx-auto px-6 flex-1">
        
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
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(3); // Reset visible count on filter change
                }}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? unifiedButtonStyle 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 hover:shadow-sm bg-transparent border border-transparent"
                }`}
              >
                <span className="relative z-10 tracking-wide">{category}</span>
              </button>
            )
          })}
        </div>

        {fetchError && (
          <div className="text-center text-red-500 mb-8 font-medium">
            {fetchError}
          </div>
        )}

        {/* Gallery Grid */}
        {isLoading && (activeCategory === "Books" || activeCategory === "All") ? (
          <div className="flex justify-center p-12"><div className="animate-pulse flex items-center justify-center p-8 text-slate-500 bg-white/50 rounded-2xl w-full max-w-sm">Loading library publications from database...</div></div>
        ) : (
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

                {/* New Badge */}
                {item.isNew && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30">
                    New
                  </div>
                )}

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/70 transition-colors duration-300 z-10 flex flex-col justify-end p-6">
                  
                  {/* Content reveals on hover */}
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75">
                    {item.category === "books" ? (
                      <>
                        <h3 className="text-white text-xl font-medium font-serif leading-tight">{item.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.price && (
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">
                              {item.price}
                            </span>
                          )}
                          {item.publishDate && (
                            <span className="inline-block px-3 py-1 bg-blue-500/60 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">
                              {new Date(item.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <p className="text-white/80 text-sm line-clamp-2 mt-3 font-light leading-relaxed">{item.description}</p>
                      </>
                    ) : (
                      <>
                        <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="text-white text-xl font-medium font-serif">{item.title}</h3>
                      </>
                    )}
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
        )}

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <DynamicButton
              onClick={handleLoadMore}
              className="h-12 px-8 rounded-full font-semibold"
            >
              Load More
            </DynamicButton>
          </motion.div>
        )}

      </div>

      <Footer />

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
