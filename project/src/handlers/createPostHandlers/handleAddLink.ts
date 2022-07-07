import { v4 as uuid } from "uuid";
import docElementsProp from "../../models/DocElementsProp";

interface handleAddLinkProps {
  linkSrc: string;
  linkText: string;
  docElements: docElementsProp[];
  setLinkText: React.Dispatch<React.SetStateAction<string>>;
  setLinkSrc: React.Dispatch<React.SetStateAction<string>>;
  setShowLinkModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
}

function handleAddLink(props: handleAddLinkProps) {
  const {
    docElements,
    linkSrc,
    linkText,
    setLinkSrc,
    setLinkText,
    setShowLinkModal,
    setDocElements,
  } = props;

  if (linkSrc && linkText) {
    const linkToAdd: docElementsProp = {
      id: uuid(),
      textContent: linkText,
      src: linkSrc,
      elementName: "a",
      type: "a",
    };

    const docElementRef = Array.from(docElements);

    docElementRef.push(linkToAdd);

    setDocElements(docElementRef);
  }

  setLinkText("");
  setLinkSrc("");
  setShowLinkModal(false);
}

export { handleAddLink };
