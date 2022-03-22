import { connectToDatabase } from "../util/mongodb";
import styles from "../styles/Articles.module.scss";
import Layout from "../components/Layout/Layout";

const Assignments = ({ assignments }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Assignments</h1>

          <div className={styles.grid}>
            {assignments.map((assignment, index) => (
              <div key={index} className={styles.card}>
                <h2>{assignment.title}</h2>
                {/* <h3>{assignment.description}</h3> */}
                <h3>{assignment.author}</h3>
                {/* <p>{assignment.url}</p> */}
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Assignments;

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const assignments = await db
    .collection("assignments")
    .find({})
    // .sort({ metacritic: -1 })
    .toArray();

  return {
    props: {
      assignments: JSON.parse(JSON.stringify(assignments)),
    },
  };
}
