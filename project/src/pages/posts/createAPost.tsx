import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import { GrFormClose } from "react-icons/gr";
import styles from "../../styles/posts/create-a-post.module.scss";
import HoverButton from "../../components/Buttons/HoverButton";
import TextComponent from "../../components/TextComponents/TextComponent";

import Doughnut from "../../components/Graphics/Doughnut";

import docElementsProp from "../../models/DocElementsProp";

import { savePostController } from "../../controllers/savePostController";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { IconContext } from "react-icons/lib";
import BasicMessage from "../../components/Messages/BasicMessage";
import BasicMessageProps from "../../models/components/BasicMessageProps";
import BasicMenu from "../../components/Menu/BasicMenu";

function CreateAPost() {
  const [docElements, setDocElements] = useState<docElementsProp[]>([]);

  const [stepsPopUp, setStepsPopUp] = useState<boolean>(true);

  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [showGraphicPopUp, setShowGraphicPopUp] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(true);

  const [srcText, setSrcText] = useState<string>("");
  const [altText, setAltText] = useState<string>("");

  const [caption, setCaption] = useState<string>("");
  const [subCaption, setSubCaption] = useState<string>("");
  const [graphicType, setGraphicType] = useState<string>("pie");
  const [graphicSeries, setGraphicSeries] = useState<string>("30, 30, 40");
  const [graphicColors, setGraphicColors] = useState<string>(
    "#2980b9, #2ecc71, #f1c40f"
  );

  const [title, setTitle] = useState<string>("Untitled");

  const [graphicLabels, setGraphicLabels] = useState<string>(
    "Label1, Label2, Label3"
  );
  const [graphicPrefix, setGraphicPrefix] = useState<string>("");

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
      textContent: elementName,
    };

    setDocElements((oldValues) => [...oldValues, elementToAdd]);
  };

  const handleAddImage = () => {
    let imageToAdd = {
      id: uuid(),
      elementName: "img",
      src: "",
      alt: "",
    };
    if (!!srcText) {
      imageToAdd.src = srcText;
      if (!!altText) {
        imageToAdd.alt = altText;
      }

      setDocElements((oldValues) => [...oldValues, imageToAdd]);
      console.log(docElements);
    }

    setSrcText("");
    setAltText("");
    setShowImageModal(false);
  };

  const handleAddGraphic = () => {
    const graphicLabelsArray = graphicLabels
      .split(",")
      .map((label) => label.trim());
    const graphicSeriesArray = graphicSeries
      .split(",")
      .map((serie) => serie.trim());

    const graphicToAdd: docElementsProp = {
      id: uuid(),
      elementName: `${graphicType}-chart`,
      type: graphicType,
      colors: graphicColors,
      labels: graphicLabelsArray,
      series: graphicSeriesArray,
      caption,
      subCaption,
      graphicPrefix,
    };

    const docElementRef = Array.from(docElements);

    docElementRef.push(graphicToAdd);

    setDocElements(docElementRef);
    setStepsPopUp(true);
    setGraphicColors("");
    setGraphicLabels("");
    setGraphicPrefix("");
    setGraphicSeries("");
    setGraphicType("");
    setCaption("");
    setSubCaption("");
    setShowGraphicPopUp(false);
  };

  async function handleSavePost() {
    const creatorData = {
      id: user.uid,
      fullName: user.displayName,
    };

    const response = await savePostController({
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
      <div className={showImageModal ? styles.imgPopUp : "hidden"}>
        <IconContext.Provider value={{ color: "#fff", size: "50px" }}>
          <GrFormClose
            className={styles.close}
            onClick={() => setShowImageModal(false)}
          />
        </IconContext.Provider>
        <div className={styles.card}>
          <h1>Type your image informations</h1>
          <label htmlFor="source">Image source</label>
          <input
            type="url"
            name="source"
            className={styles.required}
            placeholder="https://..."
            required
            value={srcText}
            onChange={(event) => setSrcText(event.target.value)}
          />
          <label htmlFor="alt">Alternative text (optional)</label>
          <input
            type="text"
            name="alt"
            className={styles.optional}
            placeholder="Texto da minha imagem"
            onChange={(event) => setAltText(event.target.value)}
          />
          <button onClick={handleAddImage} disabled={!srcText ? true : false}>
            Create
          </button>
        </div>
      </div>

      <div className={showGraphicPopUp ? styles.graphicPopUp : "hidden"}>
        <GrFormClose
          className={styles.close}
          onClick={() => setShowGraphicPopUp(false)}
        />
        <div className={styles.card}>
          <h1>Type your graphic informations</h1>

          {stepsPopUp ? (
            <>
              <div className={styles.formWrapper}>
                <label htmlFor="caption">Type your Caption</label>
                <input
                  name="caption"
                  placeholder="This is my graphic"
                  onChange={(e: any) => setCaption(e.target.value)}
                  value={caption}
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="sub-caption">
                  Type your sub caption (optional)
                </label>
                <input
                  name="sub-caption"
                  placeholder="And this is my description"
                  onChange={(e: any) => setSubCaption(e.target.value)}
                  value={subCaption}
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="graphicType">Select your graphic type</label>
                <select
                  name="graphicType"
                  onChange={(e: any) => setGraphicType(e.target.value)}
                >
                  <option value="pie">Pie</option>
                  <option value="doughnut">Doughnut</option>
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                  <option value="heatmap">Heatmap</option>
                  <option value="radar">Radar</option>
                  <option value="angulargauge">Angular Gauge</option>
                </select>
              </div>
              <button onClick={() => setStepsPopUp(false)}>Next</button>
            </>
          ) : (
            <>
              <div className={styles.formWrapper}>
                <label htmlFor="series">Type your series</label>
                <input
                  name="series"
                  placeholder="1, 2, 3, ..."
                  onChange={(e: any) => setGraphicSeries(e.target.value)}
                  value={graphicSeries}
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="colors">Type your graphic colors</label>
                <input
                  name="colors"
                  placeholder="#f00, #00f, #0f0..."
                  onChange={(e: any) => setGraphicColors(e.target.value)}
                  value={graphicColors}
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="labels">Type your graphic labels</label>
                <input
                  name="labels"
                  placeholder="dogs, cats, birds..."
                  onChange={(e: any) => setGraphicLabels(e.target.value)}
                  value={graphicLabels}
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="prefix">Type your data prefix</label>
                <input
                  name="prefix"
                  placeholder="$100"
                  onChange={(e: any) => setGraphicPrefix(e.target.value)}
                  value={graphicPrefix}
                />
              </div>
              <button
                type="submit"
                onClick={() => {
                  handleAddGraphic();
                  setStepsPopUp(true);
                  setGraphicColors("");
                  setGraphicLabels("");
                  setGraphicPrefix("");
                  setGraphicSeries("");
                  setGraphicType("");
                  setCaption("");
                  setSubCaption("");
                  setShowGraphicPopUp(false);
                }}
              >
                Create
              </button>
            </>
          )}
        </div>
      </div>
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
        <HoverButton onClickFunction={() => {}}>link</HoverButton>
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
        <button onClick={() => handleSavePost()}>Salvar</button>
      </header>

      <div id="post-body">
        {docElements.map((currentElement) => {
          if (!!currentElement.src) {
            return (
              <img
                key={currentElement.id}
                src={currentElement.src}
                alt={currentElement.alt}
              />
            );
          } else if (currentElement.textContent) {
            return (
              <TextComponent
                key={currentElement.id}
                id={currentElement.id}
                elementName={currentElement.elementName}
                textContent={currentElement.textContent}
              />
            );
          } else if (!!currentElement.type && !!currentElement.series) {
            return (
              <Doughnut
                key={currentElement.id}
                caption={currentElement.caption}
                subCaption={currentElement.subCaption}
                labels={currentElement.labels}
                paletteColors={currentElement.colors}
                series={currentElement.series}
                numberPrefix={currentElement.graphicPrefix}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default CreateAPost;
