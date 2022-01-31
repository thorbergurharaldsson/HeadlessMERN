import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import Studio from "./routes/studio/Studio";
import Article from "./routes/article/Article";
import fire from "./fire";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  const signOut = () => {
    fire.auth().signOut();
  };

  console.log(isLoggedIn);
  return (
    <div className="App">
      <Router>
        {!isLoggedIn ? (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </>
        ) : (
          <>
            <span onClick={signOut}>
              <a href="/">Sign out</a>
            </span>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="studio/*" element={<Studio />} />
              <Route path="article/:id" element={<Article />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}
