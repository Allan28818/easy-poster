import Image from "next/image";
import docElementsProp from "../models/DocElementsProp";

import { AiFillPieChart } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";

import TextComponent from "./TextComponents/TextComponent";

function HandleCreatePreview(currentElement: docElementsProp, styles: any) {
  if (!!currentElement.textContent && currentElement.type === "text-element") {
    return (
      <>
        <TextComponent
          id={currentElement.id}
          elementName={currentElement.elementName}
          textContent={currentElement.textContent + "..."}
          isEditable={false}
        />
      </>
    );
  } else if (!!currentElement.src && currentElement.type === "img") {
    return (
      <Image
        src={currentElement.src}
        alt={currentElement.alt ? currentElement.alt : ""}
        width={500}
        height={300}
        layout={"fixed"}
        objectFit={"cover"}
      />
    );
  } else if (!!currentElement.series) {
    return (
      <div className={styles.chartPreview}>
        <AiFillPieChart className={styles.icon} />
      </div>
    );
  }

  return (
    <div className={styles.unknownElement}>
      <TiWarningOutline />
    </div>
  );
}

export default HandleCreatePreview;
