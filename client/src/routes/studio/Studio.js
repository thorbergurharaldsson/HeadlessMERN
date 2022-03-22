import { Routes, Route, Navigate } from "react-router-dom";

import Articles from "./articles/Articles";
import Assignments from "./assignments/Assignments";
import Layout from "./components/layout/Layout";
import Article from "./article/Article";
import NewArticle from "./articles/new-article/NewArticle";
import ProtectedRoute from "../../utils/protectedRoute";

const Studio = () => {
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

export default ProtectedRoute(Studio);
