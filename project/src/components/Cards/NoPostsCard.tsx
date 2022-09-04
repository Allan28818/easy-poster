import Link from "next/link";

import { AiOutlineFileAdd } from "react-icons/ai";

import styles from "../../styles/components/cards/post-wrapper-card.module.scss";

function NoPostsCard() {
  return (
    <div className={styles.postsWrapper}>
      <Link href={"/posts/create/default"} prefetch>
        <a>
          <AiOutlineFileAdd className={styles.addIcon} />
          <h4>Add posts to your collection!</h4>
        </a>
      </Link>
    </div>
  );
}

export default NoPostsCard;
