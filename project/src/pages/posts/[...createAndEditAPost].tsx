import { useEffect, useState } from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import HoverButton from "../../components/Buttons/HoverButton";
import TextComponent from "../../components/TextComponents/TextComponent";
import styles from "../../styles/posts/create-a-post.module.scss";

import docElementsProp from "../../models/DocElementsProp";

import { useRouter } from "next/router";
import { savePostController } from "../../controllers/savePostController";
import { useAuth } from "../../hooks/useAuth";

import BasicBurgerMenu from "../../components/BurgersMenu/BasicBurgerMenu";
import BasicMenu from "../../components/Menu/BasicMenu";
import BasicMessage from "../../components/Messages/BasicMessage";
import BasicMessageProps from "../../models/components/BasicMessageProps";

import dynamic from "next/dynamic";

import ChartDataProps, {
  ChartUseStateStructure,
} from "../../models/components/ChartDataProps";

import { getPosts } from "../../services/posts/getPosts";

import PostElementCard from "../../components/Cards/PostElementCard";
import CreateChartPopUp from "../../components/PopUps/CreateChartPopUp";
import CreateImagePopUp from "../../components/PopUps/CreateImagePopUp";
import CreateLinkPopUp from "../../components/PopUps/CreateLinkPopUp";

import { DocumentData } from "firebase/firestore";
import { handleAddElement } from "../../handlers/createPostHandlers/handleAddElement";
import { handleAddGraphic } from "../../handlers/createPostHandlers/handleAddGraphic";
import { handleAddImage } from "../../handlers/createPostHandlers/handleAddImage";
import { handleAddLink } from "../../handlers/createPostHandlers/handleAddLink";
import { handleEditPost } from "../../handlers/createPostHandlers/handleEditPost";
import { ImageDataProps } from "../../models/components/ImageDataProps";
import { LinkDataModel } from "../../models/components/LinkDataModel";
import {
  emptyChartModel,
  emptyImageModel,
  emptyLinkModel,
} from "../../utils/emptyModels";
import { useReducer } from "react";
import {
  initialVisualBoolean,
  VisualBooleanActionKind,
  visualBooleanReducer,
} from "../../reducers/createAndEditAPost/visualBooleanReducer";

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

  const [visualBooleanState, dispatchVisualBooleanState] = useReducer(
    visualBooleanReducer,
    initialVisualBoolean
  );

  // const [stepsPopUp, setStepsPopUp] = useState<boolean>(true);
  // const [showGraphicPopUp, setShowGraphicPopUp] = useState<boolean>(false);
  // const [showImageModal, setShowImageModal] = useState<boolean>(false);
  // const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  // const [showMenu, setShowMenu] = useState<boolean>(false);

  const [imageDataStructure, setImageDataStructure] =
    useState<ImageDataProps>(emptyImageModel);

  const [chartDataStructure, setChartDataStructure] =
    useState<ChartUseStateStructure>(emptyChartModel);

  const [linkDataStructure, setLinkDataStructure] =
    useState<LinkDataModel>(emptyLinkModel);

  const [nameInput, setNameInput] = useState<string>("");
  const [colorInput, setColorInput] = useState<string>("");
  const [seriesInput, setSeriesInput] = useState<string>("");

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
        const postsList = await getPosts({ postId });
        const currentPost: DocumentData =
          postsList.data instanceof Array ? postsList.data[0] : [];

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
        email: user?.email,
        photoURL: user?.photoURL,
      };

      const response = await savePostController({
        postName: postTitle,
        isPublic: isAPublicPost,
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
        showMenuState={visualBooleanState}
        dispatchShowMenu={dispatchVisualBooleanState}
        postData={{ postId, postBody }}
        docElements={docElements}
        setBasicMessageConfig={setBasicMessageConfig}
        isAPublicPost={isAPublicPost}
        setIsAPublicPost={setIsAPublicPost}
      />

      <CreateImagePopUp
        imageDataStructure={imageDataStructure}
        setImageDataStructure={setImageDataStructure}
        showImageModalState={visualBooleanState}
        dispatchShowImageModal={dispatchVisualBooleanState}
        setDocElements={setDocElements}
        handleAddImage={handleAddImage}
      />

      <CreateChartPopUp
        chartDataStructure={chartDataStructure}
        setChartDataStructure={setChartDataStructure}
        colorInput={colorInput}
        setColorInput={setColorInput}
        booleanVisibilityState={visualBooleanState}
        dispatchBooleanVisibility={dispatchVisualBooleanState}
        nameInput={nameInput}
        setNameInput={setNameInput}
        seriesInput={seriesInput}
        setSeriesInput={setSeriesInput}
        chartData={chartData}
        setChartData={setChartData}
        handleAddGraphic={() =>
          handleAddGraphic({
            chartDataStructure,
            chartData,
            docElements,
            setChartDataStructure,
            setDocElements,
            dispatchBooleanVisibility: dispatchVisualBooleanState,
          })
        }
      />

      <CreateLinkPopUp
        linkDataStructure={linkDataStructure}
        setLinkDataStructure={setLinkDataStructure}
        showLinkModalState={visualBooleanState}
        dispatchShowLinkModal={dispatchVisualBooleanState}
        handleAddLink={() =>
          handleAddLink({
            linkDataStructure,
            docElements,
            setLinkDataStructure,
            setDocElements,
            dispatchShowLinkModal: dispatchVisualBooleanState,
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
        <HoverButton
          onClickFunction={() =>
            dispatchVisualBooleanState({
              type: VisualBooleanActionKind.LINK_MODAL,
              isLinkModalVisible: true,
            })
          }
        >
          link
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            dispatchVisualBooleanState({
              type: VisualBooleanActionKind.IMAGE_MODAL,
              isImageModalVisible: true,
            })
          }
        >
          img
        </HoverButton>
        <HoverButton
          onClickFunction={() =>
            dispatchVisualBooleanState({
              type: VisualBooleanActionKind.GRAPHIC_POP_UP,
              isGraphicPopUpVisible: true,
            })
          }
        >
          Graphic
        </HoverButton>
        <BasicBurgerMenu
          position="end"
          onClickFunction={() =>
            dispatchVisualBooleanState({
              type: VisualBooleanActionKind.MENU,
              isMenuVisible: true,
            })
          }
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
                                contentEditable={false}
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
