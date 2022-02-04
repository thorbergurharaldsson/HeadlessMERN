// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/firebase/Login";
import Register from "./routes/firebase/Register";
import Reset from "./routes/firebase/Reset";
import Dashboard from "./routes/firebase/Dashboard";
import Home from "./routes/home/Home";
import Studio from "./routes/studio/Studio";
import Article from "./routes/article/Article";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="studio/*" element={<Studio />} />
          <Route path="article/:id" element={<Article />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
