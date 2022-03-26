import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import Link from "next/link";
import styles from "../styles/index.module.scss";
import dateParts from "../utils/dateParts";

import Container from "../components/Container/Container";

import Articles from "./articles";
import Assignments from "./assignments";

export default function Home() {
  const { data: articles } = useSWR("/articles", fetcher);
  const { data: assignments } = useSWR("/assignments", fetcher);
  const array1 = [{ articles }];
  const array2 = [{ assignments }];
  const fusion = array1.concat(array2);
  console.log(fusion);

  if (!articles) return <div>Loading...</div>;
  if (!assignments) return <div>Loading...</div>;

  return (
    <Container>
      <div>
        <Articles />
        <Assignments />
      </div>
    </Container>
  );
}
