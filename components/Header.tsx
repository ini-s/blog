import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import ShowView from "./ShowView";

import Sidebar from "./Sidebar";

import Logo from "../public/blog_logo.png";

import styles from "@/styles/Header.module.css";

function Header() {
  const [active, setIsActive] = useState("home");
  const [openSidebar, setOpenSidebar] = useState(false);

  const router = useRouter();

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.logoWrapper}>
        <Image
          placeholder="blur"
          src={Logo}
          alt="logo"
          quality={100}
          onClick={() => router.push("/")}
        />
      </div>

      <nav>
        <div className={styles.menu} onClick={() => setOpenSidebar(true)}>
          <GiHamburgerMenu />
        </div>

        <ul className={styles.navList}>
          <li className={styles.navItem} onClick={() => setIsActive("home")}>
            <Link href="/" style={{ color: active == "home" ? "#b0b0b0" : "" }}>
              Home
            </Link>
          </li>
          <li
            className={styles.navItem}
            onClick={() => setIsActive("portfolio")}
          >
            <a
              href="https://inioluwasoetan.com.ng/"
              style={{ color: active == "portfolio" ? "#b0b0b0" : "" }}
            >
              Portfolio
            </a>
          </li>
        </ul>
      </nav>

      <ShowView when={openSidebar}>
        <Sidebar closeSidebar={setOpenSidebar} />
      </ShowView>
    </header>
  );
}

export default Header;
