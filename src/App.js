import React from "react";
import { Route, Routes } from "react-router-dom";
import SingleBook from "./components/SingleBook";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
