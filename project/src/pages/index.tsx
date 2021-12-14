import withAuth from "../components/withAuth";
import { useAuth } from "../hooks/useAuth";

import { generateTimeMessage } from "../services/generateTimeMessage";

import Head from "next/head";

import styles from "../styles/home.module.scss";

function Home() {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <Head>
        <title>Easy Poster | Home</title>
      </Head>
      <nav className={styles.header}>
        <h1 translate="no" className={styles.title}>
          Easy poster
        </h1>
      </nav>

      <h3>{`${generateTimeMessage()} ${
        user.displayName ? user.displayName : ""
      }`}</h3>
    </>
  );
}

export default withAuth(Home);
