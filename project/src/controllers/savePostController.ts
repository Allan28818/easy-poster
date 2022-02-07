import PropsReturn from "../models/core.response";
import docElementsProp from "../models/DocElementsProp";
import { savePost } from "../services/posts/savePost";

interface savePostControllerProps {
  postName: string;
  elementToMap: Element | null;
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

  childrenElements.map((currentElement, currentIndex) => {
    if (currentElement.textContent) {
      docElements[currentIndex].textContent = currentElement.textContent;
    }
  });

  const response = await savePost({ creatorData, post: docElements, postName });

  return response;
}

export { savePostController };
