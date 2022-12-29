import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FollowUserButton from "../../components/Buttons/FollowUserButton";
import { BasicMessageCard } from "../../components/Cards/BasicMessageCard";
import PostWrapperCard from "../../components/Cards/PostWrapperCard";
import ShortHeader from "../../components/Headers/ShortHeader";
import { BasicProfileImage } from "../../components/Images/BasicProfileImage";
import ProfileImage from "../../components/Images/ProfileImage";
import withAuth from "../../components/withAuth";
import { useAuth } from "../../hooks/useAuth";
import { getPosts } from "../../services/posts/getPosts";
import { getUserByField } from "../../services/users/getUserByField";
import { onFollowUser } from "../../services/users/onFollowUser";
import { onUnfollowUser } from "../../services/users/onUnfollowUser";

import styles from "../../styles/user/profile-page.module.scss";

function ProfilePage() {
  const { user } = useAuth();

  const router = useRouter();
  const { username } = router.query;

  const [pageOwner, setPageOwner] = useState<DocumentData>();
  const [postsList, setPostsList] = useState<DocumentData[]>([]);
  const [showPostOptions, setShowPostOptions] = useState<boolean>(false);

  let isCurrentPageOwner = false;

  useEffect(() => {
    const getPageOwnerData = async () => {
      if (!!username && typeof username === "string") {
        const getUserByFieldResponse = await getUserByField({
          fieldToGet: "email",
          fieldValue: username,
        });

        setPageOwner(getUserByFieldResponse.data);
        isCurrentPageOwner = getUserByFieldResponse.data.id === user?.uid;

        const posts = await getPosts({
          postOwnerId: getUserByFieldResponse?.data.id,
        });

        setPostsList(posts.data instanceof Array ? posts.data : []);
      }
    };

    getPageOwnerData();
  }, [username]);

  async function handleUpdatePosts() {
    const returnedPosts = await getPosts({ postOwnerId: user?.uid });
    setPostsList(returnedPosts.data instanceof Array ? returnedPosts.data : []);
  }

  return (
    <>
      <ShortHeader />

      <section className={styles.userInfo}>
        <div>
          {isCurrentPageOwner ? (
            <ProfileImage
              photoURL={pageOwner?.photoURL}
              userName={pageOwner?.displayName}
            />
          ) : (
            <BasicProfileImage
              photoURL={pageOwner?.photoURL}
              username={pageOwner?.displayName}
            />
          )}
        </div>
        <div>
          {!isCurrentPageOwner && (
            <FollowUserButton
              following={
                pageOwner?.followers &&
                pageOwner?.followers.some(
                  (followerId: string) => followerId === user?.uid
                )
              }
              toggleTexts={["Follow", "Unfollow"]}
              onFollow={async () => {
                onFollowUser({
                  newFollowerId: user?.uid,
                  userFollowedId: pageOwner?.id,
                });
              }}
              onUnfollow={async () => {
                onUnfollowUser({
                  unfollowRequesterId: user?.uid,
                  accountToUnfollowId: pageOwner?.id,
                });
              }}
            />
          )}
          <h2 className={styles.userName}>{pageOwner?.displayName}</h2>
          <div className={styles.follows}>
            <span>Following: {pageOwner?.following?.length || "0"}</span>
            <span>Followers: {pageOwner?.followers?.length || "0"}</span>
          </div>
          <h3 className={styles.userEmail}>{pageOwner?.email}</h3>
        </div>
      </section>
      <hr className={styles.separator} />
      <section className={styles.userPosts}>
        {!!postsList.length ? (
          <PostWrapperCard
            isEditable={isCurrentPageOwner}
            postsList={postsList}
            onUpdatePosts={handleUpdatePosts}
            showPostOptions={showPostOptions}
            setShowPostOptions={setShowPostOptions}
          />
        ) : (
          <BasicMessageCard
            text="Humm... this user doesn't have any posts"
            iconType="noDocument"
          />
        )}
      </section>
    </>
  );
}

export default withAuth(ProfilePage);
