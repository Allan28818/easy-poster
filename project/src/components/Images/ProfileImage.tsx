import { FaUser } from "react-icons/fa";

import styles from "../../styles/components/profile-image.module.scss";

interface ProfileImageProps {
  photoURL?: string | null;
  userName: string | undefined | null;
}

const ProfileImage = (props: ProfileImageProps) => {
  const { photoURL, userName } = props;

  return (
    <div className={styles.profileImageWrapper}>
      {!!photoURL ? (
        <img className={styles.image} src={photoURL} alt={userName || ""} />
      ) : (
        <span className={styles.noImage}>
          <FaUser />
        </span>
      )}
    </div>
  );
};

export default ProfileImage;
