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

  const followingStyle: React.CSSProperties = {
    background: "#a4b0be",
    color: "#7f8c8d",
  };
  const notFollowingStyle: React.CSSProperties = {
    background: "#0abde3",
    color: "#f1f2f6",
  };

  return (
    <div className={styles.btnWrapper}>
      <button
        onClick={async () => {
          await currentOnClickFunction();
        }}
        style={following ? followingStyle : notFollowingStyle}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FollowUserButton;
