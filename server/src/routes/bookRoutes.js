const express = require('express');
const router = express.Router();
const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// Anyone can view books, but you MUST be an admin (logged in) to Create
router.route('/')
  .get(getBooks)
  .post(protect, createBook); 

// You MUST be an admin (logged in via token) to Edit or Delete
router.route('/:id')
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
