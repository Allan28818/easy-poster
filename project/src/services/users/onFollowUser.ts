import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../config/firebase";

import PropsReturn from "../../models/core.response";

interface onFollowUserProps {
  newFollowerId: string | null | undefined;
  userFollowedId: string | null | undefined;
}

async function onFollowUser(props: onFollowUserProps): Promise<PropsReturn> {
  const { newFollowerId, userFollowedId } = props;
  const userFollowedRef = query(
    collection(firestore, "users"),
    where("id", "==", userFollowedId)
  );
  const newFollowerRef = query(
    collection(firestore, "users"),
    where("id", "==", newFollowerId)
  );

  try {
    const userFollowedData = (await getDocs(userFollowedRef)).docs.map((user) =>
      user.data()
    );
    const newFollowerData = (await getDocs(newFollowerRef)).docs.map((user) =>
      user.data()
    );

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
  } catch (error: any) {
    return {
      message: "It wasn't possible to finish the following operation!",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Following operation was succeed!" };
}
export { onFollowUser };
