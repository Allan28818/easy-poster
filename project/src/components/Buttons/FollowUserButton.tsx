import React, { useState } from "react";

import styles from "../../styles/components/buttons/follow-user-button.module.scss";

interface FollowUserButtonProps {
  onFollow: () => Promise<void>;
  onUnfollow: () => Promise<void>;
  following: boolean;
  toggleTexts: string[];
}

const FollowUserButton = (props: FollowUserButtonProps) => {
  const { onFollow, onUnfollow, following, toggleTexts } = props;
  const buttonText = following ? toggleTexts[1] : toggleTexts[0];
  const currentOnClickFunction = following ? onUnfollow : onFollow;

  console.log("following", following);

  return (
    <div className={styles.btnWrapper}>
      <button
        className={following ? styles.follow : styles.notFollowing}
        onClick={async () => {
          await currentOnClickFunction();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FollowUserButton;
