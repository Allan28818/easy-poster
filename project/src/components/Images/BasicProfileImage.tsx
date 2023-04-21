import React from "react";
import styles from "../../styles/components/images/basic-profile-image.module.scss";

import Image from "next/image";
import { FaUser } from "react-icons/fa";

interface BasicProfileImage {
  photoURL?: string | null;
  username: string;
}

const BasicProfileImage = (props: BasicProfileImage) => {
  const { photoURL, username } = props;
  return (
    <div className={styles.imageWrapper}>
      {!!photoURL ? (
        <Image
          className={styles.image}
          src={photoURL}
          alt={username}
          width={100}
          height={100}
          objectFit="cover"
        />
      ) : (
        <span className={styles.noImage}>
          <FaUser />
        </span>
      )}
    </div>
  );
};

export { BasicProfileImage };
