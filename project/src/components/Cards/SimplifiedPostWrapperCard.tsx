import React from "react";

import { DocumentData } from "firebase/firestore";

import Link from "next/link";
import Image from "next/image";

import HandleCreatePreview from "../HandleCreatePreview";

import styles from "../../styles/components/cards/simplified-post-wrapper-card.module.scss";

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
            <div className={styles.profileInfo}>
              <Image
                src={currentPost.creatorData.photoURL || ""}
                alt={currentPost.creatorData.fullName}
                width={40}
                height={40}
                className={styles.avatar}
                layout={"fixed"}
                objectFit={"cover"}
              />
              <span className={styles.username}>
                <Link href={`/user/${currentPost.creatorData.email}`}>
                  {currentPost.creatorData.fullName}
                </Link>
              </span>
            </div>
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
