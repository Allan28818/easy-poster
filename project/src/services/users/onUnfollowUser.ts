import {
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

import PropsReturn from "../../models/core.response";

import { firestore } from "../config/firebase";

interface onUnfollowUserProps {
  accountToUnfollowId: string;
  unfollowRequesterId: string;
}

const onUnfollowUserFunction = async (
  props: onUnfollowUserProps
): Promise<PropsReturn> => {
  const { accountToUnfollowId, unfollowRequesterId } = props;
  const accountToUnfollowRef = query(
    collection(firestore, "users"),
    where("id", "==", accountToUnfollowId)
  );
  const unfollowRequesterRef = query(
    collection(firestore, "users"),
    where("id", "==", unfollowRequesterId)
  );

  try {
    const accountToUnfollowData = (
      await getDocs(accountToUnfollowRef)
    ).docs.map((user) => user.data());
    const unfollowRequesterData = (
      await getDocs(unfollowRequesterRef)
    ).docs.map((user) => user.data());

    const accountToUnfollowFollowers =
      accountToUnfollowData[0]?.followers || [];
    const unfollowRequesterFollowingAccount =
      unfollowRequesterData[0]?.following || [];

    if (
      !accountToUnfollowFollowers.length ||
      !unfollowRequesterFollowingAccount.length
    ) {
      throw new Error(
        "No data found! Probably the unfollow-requester doesn't follow the user anymore or the user isn't inside the unfollow-requester following list!"
      );
    }

    const unfollowRequesterIndexInsideTheUserList =
      accountToUnfollowFollowers.indexOf(unfollowRequesterId);
    const userToUnfollowIndexInsideTheRequesterList =
      unfollowRequesterFollowingAccount.indexOf(accountToUnfollowId);

    const updatedAt = serverTimestamp();

    accountToUnfollowFollowers.splice(
      unfollowRequesterIndexInsideTheUserList,
      1
    );
    unfollowRequesterFollowingAccount.splice(
      userToUnfollowIndexInsideTheRequesterList,
      1
    );

    await updateDoc(doc(firestore, "users", accountToUnfollowId), {
      followers: accountToUnfollowFollowers,
      updatedAt,
    });

    await updateDoc(
      doc(firestore, "users", unfollowRequesterFollowingAccount),
      {
        following: unfollowRequesterFollowingAccount,
        updatedAt,
      }
    );
  } catch (error: any) {
    return {
      message: "It wasn't possible to finish the unfollow operation",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Unfollowing proccess was succeed!" };
};

export { onUnfollowUserFunction };
