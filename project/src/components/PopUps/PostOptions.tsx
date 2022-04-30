import React, { ReactNode, useRef, useState } from "react";

import { BiCopy } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import styles from "../../styles/components/post-options.module.scss";
import useOutsideAlerter from "../../services/events/useOutsideAlerter";
import OptionProps from "../../models/components/PopUps/OptionProps";
import disablePostProps from "../../models/DisablePostProps";

interface PostOptionsProps {
  showPopUp: ReactNode | null | any;
  setShowPopUp: React.Dispatch<
    React.SetStateAction<ReactNode | HTMLElement | null>
  >;
  options: OptionProps[];
  operationProps: disablePostProps;
}

const PostOptions = (props: PostOptionsProps) => {
  const { showPopUp, setShowPopUp, options, operationProps } = props;
  const ref: any = useRef(null);
  const isAbleToShow = ref.current === showPopUp && showPopUp && ref.current;
  const popUpPostion =
    window && window.scrollX + ref.current?.getBoundingClientRect()?.right;

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

  return (
    <div ref={ref}>
      {isAbleToShow ? (
        <div
          className={styles.popUpWrapper}
          style={popUpStyles}
          data-block-click={true}
        >
          <ul
            className={styles.optionsList}
            onClick={() => console.log("hey")}
            data-block-click={true}
          >
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
                {option.optionText}
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
  );
};

export default PostOptions;
