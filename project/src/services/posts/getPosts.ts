import {
  collection,
  DocumentData,
  getDocs,
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

  let postsRef = query(collection(firestore, "posts"));

  if (!!id && !!postOwnerId) {
    postsRef = query(
      collection(firestore, "posts"),
      where("id", "==", id),
      where("creatorData.id", "==", postOwnerId)
    );
  } else if (!!id) {
    postsRef = query(collection(firestore, "posts"), where("id", "==", id));
  } else if (!!postOwnerId) {
    postsRef = query(
      collection(firestore, "posts"),
      where("creatorData.id", "==", postOwnerId)
    );
  }

  const postsSnapshot = await getDocs(postsRef);

  return postsSnapshot.docs.map((post) => post.data());
}

export { getPosts };
