import Link from "next/link";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";
import { generateTimeMessage } from "../../services/generateTimeMessage";
import styles from "../../styles/components/post-wrapper-card.module.scss";

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
