import PropsReturn from "../models/core.response";
import docElementsProp from "../models/DocElementsProp";
import saveImage from "../services/posts/saveImage";
import { savePost } from "../services/posts/savePost";

interface savePostControllerProps {
  postName: string;
  isPublic: boolean;
  elementToMap: Element | HTMLImageElement | null;
  docElements: docElementsProp[];
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
  };
}

async function savePostController(
  props: savePostControllerProps
): Promise<PropsReturn> {
  const { elementToMap, docElements, creatorData, postName, isPublic } = props;

  const childrenElements = Array.from(
    elementToMap?.children ? elementToMap.children : []
  );

  for (const [currentIndex, currentElement] of childrenElements.entries()) {
    const innerElement = currentElement.firstChild?.lastChild?.firstChild;

    if (currentElement.textContent && innerElement) {
      docElements[currentIndex].textContent =
        innerElement.textContent?.toString();
    } else if (innerElement instanceof HTMLImageElement) {
      if (innerElement.src && !docElements[currentIndex]?.externalContent) {
        const { data } = await saveImage(innerElement.src);
        docElements[currentIndex].src = data.url;
      }
    }
  }

  const response = await savePost({
    creatorData,
    post: docElements,
    postName,
    isPublic,
  });

  return response;
}

export { savePostController };
