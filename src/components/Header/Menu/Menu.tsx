import React from "react";
import MenuCategories from "./MenuCategories/MenuCategories";
import styles from "./Menu.module.css";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.menuDropdown}>
      <div className={styles.menuHeader}>
        <h2>METHODFUND</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <MenuCategories />
    </div>
  );
};

export default Menu;
