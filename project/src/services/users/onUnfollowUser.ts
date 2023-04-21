import {
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  doc,
  DocumentData,
  limit,
} from "firebase/firestore";

import PropsReturn from "../../models/core.response";

import { firestore } from "../config/firebase";

interface onUnfollowUserProps {
  accountToUnfollowId: string | null | undefined;
  unfollowRequesterId: string | null | undefined;
}

interface onUnfollowUserPropsReturn extends PropsReturn {
  updatedUser: DocumentData;
}

const onUnfollowUser = async (
  props: onUnfollowUserProps
): Promise<onUnfollowUserPropsReturn> => {
  const { accountToUnfollowId, unfollowRequesterId } = props;

  if (accountToUnfollowId === unfollowRequesterId) {
    return {
      message: "You cannot unfollow yourself!",
      errorCode: "403",
      errorMessage: "Forbidden",
      updatedUser: {},
    };
  }

  try {
    const accountToUnfollowRef = query(
      collection(firestore, "users"),
      where("id", "==", accountToUnfollowId),
      limit(1)
    );

    const unfollowRequesterRef = query(
      collection(firestore, "users"),
      where("id", "==", unfollowRequesterId),
      limit(1)
    );
    const accountToUnfollowData = (
      await getDocs(accountToUnfollowRef)
    ).docs.map((user) => user.data())[0];

    const unfollowRequesterData = (
      await getDocs(unfollowRequesterRef)
    ).docs.map((user) => user.data())[0];

    const accountToUnfollowFollowers = accountToUnfollowData?.followers || [];
    const unfollowRequesterFollowingAccount =
      unfollowRequesterData?.following || [];

    const unfollowRequesterIndexInsideTheUserList =
      accountToUnfollowFollowers.indexOf(unfollowRequesterId);
    const userToUnfollowIndexInsideTheRequesterList =
      unfollowRequesterFollowingAccount.indexOf(accountToUnfollowId);

    const updatedAt = serverTimestamp();

    if (unfollowRequesterIndexInsideTheUserList !== -1) {
      accountToUnfollowFollowers.splice(
        unfollowRequesterIndexInsideTheUserList,
        1
      );
    }
    if (userToUnfollowIndexInsideTheRequesterList !== -1) {
      unfollowRequesterFollowingAccount.splice(
        userToUnfollowIndexInsideTheRequesterList,
        1
      );
    }

    await updateDoc(doc(firestore, "users", accountToUnfollowId!), {
      followers: accountToUnfollowFollowers,
      updatedAt,
    });

    await updateDoc(doc(firestore, "users", unfollowRequesterId!), {
      following: unfollowRequesterFollowingAccount,
      updatedAt,
    });

    return {
      message: "Unfollowing proccess was succeed!",
      updatedUser: (await getDocs(accountToUnfollowRef)).docs.map((user) =>
        user.data()
      )[0],
    };
  } catch (error: any) {
    return {
      message: "It wasn't possible to finish the unfollow operation",
      errorCode: error.code,
      errorMessage: error.message,
      updatedUser: {},
    };
  }
};

export { onUnfollowUser };
