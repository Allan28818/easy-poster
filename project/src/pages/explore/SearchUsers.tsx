import Link from "next/link";
import React from "react";

import ShortHeader from "../../components/Headers/ShortHeader";

import withAuth from "../../components/withAuth";

import styles from "../../styles/explore/search-users.module.scss";

function SearchUsers() {
  return (
    <>
      <ShortHeader />
      <section className={styles.searchWrapper}>
        <header className={styles.searchHeader}>
          <input
            type="search"
            name="searchForUser"
            className={styles.searchForUser}
            placeholder="Search for an user..."
            aria-details="Type the username that you want to search for"
            tabIndex={1}
          />
        </header>
        <div className={styles.usersResultWrapper}>
          <ul className={styles.usersList}>
            <li>
              <Link href={"#"}>
                <img className={styles.userAvatar} />
                <h4 className={styles.username}>@random_username</h4>
                <span className={styles.followsMe}>Follow you</span>
                <span className={styles.basicInfo}>
                  1.5k followers | 1.6k following
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.famousPosts}>
        {/* List of famous posts */}
      </section>
    </>
  );
}

export default withAuth(SearchUsers);
