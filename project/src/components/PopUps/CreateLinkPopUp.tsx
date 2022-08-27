import React from "react";
import { GrFormClose } from "react-icons/gr";
import { LinkDataModel } from "../../models/components/LinkDataModel";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface CreateLinkPopUp {
  linkDataStructure: LinkDataModel;
  setLinkDataStructure: React.Dispatch<React.SetStateAction<LinkDataModel>>;
  showLinkModal: boolean;
  setShowLinkModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddLink: () => void;
}

const CreateLinkPopUp = (props: CreateLinkPopUp) => {
  const {
    linkDataStructure,
    setLinkDataStructure,
    showLinkModal,
    setShowLinkModal,
    handleAddLink,
  } = props;

  return (
    <div className={showLinkModal ? styles.imgPopUp : "hidden"}>
      <GrFormClose
        className={styles.close}
        onClick={() => setShowLinkModal(false)}
      />

      <div className={styles.card}>
        <h1>Type your link's informations</h1>
        <label htmlFor="text-content">Type your link text</label>
        <input
          type="url"
          name="text-content"
          className={styles.required}
          placeholder="Link text"
          required
          value={linkDataStructure?.linkText || ""}
          onChange={(event) =>
            setLinkDataStructure((oldValues) => {
              return { ...oldValues, linkText: event.target.value };
            })
          }
        />
        <label htmlFor="link-url">Type here your URL</label>
        <input
          type="url"
          name="link-url"
          className={styles.optional}
          placeholder="https://..."
          value={linkDataStructure?.linkSrc || ""}
          onChange={(event) =>
            setLinkDataStructure((oldValues) => {
              return { ...oldValues, linkSrc: event.target.value };
            })
          }
        />
        <button onClick={handleAddLink}>Create</button>
      </div>
    </div>
  );
};

export default CreateLinkPopUp;
