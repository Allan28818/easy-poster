import React from "react";
import { GrFormClose } from "react-icons/gr";

import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface CreateLinkPopUp {
  showLinkModal: boolean;
  setShowLinkModal: React.Dispatch<React.SetStateAction<boolean>>;
  linkText: string;
  setLinkText: React.Dispatch<React.SetStateAction<string>>;
  linkSrc: string;
  setLinkSrc: React.Dispatch<React.SetStateAction<string>>;
  handleAddLink: () => void;
}

const CreateLinkPopUp = (props: CreateLinkPopUp) => {
  const {
    showLinkModal,
    setShowLinkModal,
    linkText,
    setLinkText,
    linkSrc,
    setLinkSrc,
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
          value={linkText}
          onChange={(event) => setLinkText(event.target.value)}
        />
        <label htmlFor="link-url">Type here your URL</label>
        <input
          type="url"
          name="link-url"
          className={styles.optional}
          placeholder="https://..."
          value={linkSrc}
          onChange={(event) => setLinkSrc(event.target.value)}
        />
        <button onClick={handleAddLink}>Create</button>
      </div>
    </div>
  );
};

export default CreateLinkPopUp;
