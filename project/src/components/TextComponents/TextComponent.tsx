import React from "react";
import docElementsProp from "../../models/DocElementsProp";

interface TextComponentProps {
  id: string;
  elementName: string;
  textContent: string;
  isEditable?: boolean;
}

const TextComponent = (props: TextComponentProps) => {
  const { id, elementName, textContent, isEditable } = props;

  if (elementName === "h1") {
    return (
      <h1
        id={id}
        contentEditable={isEditable !== false ? true : false}
        suppressContentEditableWarning
      >
        {textContent}
      </h1>
    );
  } else if (elementName === "h2") {
    return (
      <h2
        id={id}
        contentEditable={isEditable !== false ? true : false}
        suppressContentEditableWarning
      >
        {textContent}
      </h2>
    );
  } else if (elementName === "h3") {
    return (
      <h3
        id={id}
        contentEditable={isEditable !== false ? true : false}
        suppressContentEditableWarning
      >
        {textContent}
      </h3>
    );
  } else if (elementName === "h4") {
    return (
      <h4
        id={id}
        contentEditable={isEditable !== false ? true : false}
        suppressContentEditableWarning
      >
        {textContent}
      </h4>
    );
  } else if (elementName === "h5") {
    return (
      <h5
        id={id}
        contentEditable={isEditable !== false ? true : false}
        suppressContentEditableWarning
      >
        {textContent}
      </h5>
    );
  } else if (elementName === "h6") {
    return (
      <h6
        id={id}
        contentEditable={isEditable !== false ? true : false}
        suppressContentEditableWarning
      >
        {" "}
        {textContent}
      </h6>
    );
  } else if (elementName === "span") {
    return (
      <span id={id} contentEditable={isEditable} suppressContentEditableWarning>
        {textContent}
      </span>
    );
  }
  return (
    <p id={id} contentEditable={isEditable} suppressContentEditableWarning>
      {textContent}
    </p>
  );
};

export default TextComponent;
