import { updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import { auth } from "../config/firebase";

interface updateProfileImagePropsReturn {
  url?: string;
  name?: string;
  fullPath?: string;
  message: string;
  errorCode?: number;
  errorMessage?: string;
}

async function updateProfileImageService(
  imageFile: string
): Promise<updateProfileImagePropsReturn> {
  const user = auth.currentUser;

  let imageData: updateProfileImagePropsReturn = {
    message: "Unknown error",
  };
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
      message: "Your image was successfuly saved!",
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

  return imageData;
}

export default updateProfileImageService;
