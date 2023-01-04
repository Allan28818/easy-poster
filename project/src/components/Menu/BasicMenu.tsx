import React, { Dispatch } from "react";

import Link from "next/link";
import { IoIosSave } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import { BsFillFileEarmarkLock2Fill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";

import styles from "../../styles/components/menu/basic-menu.module.scss";
import { handleEditPostProps } from "../../handlers/createPostHandlers/handleEditPost";

import { useRouter } from "next/router";
import docElementsProp from "../../models/DocElementsProp";
import BasicMessageProps from "../../models/components/BasicMessageProps";
import { useAuth } from "../../hooks/useAuth";
import SwitchButton from "../Buttons/SwitchButton";
import {
  VisualBooleanAction,
  VisualBooleanActionKind,
  VisualBooleanState,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";

interface BasicMenuProps {
  postTitle: string;
  setPostTitle: React.Dispatch<string>;
  pageOperation: string;
  handleSavePost: () => Promise<void>;
  handleEditPost: (props: handleEditPostProps) => Promise<void>;
  showMenuState: VisualBooleanState;
  dispatchShowMenu: Dispatch<VisualBooleanAction>;
  isAPublicPost: boolean;
  setIsAPublicPost: React.Dispatch<React.SetStateAction<boolean>>;
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
    showMenuState,
    dispatchShowMenu,
    setBasicMessageConfig,
    pageOperation,
    docElements,
    postData,
    isAPublicPost,
    setIsAPublicPost,
  } = props;

  const { user } = useAuth();
  const history = useRouter();

  return (
    <div className={showMenuState.isMenuVisible ? styles.menu : "hidden"}>
      <div
        className={styles.menuPublicSwitchWrapper}
        title={`Your post is ${isAPublicPost ? "public" : "private"}`}
      >
        <SwitchButton
          isSelected={isAPublicPost}
          setIsSelected={setIsAPublicPost}
        />
        {isAPublicPost ? (
          <BiWorld className={styles.public} />
        ) : (
          <BsFillFileEarmarkLock2Fill className={styles.private} />
        )}
      </div>
      <GrFormClose
        className={styles.closeButton}
        onClick={() =>
          dispatchShowMenu({
            type: VisualBooleanActionKind.MENU,
            isMenuVisible: false,
          })
        }
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
