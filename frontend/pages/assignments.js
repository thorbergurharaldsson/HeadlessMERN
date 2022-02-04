import { connectToDatabase } from "../util/mongodb";
import articleStyles from "../styles/Articles.module.css";

const Assignments = ({ assignments }) => {
  return (
    <div className={articleStyles.container}>
      <main className={articleStyles.main}>
        <h1 className={articleStyles.title}>Assignments</h1>

        <div className={articleStyles.grid}>
          {assignments.map((assignment, index) => (
            <div key={index} className={articleStyles.card}>
              <h2>{assignment.title}</h2>
              {/* <h3>{assignment.description}</h3> */}
              <h3>{assignment.author}</h3>
              {/* <p>{assignment.url}</p> */}
            </div>
          ))}
        </div>
      </main>
    </div>
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
