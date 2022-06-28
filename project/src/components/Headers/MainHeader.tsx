import Head from "next/head";
import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";

import styles from "../../styles/components/main-header.module.scss";

const MainHeader = () => {
  return (
    <>
      <Head>
        <title>Easy Poster | Home</title>
      </Head>
      <nav id="menu" className={styles.header}>
        <h1 translate="no" className={styles.title}>
          Easy poster
        </h1>

        <button className={styles.addPostButton}>
          <Link href={"/posts/create/default"} prefetch>
            <div>
              <span>New post</span>
              <MdAdd className={styles.addIcon} />
            </div>
          </Link>
        </button>
      </nav>
    </>
  );
};

export default MainHeader;
