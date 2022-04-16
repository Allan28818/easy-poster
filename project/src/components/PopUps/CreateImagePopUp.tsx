import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";

import styles from "../../styles/components/pop-up.module.scss";

interface CreateImagePopUpProps {
  showImageModal: boolean;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  srcText: string | string[];
  setSrcText: React.Dispatch<React.SetStateAction<string | string[]>>;
  altText: string | string[];
  setAltText: React.Dispatch<React.SetStateAction<string | string[]>>;
  handleAddImage: () => void;
}

const CreateImagePopUp = (props: CreateImagePopUpProps) => {
  const {
    showImageModal,
    setShowImageModal,
    srcText,
    setSrcText,
    altText,
    setAltText,

    handleAddImage,
  } = props;

  const dragEvents = {
    onDragEnter: (e: any) => e.preventDefault(),
    onDragLeave: (e: any) => e.preventDefault(),
    onDragOver: (e: any) => e.preventDefault(),
    onDrop: (e: any) => {
      e.preventDefault();

      const files = e.dataTransfer.files;

      generateImageObj(files);
    },
  };

  function generateImageObj(files: any) {
    const filesArray = Array.from(files);

    filesArray.map((file: any) => {
      const { name, size } = file;
      const avaibleFormats = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
      ];
      if (avaibleFormats.includes(file.type)) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const preview = reader.result;

          if (!!preview) {
            setSrcText((oldValues: any) => [...oldValues, preview.toString()]);
            setAltText((oldValues: any) => [...oldValues, name]);
          }
        };
      }
      return null;
    });
  }

  return (
    <div className={showImageModal ? styles.imgPopUp : "hidden"}>
      <GrFormClose
        className={styles.close}
        onClick={() => setShowImageModal(false)}
      />

      <div className={styles.card}>
        <h1>Type your image informations</h1>
        <div className={styles.dropZone} {...dragEvents}>
          <div>
            <h3>Drag your images here</h3>

            <label htmlFor="image-input">
              Or search for files in your device
            </label>
            <input
              type="file"
              name="image-input"
              id="image-input"
              accept=".gif,.jpg,.jpeg,.png"
              onChange={(event) => {
                const files = event.target.files;

                generateImageObj(files);
              }}
            />
          </div>
        </div>
        <div className={styles.previewImages}>
          {Array.isArray(srcText) &&
            srcText.map((image: any, index) => (
              <div className={styles.imageContainer} key={image}>
                <img src={image} alt={altText[index]} />
              </div>
            ))}
        </div>
        {!Array.isArray(srcText) && (
          <>
            <label htmlFor="url">Image source</label>
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
              value={altText}
              onChange={(event) => setAltText(event.target.value)}
            />
          </>
        )}
        <button onClick={handleAddImage} disabled={!srcText ? true : false}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateImagePopUp;
