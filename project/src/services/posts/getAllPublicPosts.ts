import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PropsReturn from "../../models/core.response";
import { firestore } from "../config/firebase";

async function getAllPublicPosts(): Promise<PropsReturn> {
  let posts: DocumentData[];

  try {
    const postsQuery = query(
      collection(firestore, "posts"),
      where("isActive", "==", true),
      where("isPublic", "==", true),
      orderBy("createdAt")
    );
    const postsSnapshot = await getDocs(postsQuery);
    posts = postsSnapshot.docs.map((post) => post.data());
  } catch (error: any) {
    return {
      errorCode: error.code,
      errorMessage: error.message,
      message: "It wasn't possible to get the posts!",
    };
  }

  return {
    message: "All the public posts were successfully requested!",
    data: posts,
  };
}

export { getAllPublicPosts };
