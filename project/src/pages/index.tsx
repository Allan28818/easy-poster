import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import withAuth from "../components/withAuth";

import { getPosts } from "../services/posts/getPosts";
import { DocumentData } from "firebase/firestore";

import PostWrapperCard from "../components/Cards/PostWrapperCard";
import NoPostsCard from "../components/Cards/NoPostsCard";
import ShortHeader from "../components/Headers/ShortHeader";
import { generateTimeMessage } from "../utils/generateTimeMessage";

import styles from "../styles/home.module.scss";

function Home() {
  const [postsList, setPostsList] = useState<DocumentData[]>([]);

  const [showPostOptions, setShowPostOptions] = useState<
    ReactNode | null | any
  >(null);

  const { user } = useAuth();

  useEffect(() => {
    const posts = async () => {
      if (!!user) {
        const returnedPosts = await getPosts({ postOwnerId: user?.uid });
        setPostsList(
          returnedPosts.data instanceof Array ? returnedPosts.data : []
        );
      }
    };

    posts();
  }, [user]);

  return (
    <div className={styles.container}>
      <h3>{`${generateTimeMessage()} ${
        user?.displayName ? user.displayName : ""
      }`}</h3>
      <ShortHeader />

      {!!postsList.length ? (
        <PostWrapperCard
          postsList={postsList}
          showPostOptions={showPostOptions}
          setShowPostOptions={setShowPostOptions}
          onUpdatePosts={async () => {
            const returnedPosts = await getPosts({ postOwnerId: user?.uid });
            setPostsList(
              returnedPosts.data instanceof Array ? returnedPosts.data : []
            );
          }}
        />
      ) : (
        <NoPostsCard />
      )}
    </div>
  );
}

export default withAuth(Home);
