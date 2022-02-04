import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, signInWithTskoli } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import Articles from "./articles/Articles";
import Assignments from "./assignments/Assignments";
import Layout from "./components/layout/Layout";
import Article from "./article/Article";
import NewArticle from "./new-article/NewArticle";

const Studio = () => {
  const [tUser, setTuser] = useState({});
  const useAuth = useAuthState(auth);
  const user = tUser || useAuth[0]
  const navigate = useNavigate();

  useEffect(() => {
    signInWithTskoli().then(r=>setTuser);
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="articles" />} />
        <Route path="articles/new-article" element={<NewArticle />} />
        <Route path="articles/:id" element={<Article />} />
        <Route path="articles" element={<Articles />} />
        <Route path="assignments" element={<Assignments />} />
      </Routes>
    </Layout>
  );
};

export default Studio;
