import { ReactNode, useEffect, useReducer, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import withAuth from "../components/withAuth";

import { getPosts } from "../services/posts/getPosts";
import { DocumentData } from "firebase/firestore";

import PostWrapperCard from "../components/Cards/PostWrapperCard";
import NoPostsCard from "../components/Cards/NoPostsCard";
import ShortHeader from "../components/Headers/ShortHeader";
import { generateTimeMessage } from "../utils/generateTimeMessage";

import styles from "../styles/home.module.scss";
import { SelectSectionMenu } from "../components/Menu/SelectSectionMenu";
import {
  postsTypeInitialState,
  postsTypeReducer,
  ReducerActionKind,
} from "../reducers/postsTypeReducer";
import { getFeedPosts } from "../services/posts/getFeedPosts";
import SimplifiedPostWrapperCard from "../components/Cards/SimplifiedPostWrapperCard";
import { BasicMessageCard } from "../components/Cards/BasicMessageCard";

function Home() {
  const [state, dispatch] = useReducer(postsTypeReducer, postsTypeInitialState);

  const [showPostOptions, setShowPostOptions] = useState<
    ReactNode | null | any
  >(null);

  const [selectedIndexTab, setSelectedIndexTab] = useState<number>(1);

  const { user } = useAuth();

  const myPosts = !!state.myPosts.length ? (
    <PostWrapperCard
      isEditable={true}
      postsList={state.myPosts}
      showPostOptions={showPostOptions}
      setShowPostOptions={setShowPostOptions}
      onUpdatePosts={handleUpdatePosts}
    />
  ) : (
    <NoPostsCard />
  );

  const feedPosts = !!state.feedPosts.length ? (
    <SimplifiedPostWrapperCard postsList={state.feedPosts} />
  ) : (
    <BasicMessageCard
      text="You don't have posts in your feed"
      iconType="noDocument"
    />
  );

  useEffect(() => {
    const myPosts = async () => {
      if (!!user) {
        const returnedPosts = await getPosts({ postOwnerId: user?.id });
        dispatch({
          type: ReducerActionKind.GET_MY_POSTS,
          myPosts: returnedPosts.data,
        });
      }
    };

    const feedPosts = async () => {
      if (!!user?.id) {
        const returnedPosts = await getFeedPosts({ feedId: user?.id });

        dispatch({
          type: ReducerActionKind.GET_FEED,
          feedPosts: returnedPosts.feedPosts.posts,
        });
      }
    };

    myPosts();
    feedPosts();
  }, [user]);

  async function handleUpdatePosts() {
    const returnedPosts = await getPosts({ postOwnerId: user?.id });
    dispatch({
      type: ReducerActionKind.GET_MY_POSTS,
      myPosts: returnedPosts?.data,
    });
  }

  return (
    <div className={styles.container}>
      <ShortHeader />

      <h3>{`${generateTimeMessage()} ${
        user?.displayName ? user.displayName : ""
      }`}</h3>

      <SelectSectionMenu
        sectionsText={["Feed", "Your posts"]}
        selectedIndexTab={selectedIndexTab}
        setSelectedIndexTab={setSelectedIndexTab}
      />

      {selectedIndexTab === 1 ? feedPosts : myPosts}
    </div>
  );
}

export default withAuth(Home);
