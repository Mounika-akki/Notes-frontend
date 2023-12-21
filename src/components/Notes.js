import React, { useState } from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import CreateNote from "./CreateNote";
const Notes = ({ setIsLoggedIn }) => {
  const [note, setNote] = useState(null);
  return (
    <BrowserRouter>
      <NavBar setIsLoggedIn={setIsLoggedIn} note={note} setNote={setNote} />
      <Routes>
        <Route path="/" element={<Home setNote={setNote} />} />
        <Route
          path="/note"
          element={<CreateNote note={note} setNote={setNote} />}
          exact
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Notes;
