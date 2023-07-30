import Image from "next/image";

import styles from "../../styles/components/toolbars/lexical-toolbar.module.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaItalic, FaLock, FaRedo, FaUndo } from "react-icons/fa";
import { BsGlobe2, BsListUl } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { BiListPlus, BiSolidImageAdd } from "react-icons/bi";
import { RxFontBold, RxText, RxTextNone } from "react-icons/rx";
import {
  ImIndentDecrease,
  ImIndentIncrease,
  ImUnderline,
} from "react-icons/im";
import { LuPaintBucket } from "react-icons/lu";
import { IoLinkSharp } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { GrTextAlignFull } from "react-icons/gr";
import { PiListChecksBold } from "react-icons/pi";

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
            <div className={styles.toolGroup}>
              <button className={styles.toolButtonSelect}>
                <BiListPlus className={styles.toolButtonIcon} />
                <select className={styles.toolOptions}>
                  <option>Normal</option>
                </select>
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButtonSelect}>
                <RxText className={styles.toolButtonIcon} />
                <select className={styles.toolOptions}>
                  <option>
                    <p>Regular</p>
                  </option>
                </select>
              </button>
            </div>
            <div className={styles.toolGroup}>
              <input className={styles.fontSizeInput} type="number" min={1} />
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButton}>
                <RxFontBold className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <FaItalic className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <ImUnderline className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <p className={styles.textColorTool}>A</p>
                <div className={styles.textColorIndicator} />
              </button>
              <button className={styles.toolButton}>
                <LuPaintBucket className={styles.toolIcon} />
                <div className={styles.textColorIndicator} />
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButton}>
                <IoLinkSharp className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <BiSolidImageAdd className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <MdOutlineInsertComment className={styles.toolButtonIcon} />
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButtonSelect}>
                <select className={styles.toolOptions}>
                  <option>
                    <GrTextAlignFull className={styles.toolButtonIcon} />
                  </option>
                </select>
              </button>
              <button className={styles.toolButton}>
                <PiListChecksBold className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButtonSelect}>
                <select className={styles.toolOptions}>
                  <option>
                    <BsListUl className={styles.toolButtonIcon} />
                  </option>
                </select>
              </button>
              <button className={styles.toolButton}>
                <ImIndentDecrease className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <ImIndentIncrease className={styles.toolButtonIcon} />
              </button>
              <button className={styles.toolButton}>
                <RxTextNone className={styles.toolButtonIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { LexicalToolbar };
