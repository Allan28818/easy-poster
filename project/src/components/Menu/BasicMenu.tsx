import React from "react";

import Link from "next/link";
import { IoIosSave } from "react-icons/io";

import styles from "../../styles/components/basic-menu.module.scss";

interface BasicMenuProps {
  title: string;
  setTitle: React.Dispatch<string>;
  handleSavePost: () => Promise<void>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<boolean>;
}

const BasicMenu = (props: BasicMenuProps) => {
  const { title, setTitle, handleSavePost, showMenu, setShowMenu } = props;
  return (
    <div className={showMenu ? styles.menu : "hidden"}>
      <input
        type="text"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        spellCheck={"false"}
        autoComplete={"off"}
      />
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <button onClick={handleSavePost}>
        Save <IoIosSave />
      </button>
    </div>
  );
};

export default BasicMenu;
