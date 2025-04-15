import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";

import styles from "@/styles/Header.module.css";

const Sidebar = ({
  closeSidebar,
}: {
  closeSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.closeMenu} onClick={() => closeSidebar(false)}>
        <IoClose />
      </div>
      <ul className={styles.sidebarList}>
        <li>
          <li className={styles.sidebarListItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.sidebarListItem}>
            <a href="https://inioluwasoetan.com.ng/">Portfolio</a>
          </li>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
