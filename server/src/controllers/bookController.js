const supabase = require('../config/supabaseClient');

// @desc    Get all books - Everyone can read list (SELECT)
const getBooks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new book - (INSERT)
const createBook = async (req, res) => {
  const { title, description, price, image_url } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('books')
      .insert([{ title, description, price, image_url }])
      .select(); 
      
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book - (UPDATE)
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('books')
      .update({ title, description, price, image_url })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Book not found' });
    
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a book - (DELETE)
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Book not found' });
    
    res.json({ message: 'Book deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook
};
