import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

interface saveImagePropsReturn {
  url?: string;
  name?: string;
  fullPath?: string;
  message: string;
  errorCode?: number;
  errorMessage?: string;
}

async function saveImage(imageFile: any): Promise<saveImagePropsReturn> {
  let imageData: saveImagePropsReturn = {
    message: "Unknown error",
  };
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
      message: "Your image was successfuly saved!",
    };
  } catch (error: any) {
    return {
      message: "It wasn't possible to save your image!",
      errorCode: error.code,
      errorMessage: error.message,
    };
  }

  return imageData;
}

export default saveImage;
