import Head from "next/head";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useRouter } from "next/router";

import styles from "../styles/404.module.scss";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>Not found 404 | Easy Poster</Head>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>
        This route does not exists, return to the application!
      </p>
      <button className={styles.goBackWrapper} onClick={() => router.back()}>
        <FaArrowAltCircleLeft className={styles.arrowLeft} />
        <span>Go back</span>
      </button>
    </>
  );
}
