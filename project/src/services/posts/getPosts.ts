import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../config/firebase";

interface getPostsProps {
  id?: string | string[];
  postOwnerId?: string | null;
}

async function getPosts(props: getPostsProps): Promise<DocumentData[]> {
  const { id, postOwnerId } = props;

  let postsRef = query(
    collection(firestore, "posts"),
    where("isActive", "==", true),
    orderBy("createdAt")
  );

  if (!!id && !!postOwnerId) {
    postsRef = query(
      collection(firestore, "posts"),
      where("id", "==", id),
      where("creatorData.id", "==", postOwnerId),
      where("isActive", "==", true),
      orderBy("createdAt")
    );
  } else if (!!id) {
    postsRef = query(
      collection(firestore, "posts"),
      where("id", "==", id),
      where("isActive", "==", true),
      orderBy("createdAt")
    );
  } else if (!!postOwnerId) {
    postsRef = query(
      collection(firestore, "posts"),
      where("creatorData.id", "==", postOwnerId),
      where("isActive", "==", true),
      orderBy("createdAt")
    );
  }

  const postsSnapshot = await getDocs(postsRef);

  return postsSnapshot.docs.map((post) => post.data());
}

export { getPosts };
