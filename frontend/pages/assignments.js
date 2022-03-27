import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import styles from "../styles/index.module.scss";
import dateParts from "../utils/dateParts";

function Assignments() {
  const [id, setID] = useState();
  const { data, error } = useSWR("/assignments", fetcher);
  // console.log(data);
  if (error)
    return (
      <div className={styles.loading}>
        <h4>Failed to load projects</h4>
      </div>
    );
  if (!data)
    return (
      <div className={styles.loading}>
        <h4>Loading projects...</h4>
      </div>
    );

  // to get the id from the clicked article
  const getID = async (id) => {
    console.log(id);
    setID(id);
  };

  return (
    <div>
      <div className={styles.container}>
        <div>
          <div className={styles.cardContainer}>
            {data.map((assignment, index) => (
              <div key={index} className={styles.card}>
                <p>{assignment.author}</p>
                <p className={styles.pSmall}>
                  {(() => {
                    const d = dateParts(assignment.createdAt);
                    return `${d.month} ${d.day}, ${d.year}`;
                  })()}
                </p>
                <h2>{assignment.assignmentTitle}</h2>
                <h4>{assignment.moduleTitle}</h4>
                <p dangerouslySetInnerHTML={{ __html: assignment.comment }}></p>
                <button onClick={(e) => getID(e.target.value)}>
                  <option value={assignment._id}>...</option>
                </button>
                <div className={styles.tagContainer}>
                  <button className={styles.buttonTag}>Tag</button>
                  <button className={styles.buttonTag}>Tag</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;
