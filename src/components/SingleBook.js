import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteBook, getBooks, getSingleBook } from "../services/apiServices";
import { SiBookstack } from "react-icons/si";
import { IoIosContact } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import UpdateModal from "./UpdateModal";

const bookIconColors = [
  "text-red-500",
  "text-yellow-500",
  "text-green-500",
  "text-blue-500",
  "text-indigo-500",
  "text-purple-500",
  "text-pink-500",
];

const SingleBook = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleBook, setSingleBook] = useState({});
  useEffect(() => {
    getSingleBook(id).then((res) => {
      setSingleBook(res.data.message);
    });
  }, [id]);
  const randomColor =
    bookIconColors[Math.floor(Math.random() * bookIconColors.length)];

  const handleDelete = (id) => {
    deleteBook(id).then((res) => {
      if (res.status === 200) {
        getBooks().then((res) => {
          if (res.status === 200) {
            navigate("/");
          }
        });
      }
    });
  };
  return (
    <div>
      <Link to="/" className="flex justify-center mt-8 lg:mt-12 mb-2">
        <SiBookstack className={`text-6xl text-blue-500`} />
      </Link>
      <div className="bg-slate-100 rounded-lg p-4 border-2 max-w-xl mx-8 md:mx-auto mt-8">
        <h2 className="text-center text-semibold mb-6 text-lg">Book Details</h2>
        <div className="flex justify-center mb-2">
          <SiBookstack className={`text-6xl ${randomColor}`} />
        </div>

        {singleBook?.title && (
          <p className=" text-xl font-medium">{singleBook?.title}</p>
        )}

        {singleBook?.author && (
          <div className="flex items-center gap-1 mt-1">
            <IoIosContact />

            <p className=" text-sm font-medium">{singleBook?.author}</p>
          </div>
        )}

        <p
          className={` text-sm font-medium ${
            singleBook?.avail === "true" ? "bg-green-600" : "bg-red-600"
          } text-slate-100 px-2 py-[0.15rem] rounded w-fit mt-1`}
        >
          {singleBook?.avail === "true" ? "Available" : "Checked out"}
        </p>
        <div>
          {singleBook.isbn && (
            <p className=" text-sm font-medium mt-1">
              ISBN : {singleBook?.isbn}
            </p>
          )}
          {singleBook?.publisher && (
            <p className=" text-sm font-medium mt-1">
              Publisher: {singleBook?.publisher}
            </p>
          )}
          {singleBook?.who && (
            <p className=" text-sm font-medium mt-1">Who: {singleBook?.who}</p>
          )}
          {singleBook?.due && (
            <p className=" text-sm font-medium mt-1">Due: {singleBook?.due}</p>
          )}
        </div>
        <div className="mt-3 flex justify-end gap-3">
          {/* update */}
          <p
            className="bg-blue-500 rounded-md text-white px-3 cursor-pointer py-1"
            onClick={() => setOpen(!open)}
          >
            Update
          </p>
          <p
            className="bg-red-500 rounded-md text-white px-3 cursor-pointer py-1"
            onClick={() => handleDelete(singleBook?.id)}
          >
            Delete
          </p>
        </div>
        <UpdateModal
          singleBook={singleBook}
          setSingleBook={setSingleBook}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default SingleBook;
