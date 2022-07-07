import ShortHeader from "../../components/Headers/ShortHeader";
import ProfileImage from "../../components/Images/ProfileImage";
import { useAuth } from "../../hooks/useAuth";

import styles from "../../styles/user/profile-page.module.scss";

export default function ProfilePage() {
  const { user } = useAuth();

  console.log("user", user);

  return (
    <>
      <ShortHeader />

      <section className={styles.userInfo}>
        <div>
          <ProfileImage
            photoURL={user?.photoURL}
            userName={user?.displayName}
          />
        </div>
        <div>
          <h2 className={styles.userName}>{user?.displayName}</h2>
          <div className={styles.follows}>
            <span>Following: 1.000</span>
            <span>Followers: 975</span>
          </div>
          <h3 className={styles.userEmail}>{user?.email}</h3>
        </div>
      </section>
    </>
  );
}
