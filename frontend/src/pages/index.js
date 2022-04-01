import React from "react";

import Container from "../components/Container/Container";
import Content from "../components/Content/Content";
import Nav from "../components/Nav/Nav";
import Header from "../components/Header/Header";
import { horsemernAPI } from "../utils/api";

export default function Home({ dataArr, articles, assignments }) {
  return (
    <div>
      <Container>
        <Nav />
        <Header />
      </Container>
      <Container>
        <Content
          dataArr={dataArr}
          articles={articles}
          assignments={assignments}
        />
      </Container>
    </div>
  );
}

// use getServerSideProps() to get articles and assignments and concatenate them
export const getServerSideProps = async () => {
  const { data: assignments } = await horsemernAPI.get("/assignments");
  const { data: articles } = await horsemernAPI.get("/articles");
  const concatArr = assignments.concat(articles.data).sort((a, b) => {
    return (
      new Date(b.posted_at || b.createdAt) -
      new Date(a.posted_at || a.createdAt)
    );
  });
  return {
    props: {
      dataArr: concatArr,
      assignments: assignments,
      articles: articles.data,
      testing: "testing",
    },
  };
};
