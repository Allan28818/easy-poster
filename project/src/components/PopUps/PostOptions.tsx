import React, { ReactNode, useRef, useState } from "react";

import useOutsideAlerter from "../../services/events/useOutsideAlerter";

import { BiCopy } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import { CopyToClipboard } from "react-copy-to-clipboard";

import Link from "next/link";

import styles from "../../styles/components/pop-ups/post-options.module.scss";

interface PostOptionsProps {
  showPopUp: ReactNode | null | any;
  setShowPopUp: React.Dispatch<
    React.SetStateAction<ReactNode | HTMLElement | null>
  >;
  handleDeleteClick: () => void;
  editURL?: string;
  sharingURL?: string;
}

const PostOptions = (props: PostOptionsProps) => {
  const { showPopUp, setShowPopUp, sharingURL, editURL, handleDeleteClick } =
    props;
  const ref: any = useRef(null);
  const isAbleToShow = ref.current === showPopUp && showPopUp && ref.current;
  const popUpPostion =
    window && window.scrollX + ref.current?.getBoundingClientRect()?.right;

  const [showTip, setShowTip] = useState<boolean>(false);

  let popUpStyles = {};

  if (window.innerWidth >= 735) {
    popUpStyles = { left: popUpPostion };
  }

  useOutsideAlerter({ ref, setIsActive: setShowPopUp });

  return (
    <>
      <div className={showTip ? styles.tip : "hidden"}>
        <span>Your link was copied</span>
      </div>
      <div ref={ref}>
        {isAbleToShow ? (
          <div
            className={styles.popUpWrapper}
            style={popUpStyles}
            data-block-click={true}
          >
            <ul className={styles.optionsList} data-block-click={true}>
              <IoMdClose className={styles.closeBtn} />
              <li onClick={() => setShowPopUp(null)}>
                <CopyToClipboard
                  text={sharingURL || ""}
                  onCopy={() => {
                    setShowTip(true);

                    setTimeout(() => setShowTip(false), 3500);
                  }}
                >
                  <span data-block-click={true}>
                    <BiCopy className={styles.icon} /> Copy to Clipboard
                  </span>
                </CopyToClipboard>
              </li>

              <li>
                <Link href={editURL || ""}>
                  <span data-block-click={true}>
                    <MdEdit className={styles.icon} /> Edit
                  </span>
                </Link>
              </li>
              <li onClick={handleDeleteClick}>
                <span data-block-click={true}>
                  <AiFillDelete className={styles.icon} /> Delete
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div className={styles.threeDots}>
            <BsThreeDotsVertical
              className={styles.icon}
              onClick={(event: any) => {
                setShowPopUp(event.target.parentElement.parentElement);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PostOptions;
