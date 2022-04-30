import { ReactNode, useEffect, useRef, useState } from "react";
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

import formatDate from "../services/formatDate";
import PostOptions from "../components/PopUps/PostOptions";
import OptionProps from "../models/components/PopUps/OptionProps";
import HandleCreatePreview from "../components/HandleCreatePreview";
import disablePost from "../services/posts/disablePost";

function Home() {
  const [postsList, setPostsList] = useState<DocumentData[]>([]);
  const [showPostOptions, setShowPostOptions] = useState<
    ReactNode | null | any
  >(null);

  const { user } = useAuth();

  const postOptionsArray: OptionProps[] = [
    {
      optionText: "Copy link",
      optionCbFunction: async () => {},
      icon: "link",
    },
    {
      optionText: "Edit",
      optionCbFunction: async () => {},
      icon: "edit",
    },
    {
      optionText: "Delete",
      optionCbFunction: async ({ id, postCreatorId, userId }) => {
        await disablePost({ id, postCreatorId, userId });
        if (!!user) {
          setPostsList(await getPosts({ postOwnerId: user.uid }));
        }
      },
      icon: "delete",
    },
  ];

  useEffect(() => {
    const posts = async () => {
      if (!!user) {
        setPostsList(await getPosts({ postOwnerId: user.uid }));
      }
    };

    posts();
  }, []);

  return (
    <>
      <Head>
        <title>Easy Poster | Home</title>
      </Head>
      <nav id="menu" className={styles.header}>
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
            <div key={post.createdAt} className={styles.postWrapper}>
              {user?.uid === post.creatorData.id && (
                <PostOptions
                  showPopUp={showPostOptions}
                  setShowPopUp={setShowPostOptions}
                  options={postOptionsArray}
                  operationProps={{
                    id: post.id,
                    postCreatorId: post.creatorData.id,
                    userId: user?.uid,
                  }}
                />
              )}
              <h1 className={styles.postTitle}>{post.postName}</h1>
              <div className={styles.postPreview}>
                {HandleCreatePreview(post.postData[0], styles)}
              </div>
              <span className={styles.creatorCredits}>
                &copy;{" "}
                {`${post.creatorData.fullName} - ${formatDate(
                  post.createdAt.toDate(),
                  "yyyy"
                )}`}
              </span>

              <Link href={`/posts/${post.id}`}>View post</Link>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.container}>
          <h3>{`${generateTimeMessage()} ${
            user?.displayName ? user.displayName : ""
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
