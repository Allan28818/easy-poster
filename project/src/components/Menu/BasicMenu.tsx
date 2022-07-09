import React from "react";

import Link from "next/link";
import { IoIosSave } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";

import styles from "../../styles/components/menu/basic-menu.module.scss";
import { handleEditPostProps } from "../../handlers/createPostHandlers/handleEditPost";

import { useRouter } from "next/router";
import docElementsProp from "../../models/DocElementsProp";
import BasicMessageProps from "../../models/components/BasicMessageProps";
import { useAuth } from "../../hooks/useAuth";

interface BasicMenuProps {
  postTitle: string;
  setPostTitle: React.Dispatch<string>;
  pageOperation: string;
  handleSavePost: () => Promise<void>;
  handleEditPost: (props: handleEditPostProps) => Promise<void>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<boolean>;
  setBasicMessageConfig: React.Dispatch<
    React.SetStateAction<BasicMessageProps>
  >;
  docElements: docElementsProp[];
  postData: {
    postId: string | undefined;
    postBody: Element | null;
  };
}

const BasicMenu = (props: BasicMenuProps) => {
  const {
    postTitle,
    setPostTitle,
    handleSavePost,
    handleEditPost,
    showMenu,
    setShowMenu,
    setBasicMessageConfig,
    pageOperation,
    docElements,
    postData,
  } = props;

  const { user } = useAuth();
  const history = useRouter();

  return (
    <div className={showMenu ? styles.menu : "hidden"}>
      <GrFormClose
        className={styles.closeButton}
        onClick={() => setShowMenu(false)}
      />
      <input
        type="text"
        value={postTitle}
        onChange={(e: any) => setPostTitle(e.target.value)}
        spellCheck={"false"}
        autoComplete={"off"}
        placeholder="Untitled"
      />
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <button
        onClick={
          pageOperation === "create"
            ? handleSavePost
            : () =>
                handleEditPost({
                  docElements,
                  history,
                  postBody: postData.postBody,
                  postId: postData.postId,
                  postTitle,
                  setBasicMessageConfig,
                  user,
                })
        }
      >
        {pageOperation === "create" ? "Save" : "Edit"} <IoIosSave />
      </button>
    </div>
  );
};

export default BasicMenu;
