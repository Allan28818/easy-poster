import { v4 as uuid } from "uuid";
import { LinkDataModel } from "../../models/components/LinkDataModel";
import docElementsProp from "../../models/DocElementsProp";
import { emptyLinkModel } from "../../utils/emptyModels";

interface handleAddLinkProps {
  linkDataStructure: LinkDataModel;
  docElements: docElementsProp[];
  setLinkDataStructure: React.Dispatch<React.SetStateAction<LinkDataModel>>;
  setShowLinkModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
}

function handleAddLink(props: handleAddLinkProps) {
  const {
    linkDataStructure,
    docElements,
    setLinkDataStructure,
    setShowLinkModal,
    setDocElements,
  } = props;

  if (linkDataStructure.linkSrc && linkDataStructure.linkText) {
    const linkToAdd: docElementsProp = {
      id: uuid(),
      textContent: linkDataStructure.linkText,
      src: linkDataStructure.linkSrc,
      elementName: "a",
      type: "a",
    };

    const docElementRef = Array.from(docElements);

    docElementRef.push(linkToAdd);

    setDocElements(docElementRef);
  }

  setLinkDataStructure(emptyLinkModel);

  setShowLinkModal(false);
}

export { handleAddLink };
