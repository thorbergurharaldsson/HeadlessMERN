import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/auth/login";
import Home from "./routes/home/Home";
import Studio from "./routes/studio/Studio";
import Article from "./routes/article/Article";
import { AuthProvider } from "./utils/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="studio/*" element={<Studio />} />
          <Route path="article/:id" element={<Article />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
