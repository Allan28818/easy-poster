import React, { useState } from "react";

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as yup from "yup";

import { GrFormClose } from "react-icons/gr";

import styles from "../../styles/posts/create-a-post.module.scss";

interface GraphicFormOptions {
  graphicType: string;
  colors: string;
  labels: string;
  series: string;
}

function CreateAPost() {
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [showGraphicModal, setShowGraphicModal] = useState<boolean>(false);

  const [srcText, setSrcText] = useState<string>("");
  const [altText, setAltText] = useState<string>("");

  const schema = yup.object().shape({
    type: yup.string().required("Your graphic type is a required field"),
    colors: yup
      .string()
      .min(4, "Colors may have at least 4 characters")
      .required("Colors are a required field!"),
    labels: yup.string().required("Colors are a required field!"),
    series: yup
      .string()
      .min(3, "Serires may have at least 3 characters")
      .required("Colors are a required field!"),
  });

  const initialValues: GraphicFormOptions = {
    graphicType: "",
    colors: "",
    labels: "",
    series: "",
  };

  const handleAddElement = (elementName: string) => {
    const postBody = document.querySelector("#post-body");
    const elementToAdd = document.createElement(elementName);

    elementToAdd.setAttribute("contentEditable", "true");
    elementToAdd.innerText = elementName;

    postBody?.appendChild(elementToAdd);
  };

  const handleAddImage = () => {
    const postBody = document.querySelector("#post-body");
    const imgToAdd = document.createElement("img");

    if (!!srcText) {
      imgToAdd.src = srcText;

      if (!!altText) {
        imgToAdd.alt = altText;
      }

      postBody?.appendChild(imgToAdd);
    }

    setSrcText("");
    setAltText("");
    setShowImageModal(false);
  };

  const handleAddGraphic = (
    values: GraphicFormOptions,
    actions: FormikHelpers<GraphicFormOptions>
  ) => {
    console.log("values [createAPost.tsx - 52]", values);
  };

  return (
    <>
      <div className={showImageModal ? styles.imgPopUp : "hidden"}>
        <GrFormClose
          className={styles.close}
          onClick={() => setShowImageModal(false)}
        />
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

      <div className={styles.graphicPopUp}>
        <GrFormClose
          className={styles.close}
          onClick={() => setShowGraphicModal(false)}
        />
        <div className={styles.card}>
          <h1>Type your graphic informations</h1>
          <Formik
            onSubmit={handleAddGraphic}
            initialValues={initialValues}
            validationSchema={schema}
          >
            <Form>
              <div className={styles.formWrapper}>
                <label htmlFor="graphicType">Select your graphic type</label>
                <Field as="select" name="graphicType">
                  <option value="pie">Pie</option>
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                </Field>
                <ErrorMessage
                  className={styles.errorMessage}
                  name="graphicType"
                  component="span"
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="series">Type your series</label>
                <Field name="series" placeholder="1, 2, 3, ..." />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="series"
                  component="span"
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="colors">Type your graphic colors</label>
                <Field name="colors" />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="colors"
                  component="span"
                />
              </div>
              <div className={styles.formWrapper}>
                <label htmlFor="labels">Type your graphic labels</label>
                <Field name="labels" />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="labels"
                  component="span"
                />
              </div>
              <button type="submit">Create</button>
            </Form>
          </Formik>
        </div>
      </div>

      <header>
        <button onClick={() => handleAddElement("h1")}>
          <h1>h1</h1>
        </button>
        <button onClick={() => handleAddElement("h2")}>
          <h2>h2</h2>
        </button>
        <button onClick={() => handleAddElement("h3")}>
          <h3>h3</h3>
        </button>
        <button onClick={() => handleAddElement("h4")}>
          <h4>h4</h4>
        </button>
        <button onClick={() => handleAddElement("h5")}>
          <h5>h5</h5>
        </button>
        <button onClick={() => handleAddElement("h6")}>
          <h6>h6</h6>
        </button>
        <button onClick={() => handleAddElement("p")}>
          <p>p</p>
        </button>
        <button onClick={() => handleAddElement("span")}>
          <span>span</span>
        </button>
        <button>link</button>
        <button
          onClick={() => {
            setShowImageModal(true);
          }}
        >
          img
        </button>
        <button>Graphic</button>
      </header>
      <div id="post-body"></div>
    </>
  );
}

export default CreateAPost;
