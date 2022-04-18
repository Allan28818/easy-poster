import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

async function saveImage(imageFile: any) {
  try {
    const imageName = Date.now().toString();
    const storage = getStorage();
    const storageRef = ref(storage, "posts-images/" + imageName);

    const response = await uploadString(storageRef, imageFile, "data_url");
    const url = await getDownloadURL(storageRef);
    return {
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
}

export default saveImage;
