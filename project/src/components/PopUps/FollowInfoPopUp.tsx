import Image from "next/image";
import Link from "next/link";

import { DocumentData } from "firebase/firestore";

import { GrClose } from "react-icons/gr";

import styles from "../../styles/components/pop-ups/follow-info-pop-up.module.scss";
import FollowUserButton from "../Buttons/FollowUserButton";
import { useAuth } from "../../hooks/useAuth";
import { onUnfollowUser } from "../../services/users/onUnfollowUser";
import { onFollowUser } from "../../services/users/onFollowUser";
import { AuthenticationUser } from "../../contexts/AuthContext";

interface FollowInfoPopUpProps {
  title: string;
  users: DocumentData[];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowInfoPopUp = (props: FollowInfoPopUpProps) => {
  const { user, setUser } = useAuth();
  const { title, users, isVisible, setIsVisible } = props;

  async function handleFollow(userFollowedId: string) {
    const userRef = { ...user } as AuthenticationUser;
    const newUserIndex = userRef?.following?.indexOf(userFollowedId);

    await onFollowUser({
      newFollowerId: user?.id,
      userFollowedId,
    });

    if (newUserIndex === -1) {
      userRef?.following?.push(userFollowedId);
      setUser(userRef);
    }
  }

  async function handleUnfollow(accountToUnfollowId: string) {
    const userRef = { ...user } as AuthenticationUser;
    const unfollowedUserIndex =
      userRef?.following?.indexOf(accountToUnfollowId);

    await onUnfollowUser({
      unfollowRequesterId: user?.id,
      accountToUnfollowId,
    });

    if (unfollowedUserIndex !== -1) {
      userRef?.following?.splice(unfollowedUserIndex, 1);
      setUser(userRef);
    }
  }

  return (
    <div className={isVisible ? styles.popUpBackground : styles.hidden}>
      <div className={styles.container}>
        <div className={styles.popUpHeader}>
          <h1 className={styles.title}>{title}</h1>
          <GrClose
            className={styles.closeIcon}
            onClick={() => setIsVisible(false)}
          />
        </div>
        <div className={styles.popUpData}>
          {users.map((currentUser) => (
            <div key={currentUser?.id} className={styles.userContainer}>
              <Image
                src={currentUser?.photoURL || ""}
                className={styles.profileImage}
                alt={currentUser?.displayName}
                width={50}
                height={50}
                objectFit="cover"
              />
              <div className={styles.profileInfo}>
                <Link href={`/user/${currentUser?.email}`}>
                  <h4
                    className={styles.userEmail}
                    onClick={() => setIsVisible(false)}
                  >
                    {currentUser?.email}
                  </h4>
                </Link>
                <span className={styles.displayName}>
                  {currentUser?.displayName}
                </span>
              </div>

              {user?.id !== currentUser.id && (
                <FollowUserButton
                  following={user?.following?.indexOf(currentUser?.id) !== -1}
                  onFollow={async () => handleFollow(currentUser?.id)}
                  onUnfollow={async () => handleUnfollow(currentUser?.id)}
                  toggleTexts={["Follow", "Unfollow"]}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { FollowInfoPopUp };
