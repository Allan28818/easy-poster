import Image from "next/image";

import Link from "next/link";

import { BiHome } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";

import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/components/headers/short-header.module.scss";

const ShortHeader = () => {
  const { user } = useAuth();

  return (
    <header className={styles.shortHeader}>
      <div className={styles.imageWrapper}>
        <Link href={"/"}>
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/easy-poster-d747a.appspot.com/o/website-images%2Ficon-512x512.png?alt=media&token=94ccb26f-56f8-4ba5-8e2a-a63a681c6ec7"
            }
            alt={"Easy Poster"}
            width={100}
            height={100}
            objectFit="fill"
          />
        </Link>
      </div>

      <ul className={styles.navigationOptions}>
        <li className={styles.navOption}>
          <Link href={"/"}>
            <i>
              <BiHome />
            </i>
          </Link>
        </li>
        <li className={styles.navOption}>
          <Link href={"/posts/create/default"}>
            <i>
              <VscNewFile />
            </i>
          </Link>
        </li>
        <li className={styles.navOption}>
          <Link href={"/explore/SearchUsers"}>
            <i>
              <RiCompassDiscoverLine />
            </i>
          </Link>
        </li>
        <li className={styles.navOption} data-tester="no">
          <Link href={`/user/${user?.email}`}>
            <i>
              <FiUser />
            </i>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default ShortHeader;
