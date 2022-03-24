import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import styles from "../styles/Articles.module.scss";

function Assignments() {
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
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Assignments</h1>

        <div className={styles.grid}>
          {data.map((assignment, index) => (
            <div key={index} className={styles.card}>
              <h2>{assignment.assignmentTitle}</h2>
              {/* <h3>{assignment.description}</h3> */}
              <h3>{assignment.author}</h3>
              {/* <p>{assignment.url}</p> */}
              <button onClick={(e) => getID(e.target.value)}>
                <option value={assignment._id}>Button</option>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Assignments;
