import Link from "next/link";

import { generateTimeMessage } from "../../utils/generateTimeMessage";

import { useAuth } from "../../hooks/useAuth";

import { AiOutlineFileAdd } from "react-icons/ai";

import styles from "../../styles/components/cards/post-wrapper-card.module.scss";

function NoPostsCard() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h3>{`${generateTimeMessage()} ${
        user?.displayName ? user.displayName : ""
      }`}</h3>

      <div className={styles.postsWrapper}>
        <Link href={"/posts/create/default"} prefetch>
          <a>
            <AiOutlineFileAdd className={styles.addIcon} />
            <h4>Add posts to your collection!</h4>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default NoPostsCard;
