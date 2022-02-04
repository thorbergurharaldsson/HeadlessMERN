import Head from "next/head";

// import { connectToDatabase } from '../util/mongodb'
import clientPromise from "../util/mongodb";

export default function Home({ isConnected }) {
  return (
    <div>
      <div className="container">
        {/* <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}

        <main>
          {/* <h1 className="title">Welcome to Studio Live .</h1> */}

          {/* {isConnected ? (
            <h2 className="description">
              You are connected to the HeadlessMERN
            </h2>
          ) : (
            <h2 className="subtitle">
              You are NOT connected to the HeadlessMERN. Check the{" "}
              <code>README.md</code> for instructions.
            </h2>
          )} */}

          {/* <p className="description">
            Get started by editing <code>pages/index.js</code>
          </p> */}

          <div className="grid">
            <a href="/articles" className="card">
              <h3>Articles &rarr;</h3>
              <p>
                Read the articles from the Vefþróun and learn more about web
                design!
              </p>
            </a>

            <a href="/assignments" className="card">
              <h3>Projects &rarr;</h3>
              <p>
                Discover our projects and the stack we used to develop them.
              </p>
            </a>

            <a href="/" className="card">
              <h3>About us &rarr;</h3>
              <p>
                We are the students from the Reykjavík Academy of Web
                Develop­ment, come meet us!
              </p>
            </a>

            <a href="/" className="card">
              <h3>Documentation &rarr;</h3>
              <p>
                You want to know how this website was developed and how we built
                our backend? Follow this link!
              </p>
            </a>
          </div>
        </main>

        {/* <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/logo.png" alt="Vercel Logo" className="logo" />
          </a>
        </footer> */}

        <style jsx>{`
          .container {
            // min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            // padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .subtitle {
            font-size: 2rem;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .logo {
            height: 1em;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </div>
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
