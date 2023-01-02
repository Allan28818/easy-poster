import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../config/firebase";

import PropsReturn from "../../models/core.response";

interface onFollowUserProps {
  newFollowerId: string | null | undefined;
  userFollowedId: string | null | undefined;
}

interface onFollowUserPropsReturn extends PropsReturn {
  updatedUser: DocumentData;
}

interface isUserAlreadyFollowingProps {
  userFollowed: DocumentData;
  newFollowerId: string | null | undefined;
}

const onFollowUser = async (
  props: onFollowUserProps
): Promise<onFollowUserPropsReturn> => {
  const { newFollowerId, userFollowedId } = props;

  console.log("function executed");

  let updatedUser: DocumentData = {};

  if (newFollowerId === userFollowedId) {
    return {
      errorCode: "403",
      errorMessage: "Forbidden",
      message: "You cannot follow yourself!",
      updatedUser,
    };
  }

  try {
    const userFollowedRef = query(
      collection(firestore, "users"),
      where("id", "==", userFollowedId)
    );
    const newFollowerRef = query(
      collection(firestore, "users"),
      where("id", "==", newFollowerId)
    );
    const userFollowedData = (await getDocs(userFollowedRef)).docs.map((user) =>
      user.data()
    );
    const newFollowerData = (await getDocs(newFollowerRef)).docs.map((user) =>
      user.data()
    );

    const aleradyFollowing = isUserAlreadyFollowing({
      newFollowerId,
      userFollowed: userFollowedData,
    });

    if (aleradyFollowing) {
      return { message: "You're already following this user!", updatedUser };
    }

    const userFollowedFollowers = userFollowedData[0]?.followers || [];
    const newFollowerFollowingAccounts = newFollowerData[0]?.following || [];

    const updatedAt = serverTimestamp();

    userFollowedFollowers.push(newFollowerId);
    newFollowerFollowingAccounts.push(userFollowedId);

    await updateDoc(doc(firestore, "users", userFollowedId!), {
      followers: userFollowedFollowers,
      updatedAt,
    });

    await updateDoc(doc(firestore, "users", newFollowerId!), {
      following: newFollowerFollowingAccounts,
      updatedAt,
    });

    updatedUser = (await getDocs(userFollowedRef)).docs.map((user) =>
      user.data()
    )[0];
  } catch (error: any) {
    return {
      message: "It wasn't possible to finish the following operation!",
      errorCode: error.code,
      errorMessage: error.message,
      updatedUser,
    };
  }

  return { message: "Following operation was succeed!", updatedUser };
};

function isUserAlreadyFollowing(props: isUserAlreadyFollowingProps): boolean {
  const { newFollowerId, userFollowed } = props;

  return userFollowed?.followers?.some(
    (followerId: string) => followerId === newFollowerId
  );
}

export { onFollowUser };
