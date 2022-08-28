import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import withAuth from "../components/withAuth";

import { getPosts } from "../services/posts/getPosts";
import { DocumentData } from "firebase/firestore";

import MainHeader from "../components/Headers/MainHeader";
import PostWrapperCard from "../components/Cards/PostWrapperCard";
import NoPostsCard from "../components/Cards/NoPostsCard";
import ShortHeader from "../components/Headers/ShortHeader";

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
        setPostsList(returnedPosts instanceof Array ? returnedPosts : []);
      }
    };

    posts();
  }, [user]);

  return (
    <>
      <ShortHeader />

      {!!postsList.length ? (
        <PostWrapperCard
          postsList={postsList}
          showPostOptions={showPostOptions}
          setShowPostOptions={setShowPostOptions}
          onUpdatePosts={async () => {
            const returnedPosts = await getPosts({ postOwnerId: user?.uid });
            setPostsList(returnedPosts instanceof Array ? returnedPosts : []);
          }}
        />
      ) : (
        <NoPostsCard />
      )}
    </>
  );
}

export default withAuth(Home);
