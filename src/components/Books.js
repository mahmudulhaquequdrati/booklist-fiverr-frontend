import React from "react";
import { SiBookstack } from "react-icons/si";
import { IoIosContact } from "react-icons/io";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const bookIconColors = [
  "text-red-500",
  "text-yellow-500",
  "text-green-500",
  "text-blue-500",
  "text-indigo-500",
  "text-purple-500",
  "text-pink-500",
];

const Books = ({ open, setOpen, books, setBooks }) => {
  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <div className="mt-4 px-2 md:px-4 mb-4">
      {/* add a new book buttton */}

      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          handleModal={handleModal}
          setBooks={setBooks}
        />
      )}

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {books.map((book) => {
          const randomColor =
            bookIconColors[Math.floor(Math.random() * bookIconColors.length)];
          return (
            <Link
              to={`/books/${book?.id}`}
              className="bg-slate-100 rounded-lg p-4"
              key={book?.id}
            >
              <div className="flex justify-center mb-2">
                <SiBookstack className={`text-6xl ${randomColor}`} />
              </div>

              <p className=" text-xl font-medium">{book?.title}</p>

              {book?.author && (
                <div className="flex items-center gap-1 mt-1">
                  <IoIosContact />
                  <p className=" text-sm font-medium">{book?.author}</p>
                </div>
              )}
              <p
                className={` text-sm font-medium ${
                  book?.avail === "true" ? "bg-green-600" : "bg-red-600"
                } text-slate-100 px-2 py-[0.15rem] rounded w-fit mt-1`}
              >
                {book?.avail === "true" ? "Available" : "Checked out"}
              </p>
              {book?.isbn && (
                <div>
                  <p className=" text-sm font-medium mt-1">
                    ISBN : {book?.isbn}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
