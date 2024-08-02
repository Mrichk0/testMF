import { useState } from "react";
import MenuCategories from "./MenuCategories/MenuCategories";
import styles from "./Menu.module.css";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {isMenuOpen && (
        <div className={styles.menuDropdown}>
          <div className={styles.menuHeader}>
            <h2>METHODFUND</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <MenuCategories />
        </div>
      )}
    </>
  );
};

export default Menu;
