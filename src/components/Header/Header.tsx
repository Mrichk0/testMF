import React, { useState } from "react";
import Logo from "./Logo/Logo";
import SquareBlock from "./SquareBlock/SquareBlock";

import SearchInput from "./SearchInput/SearchInput";
import Menu from "./Menu/Menu";

import styles from "./Header.module.css";
import Categories from "./Categories/Categories";
import SavedContentDropdown from "./SavedAllContent/SavedContentDropdown";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <SquareBlock />
        <Logo />
        <SearchInput />
        <SavedContentDropdown />
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>

      <Categories />
    </header>
  );
};

export default Header;
