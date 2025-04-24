import router from "next/router";
import Image from "next/image";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Logo from "../public/white_blog_logo.png";

import styles from "@/styles/Footer.module.css";

function Footer() {
  return (
    <footer className={`fullBleed ${styles.footerContainer}`}>
      <div className={styles.logoWrapper}>
        <Image
          placeholder="blur"
          src={Logo}
          alt="logo"
          quality={100}
          onClick={() => router.push("/")}
        />
      </div>
      <div className={styles.socials}>
        <a href="https://www.linkedin.com/in/inioluwa-soetan-b082aa244/">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com/ini-s">
          <FaGithub />
        </a>
        <a href="https://x.com/hazel_ini">
          <FaXTwitter />
        </a>
      </div>

      <div className={styles.line}></div>

      <div className={styles.copyright}>
        <p>© 2025 All Rights Reserved</p>
        <span className={styles.divider}>|</span>
        <p>
          Powered by{" "}
          <a
            href="https://inioluwasoetan.com.ng/"
            className={styles.portfolioLink}
          >
            Inioluwa Soetan
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
