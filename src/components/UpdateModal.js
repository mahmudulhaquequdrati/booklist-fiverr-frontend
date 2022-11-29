import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getSingleBook, updateBook } from "../services/apiServices";

const UpdateModal = ({ open, setOpen, singleBook, setSingleBook }) => {
  const cancelButtonRef = useRef(null);
  const [form, setForm] = useState({
    ...singleBook,
  });

  const hangleAddBook = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const updateData = () => {
    //  validate whether there is a title and available
    // if there is a title and available then add the book to the database
    // if not then show an error message

    if (
      form.title !== undefined ||
      form.title !== "" ||
      form.avail !== undefined ||
      form.avail !== "" ||
      form.author !== undefined ||
      form.author !== "" ||
      form.publisher !== undefined ||
      form.publisher !== "" ||
      form.isbn !== undefined ||
      form.isbn !== "" ||
      form.who !== undefined ||
      form.who !== "" ||
      form.due !== undefined ||
      form.due !== ""
    ) {
      if (form.avail === "false") {
        if (
          form.who === undefined ||
          form.who === "" ||
          form.due === undefined ||
          form.due === ""
        ) {
          alert("Please fill in the who and due date");
          return;
        } else {
          updateBook(singleBook.id, form).then((res) => {
            if (res.status === 200) {
              getSingleBook(singleBook.id).then((res) => {
                if (res.status === 200) {
                  setSingleBook(res.data.message);
                  setOpen(false);
                }
              });
            }
          });

          return;
        }
      }
      updateBook(singleBook.id, form).then((res) => {
        if (res.status === 200) {
          getSingleBook(singleBook.id).then((res) => {
            if (res.status === 200) {
              setSingleBook(res.data.message);
              setOpen(false);
            }
          });
        }
      });
    } else {
      // show an error message

      alert("Please fill at least one field!");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-800"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-600"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="pt-6 flex ">
                  <div className="bg-white px-4   ">
                    <label htmlFor="id" className="block px-3 pb-2 text-sm">
                      Title *
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="title"
                      name="title"
                      placeholder="Ex: The Final Empire"
                      onChange={(e) => hangleAddBook(e)}
                    />
                  </div>
                  <div className="bg-white px-4 ">
                    <label htmlFor="author" className="block px-3 pb-2 text-sm">
                      Author (optional)
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="author"
                      name="author"
                      onChange={(e) => hangleAddBook(e)}
                      placeholder="Ex: The Magic"
                    />
                  </div>
                  {/* <div className="bg-white px-4   ">
                    <label htmlFor="id" className="block px-3 pb-2 text-sm">
                      ID *
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="id"
                      name="id"
                      onChange={(e) => hangleAddBook(e)}
                      placeholder="Ex: The Magic"
                    />
                  </div> */}
                </div>
                <div className="pt-3 flex ">
                  <div className="bg-white px-4   ">
                    <label
                      htmlFor="available"
                      className="block px-3 pb-2 text-sm"
                    >
                      Available
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="available"
                      name="avail"
                      onChange={(e) => hangleAddBook(e)}
                      placeholder="Ex: True"
                    />
                  </div>
                  <div className="bg-white px-4   ">
                    <label htmlFor="isbn" className="block px-3 pb-2 text-sm">
                      ISBN (optional)
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="isbn"
                      name="isbn"
                      onChange={(e) => hangleAddBook(e)}
                      placeholder="Ex: The Final Empire"
                    />
                  </div>
                </div>
                <div className="pt-3 flex ">
                  <div className="bg-white px-4   ">
                    <label
                      htmlFor="publisher"
                      className="block px-3 pb-2 text-sm"
                    >
                      Publisher (optional)
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="publisher"
                      name="publisher"
                      onChange={(e) => hangleAddBook(e)}
                      placeholder="Ex: True"
                    />
                  </div>
                  <div className="bg-white px-4   ">
                    <label htmlFor="who" className="block px-3 pb-2 text-sm">
                      Who (optional)
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="who"
                      name="who"
                      onChange={(e) => hangleAddBook(e)}
                      placeholder="Ex: The Final Empire"
                    />
                  </div>
                </div>
                <div className="flex pt-3">
                  <div className="bg-white px-4  ">
                    <label htmlFor="due" className="block px-3 pb-2 text-sm">
                      Due (optional)
                    </label>
                    <input
                      className="inline-flex w-full justify-center rounded-md border border-transparent border-blue-600 px-4 py-2 text-base font-medium  shadow-sm hover:border-blue-700 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      id="due"
                      name="due"
                      onChange={(e) => hangleAddBook(e)}
                      placeholder="Ex: The Final Empire"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={updateData}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateModal;
