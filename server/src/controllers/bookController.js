const supabase = require('../config/supabaseClient');

// @desc    Get all books - Everyone can read list (SELECT)
const getBooks = async (req, res, next) => {
  try {
    
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new book - (INSERT)
const createBook = async (req, res, next) => {
  const { title, description, price, image_url, publish_date } = req.body;
  
  try {
    const { data, error } = await req.supabaseClient
      .from('books')
      .insert([{ title, description, price, image_url, publish_date }])
      .select(); 
      
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a book - (UPDATE)
const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, image_url, publish_date } = req.body;

  try {
    const { data, error } = await req.supabaseClient
      .from('books')
      .update({ title, description, price, image_url, publish_date })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
      res.status(404);
      throw new Error('Book not found');
    }
    
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a book - (DELETE)
const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data, error } = await req.supabaseClient
      .from('books')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
      res.status(404);
      throw new Error('Book not found');
    }
    
    res.json({ message: 'Book deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook
};
