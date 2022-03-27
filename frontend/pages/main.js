import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import Link from "next/link";
import styles from "../styles/index.module.scss";
import dateParts from "../utils/dateParts";

import Container from "../components/Container/Container";

import Articles from "./articles";
import Assignments from "./assignments";

export default function Main() {
  return (
    <Container>
      <div id="main" className={styles.main}>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Search</button>
          <button className={styles.button}>Browse by</button>
        </div>
        <div>
          <Articles />
          <Assignments />
        </div>
      </div>
    </Container>
  );
}
