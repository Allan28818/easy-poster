import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { useRouter } from "next/router";

interface GeneratePDFProps {
  htmlContent: React.MutableRefObject<HTMLDivElement>;
  docName: string;
  orientation?: "portrait" | "landscape";
}

const GeneratePDF = (props: GeneratePDFProps) => {
  const { htmlContent, docName, orientation } = props;

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
    <div>
      <button onClick={async () => await generatePdf()}>Generate PDF</button>
      <button onClick={async () => await generateImage()}>
        Generate Image
      </button>
    </div>
  );
};

export default GeneratePDF;
