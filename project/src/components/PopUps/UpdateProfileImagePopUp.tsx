import { GrFormClose } from "react-icons/gr";
import { updateProfileImageController } from "../../controllers/updateProfileImageController";
import styles from "../../styles/components/pop-ups/pop-up.module.scss";

interface UpdateProfileImagePopUpProps {
  showUpdateProfileImagePopUp: boolean;
  newProfileImageSrc: string | ArrayBuffer;
  setNewProfileImageSrc: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer>
  >;
  setShowUpdateProfileImagePopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileImagePopUp = (props: UpdateProfileImagePopUpProps) => {
  const {
    showUpdateProfileImagePopUp,
    newProfileImageSrc,
    setNewProfileImageSrc,
    setShowUpdateProfileImagePopUp,
  } = props;

  function generateImageObj(files: any) {
    const filesArray = Array.from(files);

    filesArray.map((file: any) => {
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
            setNewProfileImageSrc(preview);
          }
        };
      }
      return null;
    });
  }

  return (
    <div
      className={
        showUpdateProfileImagePopUp ? styles.profileImagePopUp : "hidden"
      }
    >
      <GrFormClose
        className={styles.close}
        onClick={() => setShowUpdateProfileImagePopUp(false)}
      />
      <div className={styles.card}>
        <h1>Choose a new image</h1>
        <p className={styles.description}>
          Choose a new image to put in your profile
        </p>
        {!newProfileImageSrc ? (
          <div className={styles.clickZone}>
            <label htmlFor="image-input" className={styles.instruction}>
              Click here to choose your new image
            </label>
            <input
              id="image-input"
              name="image-input"
              type="file"
              accept=".gif,.jpg,.jpeg,.png"
              className={styles.selector}
              onChange={(event) => {
                const files = event.target.files;

                generateImageObj(files);
              }}
            />
          </div>
        ) : (
          <div className={styles.previewImages}>
            <div className={styles.imageContainer}>
              <img src={newProfileImageSrc.toString()} />
            </div>
          </div>
        )}
        <button
          onClick={async () => {
            setShowUpdateProfileImagePopUp(false);
            await updateProfileImageController(newProfileImageSrc);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default UpdateProfileImagePopUp;
