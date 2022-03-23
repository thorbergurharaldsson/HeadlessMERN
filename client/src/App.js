import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./routes/auth";
import Index from "./routes/Index";
import Studio from "./routes/studio/Studio";
import { AuthProvider } from "./utils/authContext";
import "./styles/globals.scss";

function App() {
  return (
    <AuthProvider>
      <div id="loading-screen" />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="auth/*" element={<Auth />} />
          <Route path="studio/*" element={<Studio />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
