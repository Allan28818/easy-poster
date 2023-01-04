import { RiMore2Fill } from "react-icons/ri";

import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

import { BsFillFileEarmarkImageFill } from "react-icons/bs";
import { MdPictureAsPdf } from "react-icons/md";
import styles from "../../styles/components/PDF/generate-PDF.module.scss";

interface GeneratePDFProps {
  htmlContent: React.MutableRefObject<HTMLDivElement>;
  docName: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<boolean>;
  orientation?: "portrait" | "landscape";
}

const GeneratePDF = (props: GeneratePDFProps) => {
  const { htmlContent, docName, orientation, isOpened, setIsOpened } = props;

  function handleMouseLeave(event: any) {
    event.target.style.background = "none";
  }

  function handleMouseMove(event: any) {
    const rect = event.target.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (event.target instanceof HTMLButtonElement) {
      event.target.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.2),rgba(255,255,255,0) )`;
    } else {
      event.target.parentElement.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.2),rgba(255,255,255,0) )`;
    }
  }

  async function generatePdf() {
    if (!!htmlContent) {
      const image = await toPng(htmlContent.current, {
        quality: 0.95,
        height: window.innerHeight,
        width: window.innerWidth,
      });
      const doc = new jsPDF({
        orientation: orientation ? orientation : "landscape",
      });

      const xPercentageCoord = orientation === "portrait" ? 0.0175 : 0.027;
      const yCoord = 0;
      const docWidth = orientation === "portrait" ? 0.175 : 0.25;
      const docHeight = orientation === "portrait" ? 0.2 : 0.25;

      doc.addImage(
        image,
        "JPEG",
        window.innerHeight * xPercentageCoord * -1,
        yCoord,
        window.innerWidth * docWidth,
        window.innerHeight * docHeight
      );

      /*
        portrait:
         doc.addImage(
        image,
        "JPEG",
        window.innerHeight * 0.0175 * -1,
        0,
        window.innerWidth * 0.175,
        window.innerHeight * 0.2
      );
      */

      doc.save(docName + ".pdf");
    }
  }

  async function generateImage() {
    if (!!htmlContent) {
      const image = await toPng(htmlContent.current, {
        quality: 0.95,
        height: window.innerHeight,
      });
      const link = document.createElement("a");
      const postBody = document.getElementById("post-body");

      link.href = image;
      link.download = docName + ".jpeg";

      postBody?.appendChild(link);
      link.click();
      postBody?.removeChild(link);
    }
  }

  return (
    <div className={styles.downloaderContainer}>
      {isOpened ? (
        <div
          className={styles.downloaderOptions}
          onMouseLeave={() => setIsOpened(false)}
        >
          <button
            onClick={async () => await generatePdf()}
            className={styles.downloaderBtn}
            onMouseLeave={(e) => handleMouseLeave(e)}
            onMouseMove={(e) => handleMouseMove(e)}
          >
            Generate PDF <MdPictureAsPdf className={styles.icon} />
          </button>
          <button
            onClick={async () => await generateImage()}
            className={styles.downloaderBtn}
            onMouseLeave={(e) => handleMouseLeave(e)}
            onMouseMove={(e) => handleMouseMove(e)}
          >
            Generate Image{" "}
            <BsFillFileEarmarkImageFill className={styles.icon} />
          </button>
        </div>
      ) : (
        <RiMore2Fill
          className={styles.moreDetails}
          onClick={() => setIsOpened(true)}
        />
      )}
    </div>
  );
};

export default GeneratePDF;
