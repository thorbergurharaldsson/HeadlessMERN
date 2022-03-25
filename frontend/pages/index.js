import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import Link from "next/link";
import styles from "../styles/index.module.scss";

import Container from "../components/Container/Container";

export default function Home() {
  const [id, setID] = useState();
  const { data, error } = useSWR("/assignments", fetcher);
  // console.log(data);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // to get coords to pass it into another API to get the weather
  const getID = async (id) => {
    // console.log(id);
    setID(id);
  };
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.main}>
          <div>
            <div className={styles.cardContainer}>
              {data.slice(0, 3).map((assignment, index) => (
                <div key={index} className={styles.card}>
                  <p>{assignment.author}</p>
                  <p className={styles.pSmall}>Mar 15, 2022</p>
                  <h1>{assignment.assignmentTitle}</h1>
                  {/* <h3>{assignment.description}</h3> */}
                  <h4>{assignment.author}</h4>
                  <p
                    dangerouslySetInnerHTML={{ __html: assignment.comment }}
                  ></p>
                  <button onClick={(e) => getID(e.target.value)}>
                    <option value={assignment._id}>...</option>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
