import { updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import PropsReturn from "../../models/core.response";
import { UserProfileProps } from "../../models/userTypes/UserProfileProps";

import { auth } from "../config/firebase";

async function updateProfileImageService(
  imageFile: string
): Promise<PropsReturn> {
  const user = auth.currentUser;

  let imageData: UserProfileProps = {};
  try {
    const imageName = Date.now().toString();
    const storage = getStorage();
    const storageRef = ref(storage, "users-profile-images/" + imageName);

    const response = await uploadString(storageRef, imageFile, "data_url");
    const url = await getDownloadURL(storageRef);

    imageData = {
      url,
      name: response.ref.name,
      fullPath: response.ref.fullPath,
    };

    if (!user) {
      throw new Error("User doesn't exists! Try it later...");
    }

    await updateProfile(user, { photoURL: url });
  } catch (error: any) {
    return {
      message: "It wasn't possible to save your image!",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Your profile image was updated", data: imageData };
}

export default updateProfileImageService;
