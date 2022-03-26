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
  return (
    <Container>
      <div>
        <Articles />
        <Assignments />
      </div>
    </Container>
  );
}
