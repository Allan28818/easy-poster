import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import PropsReturn from "../../models/core.response";
import { firestore } from "../config/firebase";

interface getPostsProps {
  postId?: string | string[];
  postOwnerId?: string | null;
}

async function getPosts(props: getPostsProps): Promise<PropsReturn> {
  const { postId, postOwnerId } = props;

  let postsRef: Query<DocumentData>;
  let postsSnapshot: QuerySnapshot<DocumentData> =
    {} as QuerySnapshot<DocumentData>;

  let mappedPosts: DocumentData[];

  try {
    if (!!postId && !!postOwnerId) {
      postsRef = query(
        collection(firestore, "posts"),
        where("id", "==", postId),
        where("creatorData.id", "==", postOwnerId),
        where("isActive", "==", true),
        orderBy("createdAt")
      );

      postsSnapshot = await getDocs(postsRef);
    } else if (!!postId) {
      postsRef = query(
        collection(firestore, "posts"),
        where("id", "==", postId),
        where("isActive", "==", true),
        orderBy("createdAt")
      );
      postsSnapshot = await getDocs(postsRef);
    } else if (!!postOwnerId) {
      postsRef = query(
        collection(firestore, "posts"),
        where("creatorData.id", "==", postOwnerId),
        where("isActive", "==", true),
        orderBy("createdAt")
      );
      postsSnapshot = await getDocs(postsRef);
    }

    mappedPosts = postsSnapshot.docs?.map((post) => post.data());
  } catch (error: any) {
    return {
      errorCode: error.code,
      errorMessage: error.message,
      message: "It wasn't possible to get your posts!",
    };
  }
  return {
    message: "All the posts were successfully requested!",
    data: mappedPosts,
  };
}

export { getPosts };
