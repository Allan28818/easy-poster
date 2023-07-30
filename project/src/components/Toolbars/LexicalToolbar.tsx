import Image from "next/image";

import styles from "../../styles/components/toolbars/lexical-toolbar.module.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaLock, FaRedo, FaUndo } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { BiListPlus } from "react-icons/bi";

interface LexicalToolbarProps {
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  isPublicPost: boolean;
  profileImageUrl: string | undefined | null;
}

const LexicalToolbar = (props: LexicalToolbarProps) => {
  const { isFavorite, setIsFavorite, isPublicPost, profileImageUrl } = props;

  return (
    <header className={styles.toolbar}>
      <div className={styles.imageContainer}>
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/easy-poster-d747a.appspot.com/o/website-images%2Ficon-512x512.png?alt=media&token=94ccb26f-56f8-4ba5-8e2a-a63a681c6ec7"
          }
          alt={"Easy Poster"}
          width={70}
          height={70}
          className={styles.logoImage}
        />
      </div>
      <div className={styles.toolsContainer}>
        <div className={styles.topInfo}>
          <div className={styles.secondaryTools}>
            <div className={styles.postNameContainer}>
              <input
                className={styles.postNameInput}
                type="text"
                placeholder="Type your post name..."
              />
              <button
                className={styles.starPostButton}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <AiFillStar className={styles.starIcon} />
                ) : (
                  <AiOutlineStar className={styles.starIcon} />
                )}
              </button>
            </div>
            <div className={styles.secondaryToolsWrapper}>
              <button className={styles.secondaryToolButton}>File</button>
              <button className={styles.secondaryToolButton}>Insert</button>
              <button className={styles.secondaryToolButton}>Tools</button>
              <button className={styles.secondaryToolButton}>Format</button>
            </div>
          </div>
          <div className={styles.publishWrapper}>
            <button className={styles.publishButton}>
              {isPublicPost ? (
                <BsGlobe2 className={styles.publishButtonIcon} />
              ) : (
                <FaLock className={styles.publishButtonIcon} />
              )}
              <p className={styles.publishButtonText}>Publish</p>
            </button>
            {!!profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={"Profile Image"}
                width={46}
                height={46}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profileImagePlaceholder}>
                <FiUser className={styles.userIcon} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottomInfo}>
          <div className={styles.primaryTools}>
            <div className={styles.toolGroup}>
              <button className={styles.toolButton}>
                <FaUndo className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <FaRedo className={styles.toolButtonIcon} />
              </button>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.toolGroup}>
              <button>
                <BiListPlus className={styles.toolButtonIcon} />
                <select>
                  <option>Normal</option>
                </select>
              </button>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.toolGroup}></div>
            <div className={styles.separator}></div>
            <div className={styles.toolGroup}></div>
            <div className={styles.separator}></div>
            <div className={styles.toolGroup}></div>
            <div className={styles.separator}></div>
            <div className={styles.toolGroup}></div>
            <div className={styles.separator}></div>
            <div className={styles.toolGroup}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { LexicalToolbar };
