import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Plus, LogOut, ExternalLink, Edit2, Trash2, Book as BookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import AddBookModal from "@/components/features/admin/AddBookModal";

interface Book {
  id: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  publishDate?: string;
}

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchBooks();
  }, [navigate]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/books");
      const formattedBooks = res.data.map((b: any) => ({
        id: b.id,
        title: b.title,
        price: b.price,
        description: b.description,
        imageUrl: b.image_url,
        publishDate: b.publish_date
      }));
      setBooks(formattedBooks);
    } catch (err: any) {
      setErrorMsg("Failed to load books. Please check backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this book?")) return;
    
    const token = localStorage.getItem("adminToken");
    const deletePromise = axios.delete(`/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.promise(deletePromise, {
      loading: "Deleting book...",
      success: () => {
        setBooks(books.filter(book => book.id !== id));
        return "Book deleted successfully";
      },
      error: "Error deleting book. Check connection."
    });
  };

  const handleSaveBook = async (book: Book) => {
    const token = localStorage.getItem("adminToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    const payload = {
      title: book.title,
      price: book.price || 0,
      description: book.description,
      image_url: book.imageUrl,
      publish_date: book.publishDate || null
    };

    const savePromise = editingBook 
      ? axios.put(`/api/books/${book.id}`, payload, config)
      : axios.post(`/api/books`, payload, config);

    toast.promise(savePromise, {
      loading: editingBook ? "Updating book..." : "Adding book...",
      success: (res) => {
        if (editingBook) {
          const updated = res.data;
          setBooks(books.map(b => (b.id === book.id ? {
            id: updated.id,
            title: updated.title,
            price: updated.price,
            description: updated.description,
            imageUrl: updated.image_url,
            publishDate: updated.publish_date
          } : b)));
          setIsModalOpen(false);
          return "Book updated successfully!";
        } else {
          const newBook = res.data;
          setBooks([{
            id: newBook.id,
            title: newBook.title,
            price: newBook.price,
            description: newBook.description,
            imageUrl: newBook.image_url,
            publishDate: newBook.publish_date
          }, ...books]);
          setIsModalOpen(false);
          return "Book added successfully!";
        }
      },
      error: (error: any) => {
        return error.response?.data?.message || error.message || "Unknown error";
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-serif font-medium text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">View Website</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-serif font-medium text-slate-900">Managed Publications</h2>
            <p className="text-slate-500 mt-1">Review and organize the books displayed in the gallery.</p>
          </div>
          <Button
            onClick={handleAddBook}
            className="rounded-full bg-slate-900 text-white hover:bg-slate-800 h-12 px-6 shadow-lg shadow-slate-200 gap-2"
          >
            <Plus className="h-5 w-5" />
            Add New Book
          </Button>
        </div>

        {errorMsg && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center justify-between">
            <p>{errorMsg}</p>
            <Button onClick={fetchBooks} variant="outline" size="sm" className="bg-white text-slate-800">Retry</Button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="h-full flex flex-col overflow-hidden border-slate-100 shadow-sm animate-pulse">
                <Skeleton className="w-full aspect-[3/4] rounded-none opacity-50" />
                <CardHeader className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent className="p-5 pt-0 flex-grow">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
                <CardFooter className="p-5 pt-0 mt-auto flex justify-end gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {books.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group h-full flex flex-col overflow-hidden border-slate-100 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 flex items-center justify-center p-4">
                    {/* Blurred Background for aesthetic depth */}
                    <div 
                      className="absolute inset-0 opacity-20 blur-xl scale-110"
                      style={{ 
                        backgroundImage: `url(${book.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&size=400&background=random&color=fff`;
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                  </div>
                  <CardHeader className="p-5">
                    <CardTitle className="text-lg font-serif font-medium text-slate-900 line-clamp-1">
                      {book.title}
                    </CardTitle>
                    <div className="text-primary font-semibold mt-1">${book.price}</div>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 flex-grow">
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {book.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 border-t border-slate-50 mt-auto flex justify-end gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditBook(book)}
                      className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteBook(book.id)}
                      className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {books.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <BookIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900">No books found</h3>
            <p className="text-slate-500 mt-2">Start by adding your first publication to the library.</p>
            <Button
              onClick={handleAddBook}
              variant="outline"
              className="mt-6 rounded-full border-slate-300"
            >
              Add Your First Book
            </Button>
          </div>
        )}
        </>
        )}
      </main>

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBook}
        editingBook={editingBook}
      />
    </div>
  );
}
