import React from "react";

interface TextComponentProps {
  elementName: string;
  textContent: string;
}

const TextComponent = (props: TextComponentProps) => {
  const { elementName, textContent } = props;
  if (elementName === "h1") {
    return (
      <h1 contentEditable suppressContentEditableWarning>
        {textContent}
      </h1>
    );
  } else if (elementName === "h2") {
    return (
      <h2 contentEditable suppressContentEditableWarning>
        {textContent}
      </h2>
    );
  } else if (elementName === "h3") {
    return (
      <h3 contentEditable suppressContentEditableWarning>
        {textContent}
      </h3>
    );
  } else if (elementName === "h4") {
    return (
      <h4 contentEditable suppressContentEditableWarning>
        {textContent}
      </h4>
    );
  } else if (elementName === "h5") {
    return (
      <h5 contentEditable suppressContentEditableWarning>
        {textContent}
      </h5>
    );
  } else if (elementName === "h6") {
    return (
      <h6 contentEditable suppressContentEditableWarning>
        {" "}
        {textContent}
      </h6>
    );
  } else if (elementName === "span") {
    return (
      <span contentEditable suppressContentEditableWarning>
        {textContent}
      </span>
    );
  }
  return (
    <p contentEditable suppressContentEditableWarning>
      {textContent}
    </p>
  );
};

export default TextComponent;
