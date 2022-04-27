//@ts-ignore
//@ts-nocheck
import { getDownloadURL } from "firebase/storage";
import PropsReturn from "../models/core.response";
import docElementsProp from "../models/DocElementsProp";
import saveImage from "../services/posts/saveImage";
import { savePost } from "../services/posts/savePost";

interface savePostControllerProps {
  postName: string;
  elementToMap: Element | HTMLImageElement | null;
  docElements: docElementsProp[];
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
  };
}

async function savePostController(
  props: savePostControllerProps
): Promise<PropsReturn> {
  const { elementToMap, docElements, creatorData, postName } = props;

  const childrenElements = Array.from(
    elementToMap?.children ? elementToMap.children : []
  );

  for (const [currentIndex, currentElement] of childrenElements.entries()) {
    const innerElement = currentElement.firstChild?.lastChild?.firstChild;

    if (currentElement.textContent && innerElement) {
      docElements[currentIndex].textContent =
        innerElement.textContent?.toString();
    } else if (innerElement instanceof HTMLImageElement) {
      if (innerElement.src) {
        const { url, storageRef } = await saveImage(innerElement.src);

        console.log("url", url);
        console.log(await getDownloadURL(storageRef));
        docElements[currentIndex].src = url;
      }
    }
  }

  const response = await savePost({ creatorData, post: docElements, postName });

  return response;
}

export { savePostController };
