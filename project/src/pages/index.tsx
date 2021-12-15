import { useAuth } from "../hooks/useAuth";
import { MdAdd } from "react-icons/md";
import Link from "next/link";

import withAuth from "../components/withAuth";

import { generateTimeMessage } from "../services/generateTimeMessage";
import { AiOutlineFileAdd } from "react-icons/ai";

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

        <button className={styles.addPostButton}>
          <Link href={"/posts/createAPost"} prefetch>
            <div>
              <MdAdd className={styles.addIcon} />
              <span>New post</span>
            </div>
          </Link>
        </button>
      </nav>

      <h3>{`${generateTimeMessage()} ${
        user.displayName ? user.displayName : ""
      }`}</h3>

      <div className={styles.postsWrapper}>
        <AiOutlineFileAdd className={styles.addIcon} />
        <h4>Add posts to your collection!</h4>
      </div>
    </>
  );
}

export default withAuth(Home);
