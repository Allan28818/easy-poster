import React from "react";

import Head from "next/head";
import Link from "next/link";

import { MdAdd } from "react-icons/md";

import styles from "../../styles/components/headers/main-header.module.scss";

interface MainHeaderProps {
  showAddPostBtn: boolean;
  subTitle?: string;
}

const MainHeader = (props: MainHeaderProps) => {
  const { showAddPostBtn, subTitle } = props;

  return (
    <>
      <Head>
        <title>Easy Poster | Home</title>
      </Head>
      <nav id="menu" className={styles.header}>
        <h1 translate="no" className={styles.title}>
          Easy poster
        </h1>

        {subTitle && <h3 className={styles.subTitle}>{subTitle}</h3>}

        {showAddPostBtn && (
          <button className={styles.addPostButton}>
            <Link href={"/posts/create/default"} prefetch>
              <div>
                <span>New post</span>
                <MdAdd className={styles.addIcon} />
              </div>
            </Link>
          </button>
        )}
      </nav>
    </>
  );
};

export default MainHeader;
