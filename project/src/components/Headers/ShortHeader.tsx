import React, { useRef } from "react";

import Link from "next/link";

import { BiHome } from "react-icons/bi";
import { VscNewFile } from "react-icons/vsc";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

import styles from "../../styles/components/headers/short-header.module.scss";

const ShortHeader = () => {
  return (
    <>
      <header className={styles.shortHeader}>
        <h1 className={styles.headerTitle} translate="no">
          <Link href={"/"} prefetch>
            Easy Poster
          </Link>
        </h1>
        <ul className={styles.navigationOptions}>
          <li className={styles.navOption}>
            <Link href={"/"}>
              <i>
                <BiHome />
              </i>
            </Link>
          </li>
          <li className={styles.navOption}>
            <Link href={"/posts/create/default"}>
              <i>
                <VscNewFile />
              </i>
            </Link>
          </li>
          <li className={styles.navOption}>
            <Link href={"#"}>
              <i>
                <RiCompassDiscoverLine />
              </i>
            </Link>
          </li>
          <li className={styles.navOption} data-tester="no">
            <Link href={"/user/ProfilePage"}>
              <i>
                <FiUser />
              </i>
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default ShortHeader;
