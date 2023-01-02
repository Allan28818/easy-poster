import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import FollowUserButton from "../../components/Buttons/FollowUserButton";
import { BasicMessageCard } from "../../components/Cards/BasicMessageCard";
import PostWrapperCard from "../../components/Cards/PostWrapperCard";
import ShortHeader from "../../components/Headers/ShortHeader";
import { BasicProfileImage } from "../../components/Images/BasicProfileImage";
import ProfileImage from "../../components/Images/ProfileImage";
import withAuth from "../../components/withAuth";
import { useAuth } from "../../hooks/useAuth";
import {
  ReducerActionKind,
  userDataInitialState,
  userDataReducer,
} from "../../reducers/userDataReducer";
import { getPosts } from "../../services/posts/getPosts";
import { getUserByField } from "../../services/users/getUserByField";
import { onFollowUser } from "../../services/users/onFollowUser";
import { onUnfollowUser } from "../../services/users/onUnfollowUser";

import styles from "../../styles/user/profile-page.module.scss";

function ProfilePage() {
  const { user } = useAuth();

  const router = useRouter();
  const { username } = router.query;

  const [state, disptach] = useReducer(userDataReducer, userDataInitialState);

  const [pageOwner, setPageOwner] = useState<DocumentData>();
  const [postsList, setPostsList] = useState<DocumentData[]>([]);
  const [showPostOptions, setShowPostOptions] = useState<boolean>(false);

  useEffect(() => {
    const getPageOwnerData = async () => {
      if (!!username && typeof username === "string") {
        const getUserByFieldResponse = await getUserByField({
          fieldToGet: "email",
          fieldValue: username,
        });

        setPageOwner(getUserByFieldResponse.data);

        const posts = await getPosts({
          postOwnerId: getUserByFieldResponse?.data.id,
        });

        console.log("posts", posts);

        disptach({
          type: ReducerActionKind.SET_INITIAL_DATA,
          amIFollowing: getUserByFieldResponse.data?.followers.some(
            (userId: string) => userId === user?.uid
          ),
          followersAmount: getUserByFieldResponse.data?.followers.length,
          followingAmount: getUserByFieldResponse.data?.following.length,
          pageOwnerId: getUserByFieldResponse.data?.id,
          pageVisitorId: user?.uid,
          userPostsList: posts.data,
        });

        disptach({
          type: ReducerActionKind.SET_POSTS,
          userPostsList: posts.data,
        });
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
          {state.amIPageOwner ? (
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
          {pageOwner?.id !== user?.uid && (
            <FollowUserButton
              following={state.amIFollowing}
              toggleTexts={["Follow", "Unfollow"]}
              onFollow={async () => {
                const response = await onFollowUser({
                  newFollowerId: user?.uid,
                  userFollowedId: pageOwner?.id,
                });

                disptach({
                  type: ReducerActionKind.FOLLOW_USER,
                  followingAmount: response.updatedUser.following.length,
                  followersAmount: response.updatedUser.followers.length,
                });
              }}
              onUnfollow={async () => {
                const response = await onUnfollowUser({
                  unfollowRequesterId: user?.uid,
                  accountToUnfollowId: pageOwner?.id,
                });

                disptach({
                  type: ReducerActionKind.UNFOLLOW_USER,
                  followingAmount: response.updatedUser.following?.length,
                  followersAmount: response.updatedUser.followers?.length,
                });
              }}
            />
          )}
          <h2 className={styles.userName}>{pageOwner?.displayName}</h2>
          <div className={styles.follows}>
            <span>Following: {state.followingAmount}</span>
            <span>Followers: {state.followersAmount}</span>
            <span>Posts: {state.postsAmount}</span>
          </div>
          <h3 className={styles.userEmail}>{pageOwner?.email}</h3>
        </div>
      </section>
      <hr className={styles.separator} />
      <section className={styles.userPosts}>
        {state.postsAmount ? (
          <PostWrapperCard
            isEditable={state.amIPageOwner}
            postsList={state.userPostsList}
            onUpdatePosts={handleUpdatePosts}
            showPostOptions={showPostOptions}
            setShowPostOptions={setShowPostOptions}
          />
        ) : (
          <BasicMessageCard
            text={
              state.amIPageOwner
                ? "Add content to your page"
                : "Humm... this user doesn't have any public posts"
            }
            iconType="noDocument"
          />
        )}
      </section>
    </>
  );
}

export default withAuth(ProfilePage);
