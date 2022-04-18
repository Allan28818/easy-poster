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
    if (currentElement.textContent) {
      docElements[currentIndex].textContent = currentElement.textContent;
    } else if (currentElement instanceof HTMLImageElement) {
      if (currentElement.src) {
        const { url } = await saveImage(currentElement.src);

        docElements[currentIndex].src = url;
      }
    }
  }

  console.log("docElements", docElements);

  const response = await savePost({ creatorData, post: docElements, postName });

  return response;
}

export { savePostController };
