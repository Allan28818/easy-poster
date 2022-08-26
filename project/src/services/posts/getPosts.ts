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
import { firestore } from "../config/firebase";

interface getPostsProps {
  id?: string | string[];
  postOwnerId?: string | null;
}

async function getPosts(props: getPostsProps): Promise<DocumentData[]> {
  const { id, postOwnerId } = props;

  let postsRef: Query<DocumentData>;
  let postsSnapshot: QuerySnapshot<DocumentData> =
    {} as QuerySnapshot<DocumentData>;

  if (!!id && !!postOwnerId) {
    postsRef = query(
      collection(firestore, "posts"),
      where("id", "==", id),
      where("creatorData.id", "==", postOwnerId),
      where("isActive", "==", true),
      orderBy("createdAt")
    );

    postsSnapshot = await getDocs(postsRef);
  } else if (!!id) {
    postsRef = query(
      collection(firestore, "posts"),
      where("id", "==", id),
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

  const mappedPosts = postsSnapshot.docs?.map((post) => post.data());
  return mappedPosts || [];
}

export { getPosts };
