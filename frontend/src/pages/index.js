import React from "react";

import Container from "../components/Container/Container";
import Content from "../components/Content/Content";
import Nav from "../components/Nav/Nav";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <div>
      <Container>
        <Nav />
        <Header />
      </Container>
      <Container>
        <Content />
      </Container>
    </div>
  );
}
