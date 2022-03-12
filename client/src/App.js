import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./routes/auth";
import Index from "./routes/Index";
import Home from "./routes/home/Home";
import Studio from "./routes/studio/Studio";
import Article from "./routes/article/Article";
import { AuthProvider } from "./utils/authContext";
import "./styles/globals.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="auth/*" element={<Auth />} />
          <Route path="studio/*" element={<Studio />} />
          <Route path="article/:id" element={<Article />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
