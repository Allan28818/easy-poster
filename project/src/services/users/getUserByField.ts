import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import PropsReturn from "../../models/core.response";
import { firestore } from "../config/firebase";

interface getUserByFieldProps {
  fieldToGet: string;
  fieldValue: string;
}

async function getUserByField(
  props: getUserByFieldProps
): Promise<PropsReturn> {
  const { fieldToGet, fieldValue } = props;

  let userToReturn: DocumentData;
  try {
    const userRef = query(
      collection(firestore, "users"),
      where(fieldToGet, "==", fieldValue)
    );
    const userSnapshot = await getDocs(userRef);
    const userMapped = userSnapshot.docs.map((user) => user.data());

    if (userMapped.length > 1) {
      throw new Error(
        "Choose a unique field! There's another(s) user(s) with the same data in this field!"
      );
    }

    userToReturn = userMapped[0];
  } catch (error: any) {
    return {
      errorCode: error.code,
      errorMessage: error.message,
      message:
        "It wasn't possible to get the user by the given field and value!",
    };
  }

  return { message: "User successfully found", data: userToReturn };
}

export { getUserByField };
