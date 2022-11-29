import axios from "axios";

axios.defaults.baseURL = "https://book-list.onrender.com";

// get all the books'
export const getBooks = async (params) => {
  if (params) {
    return await axios.get("/books", { params });
  }
  return await axios.get("/books");
};

export const getSingleBook = async (bookId) => {
  return await axios.get(`/books/${bookId}`);
};

export const addBook = async (book) => {
  return await axios.post("/books", book);
};

export const updateBook = async (bookId, book) => {
  return await axios.put(`/books/${bookId}`, book);
};

export const deleteBook = async (bookId) => {
  return await axios.delete(`/books/${bookId}`);
};
