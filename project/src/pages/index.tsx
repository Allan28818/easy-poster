import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MdAdd } from "react-icons/md";
import Link from "next/link";

import withAuth from "../components/withAuth";

import { generateTimeMessage } from "../services/generateTimeMessage";
import { AiOutlineFileAdd, AiFillPieChart } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";
import { BiLinkAlt } from "react-icons/bi";

import Head from "next/head";

import styles from "../styles/home.module.scss";
import { getPosts } from "../services/posts/getPosts";
import { DocumentData } from "firebase/firestore";
import docElementsProp from "../models/DocElementsProp";
import TextComponent from "../components/TextComponents/TextComponent";

function Home() {
  const [postsList, setPostsList] = useState<DocumentData[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const posts = async () => {
      setPostsList(await getPosts({ postOwnerId: user.uid }));
    };

    posts();
  }, []);

  function handleCreatePreview(currentElement: docElementsProp) {
    if (!!currentElement.textContent) {
      return (
        <TextComponent
          id={currentElement.id}
          elementName={currentElement.elementName}
          textContent={currentElement.textContent}
          isEditable={false}
        />
      );
    } else if (!!currentElement.src) {
      return (
        <img
          src={currentElement.src}
          alt={currentElement.alt ? currentElement.alt : ""}
        />
      );
    } else if (!!currentElement.caption) {
      return (
        <div className={styles.chartPreview}>
          <AiFillPieChart />
        </div>
      );
    }

    return (
      <div className={styles.unknownElement}>
        <TiWarningOutline />
      </div>
    );
  }

  console.log(postsList);
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
        <div className={styles.postsList}>
          {postsList.map((post) => (
            <div className={styles.postWrapper} key={post.createdAt}>
              <h1 className={styles.postTitle}>{post.postName}</h1>
              <div className={styles.postPreview}>
                {handleCreatePreview(post.postData[0])}
                ...
              </div>
              <span className={styles.creatorCredits}>
                {post.creatorData.fullName}
              </span>

              <Link href={`/posts/${post.id}`} prefetch>
                View post
              </Link>
            </div>
          ))}
        </div>
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
