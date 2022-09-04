import Link from "next/link";
import React, { useState } from "react";

import { IoSadOutline, IoHappy } from "react-icons/io5";

import styles from "../../styles/components/messages/no-posts-message.module.scss";

interface NoPostsMessageProps {
  messageTitle: string;
  messageDescription: string;
  redirectionURL: string;
  emojieTitle?: string;
}

const NoPostsMessage = (props: NoPostsMessageProps) => {
  const { messageTitle, messageDescription, redirectionURL, emojieTitle } =
    props;

  const [isSmiling, setIsSmiling] = useState<boolean>(false);

  return (
    <div className={styles.messageWrapper}>
      <h1 className={styles.messageTitle}>{messageTitle}</h1>
      <Link href={redirectionURL}>
        <span
          className={styles.iconWrapper}
          onMouseOver={() => setIsSmiling(true)}
          onMouseLeave={() => {
            setIsSmiling(false);
          }}
          title={emojieTitle || "Click here"}
        >
          {isSmiling ? (
            <IoHappy className={styles.icon} />
          ) : (
            <IoSadOutline className={styles.icon} />
          )}
        </span>
      </Link>
      <span className={styles.messageDescription}>{messageDescription}</span>
    </div>
  );
};

export default NoPostsMessage;
