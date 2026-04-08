import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LogOut, ExternalLink, Edit2, Trash2, Book as BookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import AddBookModal from "@/components/features/admin/AddBookModal";

interface Book {
  id: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
}

const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "Meditations on Knowledge",
    price: "24.99",
    description: "An exploration of early Ethiopian philosophical thought and its modern relevance.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    title: "The Silent Scribe",
    price: "19.50",
    description: "A historical narrative documenting the lives of forgotten scholars.",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    title: "Echoes of Eternity",
    price: "29.99",
    description: "Poems and dialogues centered around the human experience and spirituality.",
    imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=400",
  }
];

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
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

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleSaveBook = (book: Book) => {
    if (editingBook) {
      setBooks(books.map(b => (b.id === book.id ? book : b)));
    } else {
      setBooks([...books, book]);
    }
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
