import React from "react";
import { GrFormClose } from "react-icons/gr";
import { handleAddImageProps } from "../../handlers/createPostHandlers/handleAddImage";
import { ImageDataProps } from "../../models/components/ImageDataProps";
import docElementsProp from "../../models/DocElementsProp";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface CreateImagePopUpProps {
  imageDataStructure: ImageDataProps;
  setImageDataStructure: React.Dispatch<React.SetStateAction<ImageDataProps>>;
  showImageModal: boolean;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDocElements: React.Dispatch<React.SetStateAction<docElementsProp[]>>;
  handleAddImage: (props: handleAddImageProps) => void;
}

const CreateImagePopUp = (props: CreateImagePopUpProps) => {
  const {
    imageDataStructure,
    setImageDataStructure,
    showImageModal,
    setShowImageModal,
    setDocElements,
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
            setImageDataStructure((oldValues) => {
              const newSrcTexts = [...oldValues.srcText!, preview.toString()];
              return { ...oldValues, srcText: newSrcTexts };
            });
            setImageDataStructure((oldValues) => {
              const newAltTexts = [...oldValues.altText!, name];
              return { ...oldValues, altText: newAltTexts };
            });
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
          {Array.isArray(imageDataStructure.srcText) &&
            imageDataStructure.srcText.map((image: any, index) => (
              <div className={styles.imageContainer} key={image}>
                <img
                  src={image}
                  alt={
                    imageDataStructure.altText
                      ? imageDataStructure.altText[index]
                      : ""
                  }
                />
              </div>
            ))}
        </div>
        {!Array.isArray(imageDataStructure.srcText) && (
          <>
            <label htmlFor="url">Image source</label>
            <input
              type="url"
              name="source"
              className={styles.required}
              placeholder="https://..."
              required
              value={imageDataStructure.srcText || ""}
              onChange={(event) =>
                setImageDataStructure((oldValues) => {
                  return { ...oldValues, srcText: event.target.value };
                })
              }
            />
            <label htmlFor="alt">Alternative text (optional)</label>
            <input
              type="text"
              name="alt"
              className={styles.optional}
              placeholder="Texto da minha imagem"
              value={imageDataStructure?.altText || ""}
              onChange={(event) =>
                setImageDataStructure((oldValues) => {
                  return { ...oldValues, altText: event.target.value };
                })
              }
            />
          </>
        )}
        <button
          onClick={() =>
            handleAddImage({
              setDocElements,
              setShowImageModal,
              setImageDataStructure,
              imageDataStructure,
            })
          }
          disabled={!imageDataStructure.srcText ? true : false}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateImagePopUp;
