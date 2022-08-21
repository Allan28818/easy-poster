import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../config/firebase";

interface getUsersProps {
  username: string;
}

async function getUsers(props: getUsersProps): Promise<DocumentData[]> {
  const { username } = props;

  let usersRef = query(collection(firestore, "users"), orderBy("email"));

  if (username) {
    const usernameMiddleLenght = Math.floor(username.length / 2);
    const usernameStartingCharacters = username.slice(0, usernameMiddleLenght);
    const usernameEndindCharacters = username.slice(-usernameMiddleLenght);
    console.log("there's an username");
    usersRef = query(
      collection(firestore, "users"),
      where("email", ">=", usernameStartingCharacters),
      where("email", "<", usernameEndindCharacters),
      orderBy("email")
    );
  }

  const usersSnapshot = await getDocs(usersRef);

  return usersSnapshot.docs.map((user) => user.data());
}

export { getUsers };
