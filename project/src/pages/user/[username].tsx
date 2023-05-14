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
import { FollowInfoPopUp } from "../../components/PopUps/FollowInfoPopUp";

function ProfilePage() {
  const { user } = useAuth();

  const router = useRouter();
  const { username } = router.query;

  const [state, disptach] = useReducer(userDataReducer, userDataInitialState);

  const [pageOwner, setPageOwner] = useState<DocumentData>();
  const [showPostOptions, setShowPostOptions] = useState<boolean>(false);

  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [popUpTitle, setPopUpTitle] = useState<string>("");
  const [popUpData, setPopUpData] = useState<DocumentData[]>([]);

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

        console.log("user", user);
        console.log("pageOwner", getUserByFieldResponse);

        disptach({
          type: ReducerActionKind.SET_INITIAL_DATA,
          amIFollowing: getUserByFieldResponse.data?.followers.some(
            (userId: string) => userId === user?.id
          ),
          amIPageOwner: getUserByFieldResponse.data?.email === user?.email,
          followers: getUserByFieldResponse.data?.followers,
          pageOwnerId: getUserByFieldResponse.data?.id,
          pageVisitorId: user?.id,
          userPostsList: posts.data,
        });

        disptach({
          type: ReducerActionKind.SET_POSTS,
          userPostsList: posts.data,
        });
      }
    };

    getPageOwnerData();
  }, [username, user]);

  async function handleUpdatePosts() {
    const returnedPosts = await getPosts({ postOwnerId: user?.id });
    disptach({
      type: ReducerActionKind.SET_POSTS,
      userPostsList: returnedPosts.data,
    });
  }

  async function handleFollow() {
    const response = await onFollowUser({
      newFollowerId: user?.id,
      userFollowedId: pageOwner?.id,
    });

    disptach({
      type: ReducerActionKind.FOLLOW_USER,
      followers: response?.updatedUser?.followers,
    });
  }

  async function handleUnfollow() {
    const response = await onUnfollowUser({
      unfollowRequesterId: user?.id,
      accountToUnfollowId: pageOwner?.id,
    });

    disptach({
      type: ReducerActionKind.UNFOLLOW_USER,
      followers: response.updatedUser.followers,
    });
  }

  async function handleFetchUsers(usersIds: string[]) {
    const users = [];

    for (const userId of usersIds) {
      const response = await getUserByField({
        fieldToGet: "id",
        fieldValue: userId,
      });
      console.log("response", response.data);

      if (typeof response?.data === "object") {
        users.push(response.data);
      }
    }

    return users;
  }

  console.log("state", state);

  return (
    <>
      <ShortHeader />
      <section className={styles.userInfo}>
        <div>
          {state.amIPageOwner ? (
            <ProfileImage
              photoURL={pageOwner?.photoURL}
              userName={pageOwner?.displayName}
              size={100}
            />
          ) : (
            <BasicProfileImage
              photoURL={pageOwner?.photoURL}
              username={pageOwner?.displayName}
            />
          )}
        </div>
        <div>
          {pageOwner?.id !== user?.id && (
            <FollowUserButton
              following={user?.following?.indexOf(pageOwner?.id) !== -1}
              toggleTexts={["Follow", "Unfollow"]}
              onFollow={async () => await handleFollow()}
              onUnfollow={async () => await handleUnfollow()}
            />
          )}
          <h2 className={styles.userName}>{pageOwner?.displayName}</h2>
          <div className={styles.follows}>
            <p
              className={styles.clickable}
              onClick={async () => {
                if (state?.following?.length) {
                  const users = await handleFetchUsers(state?.following);
                  setPopUpTitle("Following");
                  setPopUpData(users);
                  setShowPopUp(true);
                }
              }}
            >
              Following: {state?.following?.length || 0}
            </p>
            <p
              className={styles.clickable}
              onClick={async () => {
                if (state?.followers?.length) {
                  const users = await handleFetchUsers(state.followers);
                  setPopUpTitle("Followers");
                  setPopUpData(users);
                  setShowPopUp(true);

                  console.log("users", users);
                }
              }}
            >
              Followers: {state?.followers?.length || 0}
            </p>
            <p>Posts: {state.postsAmount}</p>
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
      <FollowInfoPopUp
        isVisible={showPopUp}
        setIsVisible={setShowPopUp}
        title={popUpTitle}
        users={popUpData}
      />
    </>
  );
}

export default withAuth(ProfilePage);
