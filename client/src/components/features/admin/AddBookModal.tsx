import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Book {
  id: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  publishDate?: string;
}

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  editingBook: Book | null;
}

export default function AddBookModal({
  isOpen,
  onClose,
  onSave,
  editingBook,
}: AddBookModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setPrice(editingBook.price);
      setDescription(editingBook.description);
      setImageUrl(editingBook.imageUrl);
      setPublishDate(editingBook.publishDate || "");
    } else {
      setTitle("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setPublishDate("");
    }
  }, [editingBook, isOpen]);

  const handleSave = () => {
    onSave({
      id: editingBook?.id || Date.now().toString(),
      title,
      price,
      description,
      imageUrl,
      publishDate,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-white/20 bg-white/90 backdrop-blur-xl max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-medium">
            {editingBook ? "Edit Book" : "Add New Book"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {editingBook ? "Update the details of your book here." : "Enter the details for your new book here."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Book Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Philosophy of Being"
              className="bg-white/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="29.99"
              className="bg-white/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input
              id="publishDate"
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="bg-white/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="bg-white/50"
            />
          </div>
          <div className="grid gap-2">
            <Label>Or Upload Image</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/50 border-slate-300 hover:bg-slate-50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-slate-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-slate-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                  </div>
                  <input 
                    id="imageUpload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImageUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              
              {imageUrl && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
                  <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider font-bold bg-white/80 px-2 py-0.5 rounded text-slate-500">Preview</span>
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="h-full w-full object-contain drop-shadow-md"
                  />
                  <button 
                    onClick={() => setImageUrl("")}
                    className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief summary of the book..."
              className="bg-white/50 min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
          >
            {editingBook ? "Save Changes" : "Add Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
