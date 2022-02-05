import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MdAdd } from "react-icons/md";
import Link from "next/link";

import withAuth from "../components/withAuth";

import { generateTimeMessage } from "../services/generateTimeMessage";
import { AiOutlineFileAdd } from "react-icons/ai";

import Head from "next/head";

import styles from "../styles/home.module.scss";
import { getPosts } from "../services/posts/getPosts";
import { DocumentData } from "firebase/firestore";

function Home() {
  const [postsList, setPostsList] = useState<DocumentData[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const posts = async () => {
      setPostsList(await getPosts({ postOwnerId: user.uid }));
    };

    posts();
  }, []);

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
              <span>New post</span>
              <MdAdd className={styles.addIcon} />
            </div>
          </Link>
        </button>
      </nav>

      {!!postsList.length ? (
        postsList.map((post) => <div></div>)
      ) : (
        <div className={styles.container}>
          <h3>{`${generateTimeMessage()} ${
            user.displayName ? user.displayName : ""
          }`}</h3>

          <div className={styles.postsWrapper}>
            <Link href={"/posts/createAPost"} prefetch>
              <a>
                <AiOutlineFileAdd className={styles.addIcon} />
                <h4>Add posts to your collection!</h4>
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuth(Home);
