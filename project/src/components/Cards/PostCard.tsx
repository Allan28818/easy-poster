import React, { ReactNode, useEffect, useRef, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { BiDuplicate } from "react-icons/bi";
import { v4 as uuid } from "uuid";

import styles from "../../styles/components/post-card.module.scss";
import docElementsProp from "../../models/DocElementsProp";

interface PostCardProps {
  index: number;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
  docElements: docElementsProp[];
  children: ReactNode;
}

interface useOutsideAlerterProps {
  ref: any;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function useOutsideAlerter(props: useOutsideAlerterProps) {
  const { ref, setIsActive } = props;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const PostCard = (props: PostCardProps) => {
  const { children, docElements, index, setDocElements } = props;
  const [isActive, setIsActive] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter({ ref: wrapperRef, setIsActive });

  function handleRemoveElement() {
    const docElementsAvaiableArray = Array.from(docElements);

    docElementsAvaiableArray.splice(index, 1);

    setDocElements(docElementsAvaiableArray);
  }

  function handleDuplicateElement() {
    // debugger;
    const docElementsAvaiableArray = Array.from(docElements);
    const currentElement = docElementsAvaiableArray[index];
    const currentElementCopy = JSON.parse(JSON.stringify(currentElement));

    const positionToInsert = index + 1;

    currentElementCopy.id = uuid();

    if (currentElementCopy.textContent) {
      const currentElementHTML = document.getElementById(currentElement.id);
      const currentElementCopyTextContent = currentElementHTML
        ? currentElementHTML.textContent
        : currentElement.elementName;
      currentElementCopy.textContent = currentElementCopyTextContent;
    }

    docElementsAvaiableArray.splice(positionToInsert, 0, currentElementCopy);
    setDocElements(docElementsAvaiableArray);
  }

  return (
    <div
      ref={wrapperRef}
      id="card-wrapper"
      className={isActive ? styles.cardWrapper : styles.off}
      onClick={() => setIsActive(true)}
    >
      <nav className={isActive ? styles.cardHeader : "hidden"}>
        <div className={styles.cardButtons}>
          <button className={styles.duplicate} onClick={handleDuplicateElement}>
            <BiDuplicate />
          </button>
          <button className={styles.delete} onClick={handleRemoveElement}>
            <IoMdTrash />
          </button>
        </div>
      </nav>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default PostCard;
