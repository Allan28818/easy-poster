import { DocumentData } from "firebase/firestore";
import React, { ReactNode, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PostOptions from "../PopUps/PostOptions";

import styles from "../../styles/components/post-wrapper-card.module.scss";
import formatDate from "../../services/formatDate";
import Link from "next/link";
import HandleCreatePreview from "../HandleCreatePreview";

import ConfirmationPopUp from "../PopUps/ConfirmationPopUp";
import disablePost from "../../services/posts/disablePost";

interface PostWrapperCardProps {
  postsList: DocumentData[];
  showPostOptions: ReactNode | null | any;
  setShowPostOptions: React.Dispatch<
    React.SetStateAction<ReactNode | null | any>
  >;
  onUpdatePosts: () => Promise<void>;
}

const PostWrapperCard = (props: PostWrapperCardProps) => {
  const { postsList, showPostOptions, setShowPostOptions, onUpdatePosts } =
    props;

  const { user } = useAuth();

  const [showPostDeletePopUp, setShowPostDeletePopUp] =
    useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<DocumentData>({});

  return (
    <>
      <ConfirmationPopUp
        setShowMessage={setShowPostDeletePopUp}
        showMessage={showPostDeletePopUp}
        type="info"
        title="Wait..."
        description="Do you really want to delete your post?"
        buttonsText={{ confirmation: "Delete", cancel: "Cancel" }}
        onConfirm={async () => {
          if (postToDelete) {
            await disablePost({
              id: postToDelete.id,
              postCreatorId: postToDelete.creatorData.id,
              userId: user?.uid,
            });
          }
          if (!!user) {
            await onUpdatePosts();
            setShowPostDeletePopUp(false);
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
                handleDeleteClick={() => {
                  setPostToDelete(post);
                  setShowPostDeletePopUp(true);
                }}
                editURL={
                  window && `${window.location.href}posts/edit/${post.id}`
                }
                sharingURL={window && `${window.location.href}posts/${post.id}`}
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
