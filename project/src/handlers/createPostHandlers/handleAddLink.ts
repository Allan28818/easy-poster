import { Dispatch } from "react";
import { v4 as uuid } from "uuid";
import { LinkDataModel } from "../../models/components/LinkDataModel";
import docElementsProp from "../../models/DocElementsProp";
import {
  VisualBooleanAction,
  VisualBooleanActionKind,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";
import { emptyLinkModel } from "../../utils/emptyModels";

interface handleAddLinkProps {
  linkDataStructure: LinkDataModel;
  docElements: docElementsProp[];
  setLinkDataStructure: React.Dispatch<React.SetStateAction<LinkDataModel>>;
  dispatchShowLinkModal: Dispatch<VisualBooleanAction>;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
}

function handleAddLink(props: handleAddLinkProps) {
  const {
    linkDataStructure,
    docElements,
    setLinkDataStructure,
    dispatchShowLinkModal,
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

  dispatchShowLinkModal({
    type: VisualBooleanActionKind.LINK_MODAL,
    isLinkModalVisible: false,
  });
}

export { handleAddLink };
