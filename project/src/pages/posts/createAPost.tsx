import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import styles from "../../styles/posts/create-a-post.module.scss";
import HoverButton from "../../components/Buttons/HoverButton";
import TextComponent from "../../components/TextComponents/TextComponent";

import docElementsProp from "../../models/DocElementsProp";

import { savePostController } from "../../controllers/savePostController";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

import BasicMessage from "../../components/Messages/BasicMessage";
import BasicMessageProps from "../../models/components/BasicMessageProps";
import BasicMenu from "../../components/Menu/BasicMenu";
import BasicBurgerMenu from "../../components/BurgersMenu/BasicBurgerMenu";

import dynamic from "next/dynamic";
import CreateChartPopUp from "../../components/PopUps/CreateChartPopUp";
import ChartDataProps from "../../models/components/ChartDataProps";
import CreateImagePopUp from "../../components/PopUps/CreateImagePopUp";
import CreateLinkPopUp from "../../components/PopUps/CreateLinkPopUp";
import saveImage from "../../services/posts/saveImage";

const Piechart = dynamic(() => import("../../components/Graphics/PieChart"), {
  ssr: false,
});

const Donut = dynamic(() => import("../../components/Graphics/Donut"), {
  ssr: false,
});

const BarChart = dynamic(() => import("../../components/Graphics/BarChart"), {
  ssr: false,
});

const LineChart = dynamic(() => import("../../components/Graphics/LineChart"), {
  ssr: false,
});

const Radar = dynamic(() => import("../../components/Graphics/Radar"), {
  ssr: false,
});

function CreateAPost() {
  const [docElements, setDocElements] = useState<docElementsProp[]>([]);

  const [stepsPopUp, setStepsPopUp] = useState<boolean>(true);

  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [showGraphicPopUp, setShowGraphicPopUp] = useState<boolean>(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [srcText, setSrcText] = useState<string | string[]>("");
  const [altText, setAltText] = useState<string | string[]>("");

  const [chartTitle, setChartTitle] = useState<string>("");
  const [graphicType, setGraphicType] = useState<string>("pie");
  const [graphicSeries, setGraphicSeries] = useState<string>("");
  const [colorInput, setColorInput] = useState<string>("");
  const [graphicColors, setGraphicColors] = useState<string[]>([]);

  const [nameInput, setNameInput] = useState<string>("");
  const [seriesInput, setSeriesInput] = useState<string>("");

  const [linkText, setLinkText] = useState<string>("");
  const [linkSrc, setLinkSrc] = useState<string>("");

  const [chartData, setChartData] = useState<ChartDataProps[]>([]);

  const [title, setTitle] = useState<string>("");

  const [graphicLabels, setGraphicLabels] = useState<string>("");

  const [basicMessageConfig, setBasicMessageConfig] =
    useState<BasicMessageProps>({
      showMessage: false,
      title: "",
      description: "",
      type: "info",
      onConfirm: () => {},
    });

  const { user } = useAuth();
  const history = useRouter();

  const postBody = document.querySelector("#post-body");

  const handleAddElement = (elementName: string) => {
    let elementToAdd = {
      id: uuid(),
      elementName,
      type: "text-element",
      textContent: elementName,
    };

    setDocElements((oldValues) => [...oldValues, elementToAdd]);
  };

  const handleAddImage = async () => {
    let imageToAdd = {
      id: uuid(),
      elementName: "img",
      src: "",
      alt: "",
      type: "img",
    };
    if (!!srcText && !Array.isArray(srcText)) {
      imageToAdd.src = srcText;

      if (!!altText && !Array.isArray(altText)) {
        imageToAdd.alt = altText;
      }
      setDocElements((oldValues) => [...oldValues, imageToAdd]);
    } else if (!!srcText && Array.isArray(srcText)) {
      let imagesToAdd: any = [];

      for (const [index, image] of srcText.entries()) {
        let imageSrc: any = image;
        const response = saveImage(image).then((res) => (imageSrc = res.url));

        imagesToAdd.push({
          id: uuid(),
          elementName: "img",
          src: image,
          alt: altText[index],
          type: "img",
        });
      }

      setDocElements((oldValues) => [...oldValues, ...imagesToAdd]);
    }

    setSrcText("");
    setAltText("");
    setShowImageModal(false);
  };

  const handleAddGraphic = () => {
    const graphicLabelsArray = graphicLabels
      ?.split(",")
      .map((label) => label.trim());
    const graphicSeriesArray = graphicSeries
      .split(",")
      .map((serie) => parseInt(serie.trim()));

    const graphicToAdd: docElementsProp = {
      id: uuid(),
      elementName: graphicType,
      type: graphicType,
      colors: graphicColors,
      labels: graphicLabelsArray,
      series: graphicSeriesArray,
      chartTitle,
      chartData,
    };

    const docElementRef = Array.from(docElements);

    docElementRef.push(graphicToAdd);

    setDocElements(docElementRef);
    setStepsPopUp(true);
    setGraphicColors([]);
    setGraphicLabels("");
    setGraphicSeries("");
    setGraphicType("");
    setChartTitle("");
    setShowGraphicPopUp(false);
  };

  const handleAddLink = () => {
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
  };

  async function handleSavePost() {
    if (title) {
      const creatorData = {
        id: user.uid,
        fullName: user.displayName,
      };

      console.log(docElements.filter((element) => element.type === "img"));

      const response = await savePostController({
        postName: title,
        elementToMap: postBody,
        creatorData,
        docElements,
      });

      setBasicMessageConfig({
        title: "Your post was saved!",
        description: response.message,
        onConfirm: () => {
          history.push("/");
          setBasicMessageConfig({
            title: "",
            description: "",
            onConfirm: () => {},
            showMessage: false,
            type: "success",
          });
        },
        showMessage: true,
        type: "success",
      });
      return;
    }

    setBasicMessageConfig({
      title: "Insuficient data!",
      description: "You must give a title to your post!",
      onConfirm: () => {
        setBasicMessageConfig({
          title: "",
          description: "",
          onConfirm: () => {},
          showMessage: false,
          type: "success",
        });
      },
      showMessage: true,
      type: "error",
    });
    return;
  }

  return (
    <>
      <BasicMessage
        title={basicMessageConfig.title}
        description={basicMessageConfig.description}
        showMessage={basicMessageConfig.showMessage}
        onConfirm={basicMessageConfig.onConfirm}
        type={basicMessageConfig.type}
      />
      <BasicMenu
        handleSavePost={handleSavePost}
        title={title}
        setTitle={setTitle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      <CreateImagePopUp
        srcText={srcText}
        setSrcText={setSrcText}
        altText={altText}
        setAltText={setAltText}
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        handleAddImage={handleAddImage}
      />

      <CreateChartPopUp
        chartTitle={chartTitle}
        setChartTitle={setChartTitle}
        colorInput={colorInput}
        setColorInput={setColorInput}
        graphicColors={graphicColors}
        setGraphicColors={setGraphicColors}
        graphicLabels={graphicLabels}
        setGraphicLabels={setGraphicLabels}
        graphicSeries={graphicSeries}
        setGraphicSeries={setGraphicSeries}
        graphicType={graphicType}
        setGraphicType={setGraphicType}
        showGraphicPopUp={showGraphicPopUp}
        setShowGraphicPopUp={setShowGraphicPopUp}
        stepsPopUp={stepsPopUp}
        setStepsPopUp={setStepsPopUp}
        nameInput={nameInput}
        setNameInput={setNameInput}
        seriesInput={seriesInput}
        setSeriesInput={setSeriesInput}
        chartData={chartData}
        setChartData={setChartData}
        handleAddGraphic={handleAddGraphic}
      />

      <CreateLinkPopUp
        showLinkModal={showLinkModal}
        setShowLinkModal={setShowLinkModal}
        linkSrc={linkSrc}
        setLinkSrc={setLinkSrc}
        linkText={linkText}
        setLinkText={setLinkText}
        handleAddLink={handleAddLink}
      />

      <header className={styles.tagsHeader}>
        <HoverButton onClickFunction={() => handleAddElement("h1")}>
          <h1>h1</h1>
        </HoverButton>
        <HoverButton onClickFunction={() => handleAddElement("h2")}>
          <h2>h2</h2>
        </HoverButton>
        <HoverButton onClickFunction={() => handleAddElement("h3")}>
          <h3>h3</h3>
        </HoverButton>
        <HoverButton onClickFunction={() => handleAddElement("h4")}>
          <h4>h4</h4>
        </HoverButton>
        <HoverButton onClickFunction={() => handleAddElement("h5")}>
          <h5>h5</h5>
        </HoverButton>
        <HoverButton onClickFunction={() => handleAddElement("h6")}>
          <h6>h6</h6>
        </HoverButton>
        <HoverButton onClickFunction={() => handleAddElement("p")}>
          <p>p</p>
        </HoverButton>
        <HoverButton onClickFunction={() => handleAddElement("span")}>
          <span>span</span>
        </HoverButton>
        <HoverButton onClickFunction={() => setShowLinkModal(true)}>
          link
        </HoverButton>
        <HoverButton
          onClickFunction={() => {
            setShowImageModal(true);
          }}
        >
          img
        </HoverButton>
        <HoverButton onClickFunction={() => setShowGraphicPopUp(true)}>
          Graphic
        </HoverButton>
        <BasicBurgerMenu
          position="end"
          onClickFunction={() => setShowMenu(true)}
        />
      </header>

      <div id="post-body">
        {docElements.map((currentElement) => {
          if (!!currentElement.src && currentElement.type === "img") {
            return (
              <img
                key={currentElement.id}
                src={currentElement.src}
                alt={currentElement.alt}
              />
            );
          } else if (currentElement.textContent && currentElement.src) {
            return (
              <a href={currentElement.src} target="_blank">
                {currentElement.textContent}
              </a>
            );
          } else if (currentElement.textContent) {
            return (
              <TextComponent
                key={currentElement.id}
                id={currentElement.id}
                elementName={currentElement.elementName}
                textContent={currentElement.textContent}
                isEditable={true}
              />
            );
          } else if (!!currentElement.series) {
            const chartOptions: any = {
              pie: (
                <Piechart
                  key={currentElement.id}
                  colors={currentElement.colors}
                  labels={currentElement.labels}
                  series={currentElement.series}
                />
              ),
              donut: (
                <Donut
                  key={currentElement.id}
                  colors={currentElement.colors}
                  labels={currentElement.labels}
                  series={currentElement.series}
                />
              ),
              bar: (
                <BarChart
                  title={currentElement.chartTitle}
                  xLabels={currentElement.labels}
                  series={currentElement.chartData}
                  colors={currentElement.colors}
                />
              ),
              line: (
                <LineChart
                  title={currentElement.chartTitle}
                  xLabels={currentElement.labels}
                  series={currentElement.chartData}
                  colors={currentElement.colors}
                />
              ),
              radar: (
                <Radar
                  title={currentElement.chartTitle}
                  xLabels={currentElement.labels}
                  series={currentElement.chartData}
                  colors={currentElement.colors}
                />
              ),
            };

            return chartOptions[currentElement.type];
          }
        })}
      </div>
    </>
  );
}

export default CreateAPost;
