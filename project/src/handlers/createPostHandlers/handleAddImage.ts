import { v4 as uuid } from "uuid";
import { ImageDataProps } from "../../models/components/ImageDataProps";
import docElementsProp from "../../models/DocElementsProp";
import saveImage from "../../services/posts/saveImage";
import { emptyImageModel } from "../../utils/emptyModels";

export interface handleAddImageProps {
  imageDataStructure: ImageDataProps;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
  setImageDataStructure: React.Dispatch<React.SetStateAction<ImageDataProps>>;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface addASingleImageProps {
  srcText: string;
  altText?: string | string[];
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
}

interface addAnImageSetProps {
  srcText: string[];
  altText?: string | string[];
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
}

interface imageComponentProps {
  id: string;
  elementName: string;
  src: string;
  type: string;
  alt?: string;
  externalContent?: boolean;
}

async function handleAddImage(props: handleAddImageProps) {
  const {
    imageDataStructure,
    setDocElements,
    setImageDataStructure,
    setShowImageModal,
  } = props;

  if (
    !!imageDataStructure.srcText &&
    !Array.isArray(imageDataStructure.srcText)
  ) {
    addASingleImage({
      srcText: imageDataStructure.srcText,
      altText: imageDataStructure.altText,
      setDocElements,
    });
  } else if (
    !!imageDataStructure.srcText &&
    Array.isArray(imageDataStructure.srcText)
  ) {
    addAnImageSet({
      srcText: imageDataStructure.srcText,
      altText: imageDataStructure.altText,
      setDocElements,
    });
  }

  setImageDataStructure(emptyImageModel);

  setShowImageModal(false);
}

function addASingleImage(props: addASingleImageProps) {
  const { srcText, altText, setDocElements } = props;

  let imageToAdd: imageComponentProps = {
    id: uuid(),
    elementName: "img",
    src: "",
    alt: "",
    type: "img",
    externalContent: false,
  };

  imageToAdd.src = srcText;
  imageToAdd.externalContent = true;

  if (!!altText && !Array.isArray(altText)) {
    imageToAdd.alt = altText;
  }
  setDocElements((oldValues) => [...oldValues, imageToAdd]);
}

function addAnImageSet(props: addAnImageSetProps) {
  const { srcText, altText, setDocElements } = props;

  let imagesToAdd: any = [];

  for (const [index, image] of srcText.entries()) {
    let imageSrc: any = image;
    saveImage(image).then((res) => (imageSrc = res.data.url));

    let currentImageToAdd: imageComponentProps = {
      id: uuid(),
      elementName: "img",
      src: image,
      type: "img",
    };

    if (altText) {
      currentImageToAdd.alt = altText[index];
    }

    imagesToAdd.push(currentImageToAdd);
  }

  setDocElements((oldValues) => [...oldValues, ...imagesToAdd]);
}

export { handleAddImage };
