import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

import ShortHeader from "../../components/Headers/ShortHeader";
import { BasicProfileImage } from "../../components/Images/BasicProfileImage";

import withAuth from "../../components/withAuth";
import { getUsers } from "../../services/users/getUsers";

import styles from "../../styles/explore/search-users.module.scss";
import { getPublicPosts } from "../../services/posts/getPublicPosts";
import SimplifiedPostWrapperCard from "../../components/Cards/SimplifiedPostWrapperCard";
import NoPostsMessage from "../../components/Messages/NoPostsMessage";
import { useAuth } from "../../hooks/useAuth";

function SearchUsers() {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [usersList, setUsersList] = useState<DocumentData[]>([]);
  const [popularPostsList, setPopularPostsList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const handleGetUsers = async () => {
      if (!!username) {
        const queryResult = await getUsers({ username });
        if (queryResult.data instanceof Array) {
          setUsersList(queryResult.data);
        }
      }
    };

    const handleGetAllPublicPosts = async () => {
      const queryResult = await getPublicPosts();

      if (queryResult.data instanceof Array) {
        setPopularPostsList(queryResult.data);
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
              {usersList.map((currentUser) => {
                const followsMe = currentUser.following.some(
                  (currentUser: string) => currentUser === user?.uid
                );
                return (
                  <li>
                    <Link href={`/user/${currentUser.email}`}>
                      <a>
                        <BasicProfileImage
                          username={"static"}
                          photoURL={currentUser.photoURL}
                        />
                        <div className={styles.textInfo}>
                          <h4 className={styles.username}>
                            {currentUser.email}
                          </h4>
                          {followsMe && (
                            <span className={styles.followsMe}>
                              Follows you
                            </span>
                          )}
                          <span className={styles.basicInfo}>
                            {currentUser.followers.length} followers |{" "}
                            {currentUser.following.length} following
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
      <section className={styles.famousPosts}>
        {popularPostsList.length ? (
          <SimplifiedPostWrapperCard postsList={popularPostsList} />
        ) : (
          <NoPostsMessage
            messageTitle="No posts!"
            messageDescription="There's no public posts in the application... be the first and publish one!"
            redirectionURL="/posts/create/default/"
            emojieTitle="Add new post"
          />
        )}
      </section>
    </>
  );
}

export default withAuth(SearchUsers);
