import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox, type MediaItem } from "../components/ui/Lightbox";
import { Navbar } from "@/components/layout/Navbar";
import { SimpleBackground } from "@/components/layout/SimpleBackground";
import { Footer } from "@/components/layout/Footer";
import { DynamicButton } from "@/components/ui/DynamicButton";
import { Play, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SEO from "@/components/utils/SEO";

// Official Content curated for the gallery
const initialGalleryItems: MediaItem[] = [
  {
    id: "v-events-1",
    type: "video",
    url: "https://www.youtube.com/embed/EmmQvHoi5II?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/EmmQvHoi5II/maxresdefault.jpg",
    title: "Special Event Highlight",
    description: "A deep dive into community engagement and cultural preservation.",
    category: "events"
  },
  {
    id: "v-lect-1",
    type: "video",
    url: "https://www.youtube.com/embed/ACuwNYLGf8A?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/ACuwNYLGf8A/maxresdefault.jpg",
    title: "Philosophy of Living",
    description: "Lecture on the intersections of modern life and traditional values.",
    category: "lectures"
  },
  {
    id: "v-lect-2",
    type: "video",
    url: "https://www.youtube.com/embed/we0XwQeC8Wk?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/we0XwQeC8Wk/maxresdefault.jpg",
    title: "Ethical Leadership",
    description: "Insights into leadership through the lens of ethical responsibility.",
    category: "lectures"
  },
  {
    id: "v-lect-3",
    type: "video",
    url: "https://www.youtube.com/embed/CSZe4S2UvwI?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/CSZe4S2UvwI/maxresdefault.jpg",
    title: "The Path to Wisdom",
    description: "Exploring ancient texts for modern spiritual guidance.",
    category: "lectures"
  },
  {
    id: "v-lect-4",
    type: "video",
    url: "https://www.youtube.com/embed/FHZ8CAk7jDg?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/FHZ8CAk7jDg/maxresdefault.jpg",
    title: "Traditional Conversations",
    description: "Segment on cultural heritage in a rapidly evolving world.",
    category: "lectures"
  },
  {
    id: "v-lect-5",
    type: "video",
    url: "https://www.youtube.com/embed/IR6cJ90m36A?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/IR6cJ90m36A/maxresdefault.jpg",
    title: "The Power of Words",
    description: "How literature and dialogue shape our collective future.",
    category: "lectures"
  },
  {
    id: "v-lect-6",
    type: "video",
    url: "https://www.youtube.com/embed/YF-AB7OCpwA?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/YF-AB7OCpwA/maxresdefault.jpg",
    title: "Global Dialogue Forum",
    description: "Key contributions to international philosophical summits.",
    category: "lectures"
  },
  {
    id: "v-lect-7",
    type: "video",
    url: "https://www.youtube.com/embed/CY1f_HSJAow?autoplay=1",
    thumbnail: "https://img.youtube.com/vi/CY1f_HSJAow/maxresdefault.jpg",
    title: "Societal Progress Seminar",
    description: "Analyzing the foundations of growth in diverse communities.",
    category: "lectures"
  }
];

const categories = ["All", "Events", "Lectures", "Books"];

// Unified primary button style
const unifiedButtonStyle = "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-slate-800 hover:bg-blue-50/50 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // Increased default for 'display immediately'
  
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>(initialGalleryItems);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    // Fetch books from backend API
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/books");
        const formattedBooks: MediaItem[] = res.data.map((book: any) => {
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
      setVisibleCount(6);
    }
  }, [tabParam]);

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
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleLoadMore = () => {
    setIsRefreshing(true);
    // Simulate/Trigger a database sync refresh
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-transparent font-sans antialiased text-slate-900 relative flex flex-col">
      <SEO 
        title="Gallery & Literary Works | Muhammed Ali Burhan"
        description="Explore the visual and literary gallery of Muhammed Ali Burhan, including events, lectures, and published books."
      />
      <SimpleBackground />
      <Navbar />
      
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 pt-[140px] pb-24 container max-w-7xl mx-auto px-6 flex-1 text-slate-900">
        
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

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(6);
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

        {isLoading && (activeCategory === "Books" || activeCategory === "All") && galleryItems.filter(i => i.category === 'books').length === 0 ? (
          <div className="flex justify-center p-12">
            <div className="animate-pulse flex items-center justify-center p-8 text-slate-500 bg-white/50 rounded-2xl w-full max-w-sm">
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Loading library publications from database...
            </div>
          </div>
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
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {item.isNew && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30">
                    New
                  </div>
                )}

                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/70 transition-colors duration-300 z-10 flex flex-col justify-end p-6">
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
                        </div>
                        <p className="text-white/80 text-sm line-clamp-2 mt-3 font-light leading-relaxed">{item.description}</p>
                      </>
                    ) : (
                      <>
                        <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="text-white text-xl font-medium font-serif">{item.title}</h3>
                        <p className="text-white/70 text-sm line-clamp-2 mt-2 font-light">{item.description}</p>
                      </>
                    )}
                  </div>

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

        {filteredItems.length > visibleCount && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <DynamicButton
              onClick={handleLoadMore}
              disabled={isRefreshing}
              className="h-12 px-8 rounded-full font-semibold flex items-center justify-center space-x-2 mx-auto"
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading from database...</span>
                </>
              ) : (
                <span>Load More</span>
              )}
            </DynamicButton>
          </motion.div>
        )}

      </div>

      <Footer />

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
