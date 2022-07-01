import PropsReturn from "../models/core.response";
import docElementsProp from "../models/DocElementsProp";
import { editPost } from "../services/posts/editPost";
import saveImage from "../services/posts/saveImage";

interface editPostController {
  postName: string;
  postId: string;
  elementToMap: Element | HTMLImageElement | null;
  docElements: docElementsProp[];
  creatorData: {
    id: string | null | undefined;
    fullName: string | null | undefined;
  };
}

async function editPostController(
  props: editPostController
): Promise<PropsReturn> {
  const { elementToMap, docElements, creatorData, postName, postId } = props;

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
        docElements[currentIndex].src = innerElement.src;
      }
    }
  }

  const response = await editPost({
    creatorData,
    postData: { post: docElements, postId },
    postName,
  });

  return response;
}

export { editPostController };
