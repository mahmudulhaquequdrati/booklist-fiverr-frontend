import React, { useEffect, useState } from "react";
import Books from "../components/Books";
import { getBooks } from "../services/apiServices";
// react icon

const Home = () => {
  const [open, setOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState("All_Books");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (currentBook === "All_Books") {
      getBooks().then((res) => {
        setBooks(res.data.message);
      });
    }
    if (currentBook === "Available") {
      getBooks({ avail: true }).then((res) => {
        setBooks(res.data.message);
      });
    }
    if (currentBook === "Checked_Out") {
      getBooks({ avail: false }).then((res) => {
        setBooks(res.data.message);
      });
    }
  }, [currentBook]);

  return (
    <div className="max-w-5xl mx-16 lg:mx-auto  mt-12 md:mt-6 rounded-lg p-4 font-sans ">
      <div className=" mb-3 bg-blue-500 text-white px-3  py-1 rounded w-fit ml-auto">
        <button onClick={() => setOpen(!open)}>Add New Book</button>
      </div>
      <div className="max-w-5xl mx-16 lg:mx-auto rounded-lg p-4 bg-blue-200 font-sans ">
        {/* all book list button*/}

        <p className="text-center text-2xl font-medium ">Books Lists</p>
        <div
          className="flex justify-start gap-4 
        ml-4 mb-2"
        >
          <button
            onClick={() => setCurrentBook("All_Books")}
            className="border px-3 py-1 rounded border-slate-400 hover:bg-green-500 hover:text-white hover:border-green-500"
          >
            All books
          </button>
          <button
            onClick={() => setCurrentBook("Available")}
            className="border px-3 py-1 rounded border-slate-400 hover:bg-green-500 hover:text-white hover:border-green-500"
          >
            Available
          </button>
          <button
            onClick={() => setCurrentBook("Checked_Out")}
            className="border px-3 py-1 rounded border-slate-400 hover:bg-green-500 hover:text-white hover:border-green-500"
          >
            Checked Out
          </button>
        </div>
        <Books
          open={open}
          setOpen={setOpen}
          books={books}
          setBooks={setBooks}
        />
      </div>
    </div>
  );
};

export default Home;
