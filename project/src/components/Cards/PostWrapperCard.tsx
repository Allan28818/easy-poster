import { DocumentData } from "firebase/firestore";
import React, { ReactNode, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PostOptions from "../PopUps/PostOptions";

import styles from "../../styles/components/post-wrapper-card.module.scss";
import formatDate from "../../services/formatDate";
import Link from "next/link";
import HandleCreatePreview from "../HandleCreatePreview";
import OptionProps from "../../models/components/PopUps/OptionProps";
import ConfirmationPopUp from "../PopUps/ConfirmationPopUp";
import disablePost from "../../services/posts/disablePost";

interface PostWrapperCardProps {
  postsList: DocumentData[];
  postOptionsArray: OptionProps[];
  showPostOptions: ReactNode | null | any;
  setShowPostOptions: React.Dispatch<
    React.SetStateAction<ReactNode | null | any>
  >;
  onUpdatePosts: () => Promise<void>;
  postDeleteOptions: {
    showPostDeletePopUp: boolean;
    setShowPostDeletePopUp: React.Dispatch<React.SetStateAction<boolean>>;
    postToDelete: DocumentData;
    setPostToDelete: React.Dispatch<React.SetStateAction<DocumentData>>;
  };
}

const PostWrapperCard = (props: PostWrapperCardProps) => {
  const {
    postsList,
    postOptionsArray,
    showPostOptions,
    setShowPostOptions,
    onUpdatePosts,
    postDeleteOptions,
  } = props;

  const { user } = useAuth();

  return (
    <>
      <ConfirmationPopUp
        setShowMessage={postDeleteOptions.setShowPostDeletePopUp}
        showMessage={postDeleteOptions.showPostDeletePopUp}
        type="info"
        title="Wait..."
        description="Do you really want to delete your post?"
        buttonsText={{ confirmation: "Delete", cancel: "Cancel" }}
        onConfirm={async () => {
          console.log("postToDelete", postDeleteOptions.postToDelete);

          if (postDeleteOptions.postToDelete) {
            await disablePost({
              id: postDeleteOptions.postToDelete.id,
              postCreatorId: postDeleteOptions.postToDelete.creatorData.id,
              userId: user?.uid,
            });
          }
          if (!!user) {
            await onUpdatePosts();
            postDeleteOptions.setShowPostDeletePopUp(false);
          }
        }}
      />
      <div className={styles.postsList}>
        {postsList.map((post) => (
          <div key={post.createdAt} className={styles.postWrapper}>
            {user?.uid === post.creatorData.id && (
              <PostOptions
                showPopUp={showPostOptions}
                setShowPopUp={setShowPostOptions}
                handleDeleteClick={() =>
                  postDeleteOptions.setPostToDelete(post)
                }
                options={postOptionsArray}
                operationProps={{
                  id: post.id,
                  postCreatorId: post.creatorData.id,
                  userId: user?.uid,
                }}
                href={window && `${window.location.href}posts/${post.id}`}
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
    </>
  );
};

export default PostWrapperCard;
