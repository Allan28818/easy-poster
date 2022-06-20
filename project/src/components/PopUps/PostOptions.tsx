import React, { ReactNode, useRef, useState } from "react";

import { BiCopy } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import styles from "../../styles/components/post-options.module.scss";
import useOutsideAlerter from "../../services/events/useOutsideAlerter";
import OptionProps from "../../models/components/PopUps/OptionProps";
import disablePostProps from "../../models/DisablePostProps";

import { CopyToClipboard } from "react-copy-to-clipboard";

interface PostOptionsProps {
  showPopUp: ReactNode | null | any;
  setShowPopUp: React.Dispatch<
    React.SetStateAction<ReactNode | HTMLElement | null>
  >;
  options: OptionProps[];
  operationProps: disablePostProps;
  handleDeleteClick: () => void;
  href?: string;
}

const PostOptions = (props: PostOptionsProps) => {
  const {
    showPopUp,
    setShowPopUp,
    options,
    operationProps,
    href,
    handleDeleteClick,
  } = props;
  const ref: any = useRef(null);
  const isAbleToShow = ref.current === showPopUp && showPopUp && ref.current;
  const popUpPostion =
    window && window.scrollX + ref.current?.getBoundingClientRect()?.right;

  const [showTip, setShowTip] = useState<boolean>(false);

  let popUpStyles = {};

  if (window.innerWidth >= 735) {
    popUpStyles = { left: popUpPostion };
  }

  const iconsList: any = {
    link: <BiCopy className={styles.icon} />,
    delete: <AiFillDelete className={styles.icon} />,
    edit: <MdEdit className={styles.icon} />,
  };

  useOutsideAlerter({ ref, setIsActive: setShowPopUp });

  function handleAddClipboardFeat(option: OptionProps) {
    if (option.icon === "link" && href) {
      return (
        <CopyToClipboard
          text={href}
          onCopy={() => {
            setShowTip(true);

            setTimeout(() => setShowTip(false), 3500);
          }}
        >
          <span data-block-click={true}>{option.optionText}</span>
        </CopyToClipboard>
      );
    }

    return option.optionText;
  }

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
              {options.map((option) => (
                <li
                  key={Math.random()}
                  onClick={async () => {
                    await option.optionCbFunction({
                      id: operationProps.id,
                      postCreatorId: operationProps.postCreatorId,
                      userId: operationProps.userId,
                    });
                    setShowPopUp(null);
                  }}
                  data-block-click={true}
                >
                  {option.icon && iconsList[option.icon]}
                  {handleAddClipboardFeat(option)}
                </li>
              ))}
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
