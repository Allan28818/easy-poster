import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

import withAuth from "../components/withAuth";

import { generateTimeMessage } from "../services/generateTimeMessage";
import { AiOutlineFileAdd } from "react-icons/ai";

import styles from "../styles/home.module.scss";
import { getPosts } from "../services/posts/getPosts";
import { DocumentData } from "firebase/firestore";

import formatDate from "../services/formatDate";
import PostOptions from "../components/PopUps/PostOptions";
import OptionProps from "../models/components/PopUps/OptionProps";
import HandleCreatePreview from "../components/HandleCreatePreview";
import disablePost from "../services/posts/disablePost";
import { useRouter } from "next/router";
import MainHeader from "../components/Headers/MainHeader";
import PostWrapperCard from "../components/Cards/PostWrapperCard";

function Home() {
  const [postsList, setPostsList] = useState<DocumentData[]>([]);
  const [showPostOptions, setShowPostOptions] = useState<
    ReactNode | null | any
  >(null);

  const { user } = useAuth();
  const router = useRouter();

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
      <MainHeader />

      {!!postsList.length ? (
        <PostWrapperCard
          postsList={postsList}
          postOptionsArray={postOptionsArray}
          showPostOptions={showPostOptions}
          setShowPostOptions={setShowPostOptions}
        />
      ) : (
        <div className={styles.container}>
          <h3>{`${generateTimeMessage()} ${
            user?.displayName ? user.displayName : ""
          }`}</h3>

          <div className={styles.postsWrapper}>
            <Link href={"/posts/changes/create"} prefetch>
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
