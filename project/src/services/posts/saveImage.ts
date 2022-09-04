import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import PropsReturn from "../../models/core.response";
import { UserProfileProps } from "../../models/userTypes/UserProfileProps";

async function saveImage(imageFile: any): Promise<PropsReturn> {
  let imageData: UserProfileProps = {};
  try {
    const imageName = Date.now().toString();
    const storage = getStorage();
    const storageRef = ref(storage, "posts-images/" + imageName);

    const response = await uploadString(storageRef, imageFile, "data_url");
    const url = await getDownloadURL(storageRef);

    imageData = {
      url,
      name: response.ref.name,
      fullPath: response.ref.fullPath,
    };
  } catch (error: any) {
    return {
      message: "It wasn't possible to save your image!",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return { message: "Your image was successfuly saved!", data: imageData };
}

export default saveImage;
