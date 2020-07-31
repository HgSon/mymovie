import React from "react";
import styles from "./Header.module.css";

const Header = () => (
  <header>
    <ul className={styles.nav}>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/tv">TV</a>
      </li>
      <li>
        <a href="/search">search</a>
      </li>
    </ul>
  </header>
);

export default Header;
