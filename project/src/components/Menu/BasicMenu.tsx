import React from "react";

import Link from "next/link";
import { IoIosSave } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";

import styles from "../../styles/components/basic-menu.module.scss";

interface BasicMenuProps {
  title: string;
  setTitle: React.Dispatch<string>;
  pageOperation: string;
  handleSavePost: () => Promise<void>;
  handleEditPost: () => Promise<void>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<boolean>;
}

const BasicMenu = (props: BasicMenuProps) => {
  const {
    title,
    setTitle,
    handleSavePost,
    showMenu,
    setShowMenu,
    pageOperation,
  } = props;
  return (
    <div className={showMenu ? styles.menu : "hidden"}>
      <GrFormClose
        className={styles.closeButton}
        onClick={() => setShowMenu(false)}
      />
      <input
        type="text"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        spellCheck={"false"}
        autoComplete={"off"}
        placeholder="Untitled"
      />
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <button onClick={handleSavePost}>
        {pageOperation === "create" ? "Save" : "Edit"} <IoIosSave />
      </button>
    </div>
  );
};

export default BasicMenu;
