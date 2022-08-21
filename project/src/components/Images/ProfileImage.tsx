import { useState } from "react";

import { FaUser } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

import Image from "next/image";

import styles from "../../styles/components/images/profile-image.module.scss";
import UpdateProfileImagePopUp from "../PopUps/UpdateProfileImagePopUp";
import withAuth from "../withAuth";

interface ProfileImageProps {
  photoURL?: string | null;
  userName: string | undefined | null;
}

const ProfileImage = (props: ProfileImageProps) => {
  const { photoURL, userName } = props;

  const [newProfileImageSrc, setNewProfileImageSrc] = useState<
    string | ArrayBuffer
  >("");

  const [showUpdateProfileImagePopUp, setShowUpdateProfileImagePopUp] =
    useState<boolean>(false);

  return (
    <>
      <UpdateProfileImagePopUp
        newProfileImageSrc={newProfileImageSrc}
        showUpdateProfileImagePopUp={showUpdateProfileImagePopUp}
        setShowUpdateProfileImagePopUp={setShowUpdateProfileImagePopUp}
        setNewProfileImageSrc={setNewProfileImageSrc}
      />
      <div className={styles.profileImageWrapper}>
        {!!photoURL ? (
          <Image
            className={styles.image}
            src={
              !!newProfileImageSrc && !showUpdateProfileImagePopUp
                ? newProfileImageSrc.toString()
                : photoURL
            }
            alt={userName || ""}
            layout={"fixed"}
            width={100}
            height={100}
            objectFit="cover"
          />
        ) : (
          <span className={styles.noImage}>
            <FaUser />
          </span>
        )}

        <button
          className={styles.uploadPictureBtn}
          onClick={() => setShowUpdateProfileImagePopUp(true)}
        >
          <MdModeEdit />
        </button>
      </div>
    </>
  );
};

export default withAuth(ProfileImage);
