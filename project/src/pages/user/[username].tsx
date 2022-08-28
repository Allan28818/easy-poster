import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShortHeader from "../../components/Headers/ShortHeader";
import { BasicProfileImage } from "../../components/Images/BasicProfileImage";
import ProfileImage from "../../components/Images/ProfileImage";
import withAuth from "../../components/withAuth";
import { useAuth } from "../../hooks/useAuth";
import { getUserByField } from "../../services/users/getUserByField";

import styles from "../../styles/user/profile-page.module.scss";

function ProfilePage() {
  const { user } = useAuth();

  const router = useRouter();
  const { username } = router.query;

  const [pageOwner, setPageOwner] = useState<DocumentData>();

  useEffect(() => {
    const getPageOwner = async () => {
      if (!!username && typeof username === "string") {
        const getUserByFieldResponse = await getUserByField({
          fieldToGet: "email",
          fieldValue: username,
        });

        setPageOwner(getUserByFieldResponse);
      }
    };

    getPageOwner();
  }, [username]);

  return (
    <>
      <ShortHeader />

      <section className={styles.userInfo}>
        <div>
          {pageOwner?.id === user?.uid ? (
            <ProfileImage
              photoURL={pageOwner?.photoURL}
              userName={pageOwner?.displayName}
            />
          ) : (
            <BasicProfileImage
              photoURL={pageOwner?.photoURL}
              username={pageOwner?.displayName}
            />
          )}
        </div>
        <div>
          <h2 className={styles.userName}>{pageOwner?.displayName}</h2>
          <div className={styles.follows}>
            <span>Following: 1.000</span>
            <span>Followers: 975</span>
          </div>
          <h3 className={styles.userEmail}>{pageOwner?.email}</h3>
        </div>
      </section>
    </>
  );
}

export default withAuth(ProfilePage);
