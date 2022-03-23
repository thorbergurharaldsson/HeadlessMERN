import styles from "../styles/Articles.module.scss";

import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("https://api.horsemern.xyz/api/assignments");
  const data = await response.json();
  return data;
};

function Assignments() {
  const { data, error } = useSWR("assignments", fetcher);
  // console.log(data);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Assignments</h1>

        <div className={styles.grid}>
          {data.map((assignment, index) => (
            <div key={index} className={styles.card}>
              <h2>{assignment.title}</h2>
              {/* <h3>{assignment.description}</h3> */}
              <h3>{assignment.author}</h3>
              {/* <p>{assignment.url}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Assignments;
