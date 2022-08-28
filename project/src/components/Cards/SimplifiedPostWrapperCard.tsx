import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import React from "react";

import styles from "../../styles/components/cards/simplified-post-wrapper-card.module.scss";
import HandleCreatePreview from "../HandleCreatePreview";

interface SimplifiedPostWrapperCardProps {
  postsList: DocumentData[];
}

const SimplifiedPostWrapperCard = (props: SimplifiedPostWrapperCardProps) => {
  const { postsList } = props;

  return (
    <>
      {postsList.map((currentPost) => (
        <div className={styles.postWrapperCard}>
          <header>
            <span className={styles.username}>
              <Link href={`/user/${currentPost.creatorData.email}`}>
                {currentPost.creatorData.fullName}
              </Link>
            </span>
            <hr />
            <h1 className={styles.postName}>{currentPost.postName}</h1>
          </header>
          <Link href={`/posts/${currentPost.id}`}>
            <div className={styles.postPreview}>
              {HandleCreatePreview(currentPost.postData[0], styles)}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default SimplifiedPostWrapperCard;
