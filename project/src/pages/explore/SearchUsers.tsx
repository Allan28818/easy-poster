import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

import ShortHeader from "../../components/Headers/ShortHeader";
import PostWrapperCard from "../../components/Cards/PostWrapperCard";
import { BasicProfileImage } from "../../components/Images/BasicProfileImage";

import withAuth from "../../components/withAuth";
import { getUsers } from "../../services/users/getUsers";

import styles from "../../styles/explore/search-users.module.scss";
import { getAllPublicPosts } from "../../services/posts/getAllPublicPosts";
import SimplifiedPostWrapperCard from "../../components/Cards/SimplifiedPostWrapperCard";

function SearchUsers() {
  const [username, setUsername] = useState<string>("");
  const [usersList, setUsersList] = useState<DocumentData[]>([]);
  const [popularPostsList, setPopularPostsList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const handleGetUsers = async () => {
      if (!!username) {
        const queryResult = await getUsers({ username });
        if (queryResult instanceof Array) {
          setUsersList(queryResult);
        }
      }
    };

    const handleGetAllPublicPosts = async () => {
      const queryResult = await getAllPublicPosts();

      if (queryResult instanceof Array) {
        setPopularPostsList(queryResult);
        console.log(queryResult);
      }
    };

    handleGetAllPublicPosts();
    handleGetUsers();
  }, [username]);

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
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </header>
        {!!usersList.length && (
          <div className={styles.usersResultWrapper}>
            <ul className={styles.usersList}>
              {usersList.map((currentUser) => (
                <li>
                  <Link href={"#"}>
                    <a>
                      <BasicProfileImage
                        username={"static"}
                        photoURL={currentUser.photoURL}
                      />
                      <div className={styles.textInfo}>
                        <h4 className={styles.username}>{currentUser.email}</h4>
                        <span className={styles.followsMe}>Follows you</span>
                        <span className={styles.basicInfo}>
                          1.5k followers | 1.6k following
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className={styles.famousPosts}>
        <SimplifiedPostWrapperCard postsList={popularPostsList} />
      </section>
    </>
  );
}

export default withAuth(SearchUsers);
