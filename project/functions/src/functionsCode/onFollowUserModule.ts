import { firestore } from "firebase-admin";
import { PropsReturn } from "../models/core.response";

interface onFollowUserModuleFunctionProps {
  newFollowerId: string;
  userFollowedId: string;
  db: FirebaseFirestore.Firestore;
}

const onFollowUserModuleFunction = async (
  props: onFollowUserModuleFunctionProps
): Promise<PropsReturn> => {
  const { newFollowerId, userFollowedId, db } = props;
  const userFollowedRef = db.collection("users").doc(userFollowedId);
  const newFollowerRef = db.collection("users").doc(newFollowerId);

  try {
    const userFollowedData = await userFollowedRef.get();
    const newFollowerData = await newFollowerRef.get();

    const userFollowedFollowers = userFollowedData.data()?.followers || [];
    const newFollowerFollowingAccounts =
      newFollowerData.data()?.following || [];

    const updatedAt = firestore.FieldValue.serverTimestamp();

    userFollowedFollowers.push(newFollowerId);
    newFollowerFollowingAccounts.push(userFollowedId);

    await userFollowedRef.update({
      followers: userFollowedFollowers,
      updatedAt,
    });

    await newFollowerRef.update({
      following: newFollowerFollowingAccounts,
      updatedAt,
    });
  } catch (error: any) {
    return {
      message: "It wasn't possible to finish the following operation!",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Following operation was succeed!" };
};

export { onFollowUserModuleFunction };
