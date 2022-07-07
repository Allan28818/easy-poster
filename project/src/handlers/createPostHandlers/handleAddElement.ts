import { v4 as uuid } from "uuid";
import docElementsProp from "../../models/DocElementsProp";

interface handleAddElementProps {
  elementName: string;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
}

function handleAddElement(props: handleAddElementProps) {
  const { elementName, setDocElements } = props;
  let elementToAdd = {
    id: uuid(),
    elementName,
    type: "text-element",
    textContent: elementName,
  };

  setDocElements((oldValues) => [...oldValues, elementToAdd]);
}

export { handleAddElement };
