import ShortHeader from "../../components/Headers/ShortHeader";
import ProfileImage from "../../components/Images/ProfileImage";
import withAuth from "../../components/withAuth";
import { useAuth } from "../../hooks/useAuth";

import styles from "../../styles/user/profile-page.module.scss";

function ProfilePage() {
  const { user } = useAuth();

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

export default withAuth(ProfilePage);
