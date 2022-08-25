import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

import ChartDataProps from "../../models/components/ChartDataProps";

import { getPosts } from "../../services/posts/getPosts";

import CreateChartPopUp from "../../components/PopUps/CreateChartPopUp";
import CreateImagePopUp from "../../components/PopUps/CreateImagePopUp";
import CreateLinkPopUp from "../../components/PopUps/CreateLinkPopUp";
import PostElementCard from "../../components/Cards/PostElementCard";

import { DocumentData } from "firebase/firestore";
import { handleAddElement } from "../../handlers/createPostHandlers/handleAddElement";
import { handleAddImage } from "../../handlers/createPostHandlers/handleAddImage";
import { handleAddGraphic } from "../../handlers/createPostHandlers/handleAddGraphic";
import { handleAddLink } from "../../handlers/createPostHandlers/handleAddLink";
import { handleEditPost } from "../../handlers/createPostHandlers/handleEditPost";

const Piechart: any = dynamic(
  () => import("../../components/Graphics/PieChart"),
  {
    ssr: false,
  }
);

const Donut: any = dynamic(() => import("../../components/Graphics/Donut"), {
  ssr: false,
});

const BarChart: any = dynamic(
  () => import("../../components/Graphics/BarChart"),
  {
    ssr: false,
  }
);

const LineChart: any = dynamic(
  () => import("../../components/Graphics/LineChart"),
  {
    ssr: false,
  }
);

const Radar: any = dynamic(() => import("../../components/Graphics/Radar"), {
  ssr: false,
});

function CreateAndEditAPost() {
  const router = useRouter();
  const routeParams = router.query;

  const postId =
    routeParams?.createAndEditAPost && routeParams?.createAndEditAPost[1];

  const [pageOperation, setPageOperation] = useState<"create" | "edit">(
    "create"
  );

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
  const [graphicLabels, setGraphicLabels] = useState<string>("");

  const [nameInput, setNameInput] = useState<string>("");
  const [seriesInput, setSeriesInput] = useState<string>("");

  const [linkText, setLinkText] = useState<string>("");
  const [linkSrc, setLinkSrc] = useState<string>("");

  const [chartData, setChartData] = useState<ChartDataProps[]>([]);

  const [postTitle, setPostTitle] = useState<string>("");

  const [isAPublicPost, setIsAPublicPost] = useState<boolean>(false);

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

  useEffect(() => {
    const handleFecthPost = async () => {
      if (!!postId) {
        console.log("edit");
        const postsList = await getPosts({ id: postId });
        const currentPost: DocumentData = postsList[0];

        setPageOperation("edit");

        if (!!currentPost) {
          setPostTitle(currentPost.postName);
          setDocElements(currentPost.postData);
        }
      }
      setPageOperation("create");
    };

    handleFecthPost();
  }, [postId]);

  async function handleSavePost() {
    if (postTitle) {
      const creatorData = {
        id: user?.uid,
        fullName: user?.displayName,
      };

      const response = await savePostController({
        postName: postTitle,
        elementToMap: postBody,
        creatorData,
        docElements,
      });

      if (response.errorCode) {
        setBasicMessageConfig({
          title: "Humm, we had a problem!",
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
          type: "error",
        });
      } else {
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

  function onDragEnd(result: any) {
    const items = Array.from(docElements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDocElements(items);
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
        pageOperation={pageOperation}
        handleSavePost={handleSavePost}
        handleEditPost={handleEditPost}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        postData={{ postId, postBody }}
        docElements={docElements}
        setBasicMessageConfig={setBasicMessageConfig}
        isAPublicPost={isAPublicPost}
        setIsAPublicPost={setIsAPublicPost}
      />

      <CreateImagePopUp
        srcText={srcText}
        setSrcText={setSrcText}
        altText={altText}
        setAltText={setAltText}
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        setDocElements={setDocElements}
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
        handleAddGraphic={() =>
          handleAddGraphic({
            chartData,
            chartTitle,
            graphicColors,
            graphicLabels,
            graphicSeries,
            graphicType,
            docElements,
            setChartTitle,
            setDocElements,
            setGraphicColors,
            setGraphicLabels,
            setGraphicSeries,
            setGraphicType,
            setShowGraphicPopUp,
            setStepsPopUp,
          })
        }
      />

      <CreateLinkPopUp
        showLinkModal={showLinkModal}
        setShowLinkModal={setShowLinkModal}
        linkSrc={linkSrc}
        setLinkSrc={setLinkSrc}
        linkText={linkText}
        setLinkText={setLinkText}
        handleAddLink={() =>
          handleAddLink({
            docElements,
            linkSrc,
            linkText,
            setDocElements,
            setLinkSrc,
            setLinkText,
            setShowLinkModal,
          })
        }
      />

      <header className={styles.tagsHeader}>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "h1", setDocElements })
          }
        >
          <h1>h1</h1>
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "h2", setDocElements })
          }
        >
          <h2>h2</h2>
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "h3", setDocElements })
          }
        >
          <h3>h3</h3>
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "h4", setDocElements })
          }
        >
          <h4>h4</h4>
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "h5", setDocElements })
          }
        >
          <h5>h5</h5>
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "h6", setDocElements })
          }
        >
          <h6>h6</h6>
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "p", setDocElements })
          }
        >
          <p>p</p>
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            handleAddElement({ elementName: "span", setDocElements })
          }
        >
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="post-elements">
          {(provided) => (
            <div
              id="post-body"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {docElements.map((currentElement, index) => {
                if (!!currentElement.src && currentElement.type === "img") {
                  return (
                    <Draggable
                      key={currentElement.id}
                      draggableId={currentElement.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <PostElementCard
                            index={index}
                            setDocElements={setDocElements}
                            docElements={docElements}
                          >
                            <img
                              src={currentElement.src}
                              alt={currentElement.alt}
                            />
                          </PostElementCard>
                        </div>
                      )}
                    </Draggable>
                  );
                } else if (currentElement.textContent && currentElement.src) {
                  return (
                    <Draggable
                      key={currentElement.id}
                      draggableId={currentElement.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <PostElementCard
                            index={index}
                            setDocElements={setDocElements}
                            docElements={docElements}
                          >
                            <a
                              id={currentElement.id}
                              href={currentElement.src}
                              target="_blank"
                              contentEditable={true}
                            >
                              {currentElement.textContent}
                            </a>
                          </PostElementCard>
                        </div>
                      )}
                    </Draggable>
                  );
                } else if (currentElement.textContent) {
                  return (
                    <Draggable
                      key={currentElement.id}
                      draggableId={currentElement.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <PostElementCard
                            index={index}
                            setDocElements={setDocElements}
                            docElements={docElements}
                          >
                            <TextComponent
                              key={currentElement.id}
                              id={currentElement.id}
                              elementName={currentElement.elementName}
                              textContent={currentElement.textContent}
                              isEditable={true}
                            />
                          </PostElementCard>
                        </div>
                      )}
                    </Draggable>
                  );
                } else if (!!currentElement.series) {
                  const chartOptions: any = {
                    pie: (
                      <Draggable
                        key={currentElement.id}
                        draggableId={currentElement.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <PostElementCard
                              index={index}
                              setDocElements={setDocElements}
                              docElements={docElements}
                            >
                              <Piechart
                                key={currentElement.id}
                                colors={currentElement.colors}
                                labels={currentElement.labels}
                                series={currentElement.series}
                              />
                            </PostElementCard>
                          </div>
                        )}
                      </Draggable>
                    ),
                    donut: (
                      <Draggable
                        key={currentElement.id}
                        draggableId={currentElement.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <PostElementCard
                              index={index}
                              setDocElements={setDocElements}
                              docElements={docElements}
                            >
                              <Donut
                                key={currentElement.id}
                                colors={currentElement.colors}
                                labels={currentElement.labels}
                                series={currentElement.series}
                              />
                            </PostElementCard>
                          </div>
                        )}
                      </Draggable>
                    ),
                    bar: (
                      <Draggable
                        key={currentElement.id}
                        draggableId={currentElement.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <PostElementCard
                              index={index}
                              setDocElements={setDocElements}
                              docElements={docElements}
                            >
                              <BarChart
                                title={currentElement.chartTitle}
                                xLabels={currentElement.labels}
                                series={currentElement.chartData}
                                colors={currentElement.colors}
                              />
                            </PostElementCard>
                          </div>
                        )}
                      </Draggable>
                    ),
                    line: (
                      <Draggable
                        key={currentElement.id}
                        draggableId={currentElement.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <PostElementCard
                              index={index}
                              setDocElements={setDocElements}
                              docElements={docElements}
                            >
                              <LineChart
                                title={currentElement.chartTitle}
                                xLabels={currentElement.labels}
                                series={currentElement.chartData}
                                colors={currentElement.colors}
                              />
                            </PostElementCard>
                          </div>
                        )}
                      </Draggable>
                    ),
                    radar: (
                      <Draggable
                        key={currentElement.id}
                        draggableId={currentElement.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <PostElementCard
                              index={index}
                              setDocElements={setDocElements}
                              docElements={docElements}
                            >
                              <Radar
                                title={currentElement.chartTitle}
                                xLabels={currentElement.labels}
                                series={currentElement.chartData}
                                colors={currentElement.colors}
                              />
                            </PostElementCard>
                          </div>
                        )}
                      </Draggable>
                    ),
                  };
                  return chartOptions[currentElement.type];
                }
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default CreateAndEditAPost;
