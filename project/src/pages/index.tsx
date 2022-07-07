import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import withAuth from "../components/withAuth";

import { getPosts } from "../services/posts/getPosts";
import { DocumentData } from "firebase/firestore";

import MainHeader from "../components/Headers/MainHeader";
import PostWrapperCard from "../components/Cards/PostWrapperCard";
import NoPostsCard from "../components/Cards/NoPostsCard";

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
        setPostsList(await getPosts({ postOwnerId: user.uid }));
      }
    };

    posts();
  }, []);

  return (
    <>
      <MainHeader showAddPostBtn={true} />

      {!!postsList.length ? (
        <PostWrapperCard
          postsList={postsList}
          showPostOptions={showPostOptions}
          setShowPostOptions={setShowPostOptions}
          onUpdatePosts={async () => {
            setPostsList(await getPosts({ postOwnerId: user?.uid }));
          }}
        />
      ) : (
        <NoPostsCard />
      )}
    </>
  );
}

export default withAuth(Home);
