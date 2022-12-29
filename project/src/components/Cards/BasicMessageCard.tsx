import { FiLock } from "react-icons/fi";
import { HiOutlineDocumentRemove } from "react-icons/hi";

import styles from "../../styles/components/cards/basic-message-card.module.scss";

interface BasicMessageCardProps {
  text: string;
  iconType?: "noDocument" | "lock";
}

function BasicMessageCard(props: BasicMessageCardProps) {
  const { text, iconType } = props;
  const selectedIcon = {
    noDocument: <HiOutlineDocumentRemove className={styles.icon} />,
    lock: <FiLock className={styles.icon} />,
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        {iconType && selectedIcon[iconType]}
      </div>
      <h4 className={styles.message}>{text}</h4>
    </div>
  );
}

export { BasicMessageCard };
