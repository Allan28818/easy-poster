import admin from "firebase-admin";
import { PropsReturn } from "../models/core.response";

interface onUnfollowUserModuleFunctionProps {
  accountToUnfollowId: string;
  unfollowRequesterId: string;
  db: FirebaseFirestore.Firestore;
}

const onUnfollowUserModuleFunction = async (
  props: onUnfollowUserModuleFunctionProps
): Promise<PropsReturn> => {
  const { accountToUnfollowId, unfollowRequesterId, db } = props;
  const accountToUnfollowRef = db.collection("users").doc(accountToUnfollowId);
  const unfollowRequesterRef = db.collection("users").doc(unfollowRequesterId);

  try {
    const accountToUnfollowData = await accountToUnfollowRef.get();
    const unfollowRequesterData = await unfollowRequesterRef.get();

    const accountToUnfollowFollowers =
      accountToUnfollowData.data()?.followers || [];
    const unfollowRequesterFollowingAccount =
      unfollowRequesterData.data()?.following || [];

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

    const updatedAt = admin.firestore.FieldValue.serverTimestamp();

    accountToUnfollowFollowers.splice(
      unfollowRequesterIndexInsideTheUserList,
      1
    );
    unfollowRequesterFollowingAccount.splice(
      userToUnfollowIndexInsideTheRequesterList,
      1
    );

    await accountToUnfollowRef.update({
      followers: accountToUnfollowFollowers,
      updatedAt,
    });

    await unfollowRequesterRef.update({
      following: unfollowRequesterFollowingAccount,
      updatedAt,
    });
  } catch (error: any) {
    return {
      message: "It wasn't possible to finish the unfollow operation",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Unfollowing proccess was succeed!" };
};

export { onUnfollowUserModuleFunction };
