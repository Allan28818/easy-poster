import React from "react";

import styles from "../../styles/components/buttons/follow-user-button.module.scss";

interface FollowUserButtonProps {
  onClick: () => Promise<void>;
}

const FollowUserButton = (props: FollowUserButtonProps) => {
  const { onClick } = props;

  return (
    <div className={styles.btnWrapper}>
      <button className={styles.follow} onClick={async () => await onClick()}>
        Follow
      </button>
    </div>
  );
};

export default FollowUserButton;
