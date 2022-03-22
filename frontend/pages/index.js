import Link from "next/link";
import clientPromise from "../util/mongodb";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout/Layout";

export default function Home({ isConnected }) {
  return (
    <Layout>
      <div className={styles.container}>
        <main>
          <div className={styles.grid}>
            <Link href="/articles">
              <a className={styles.card}>
                <h3>Articles &rarr;</h3>
                <p>
                  Read the articles from the Vefþróun and learn more about web
                  design!
                </p>
              </a>
            </Link>

            <Link href="/assignments">
              <a className={styles.card}>
                <h3>Projects &rarr;</h3>
                <p>
                  Discover our projects and the stack we used to develop them.
                </p>
              </a>
            </Link>

            <Link href="/">
              <a className={styles.card}>
                <h3>About us &rarr;</h3>
                <p>
                  We are the students from the Reykjavík Academy of Web
                  Develop­ment, come meet us!
                </p>
              </a>
            </Link>

            <Link href="/">
              <a className={styles.card}>
                <h3>Documentation &rarr;</h3>
                <p>
                  You want to know how this website was developed and how we
                  built our backend? Follow this link!
                </p>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let isConnected;
  try {
    const client = await clientPromise;
    isConnected = true;
  } catch (e) {
    console.log(e);
    isConnected = false;
  }

  return {
    props: { isConnected },
  };
}
