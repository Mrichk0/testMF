import React, { useState } from "react";

import { useSavedContent } from "../../../hooks/useSavedContent";
import Dropdown from "../../Dropdown/Dropdown";
import styles from "./SavedContentDropdown.module.css";

const SavedContentDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { savedContent, removeSavedContent, error } = useSavedContent();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.savedContentDropdown}>
      <button onClick={toggleDropdown} className={styles.savedContentButton}>
        ᢂ
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={toggleDropdown}
        items={savedContent}
        groupByCategory={false}
        onItemRemove={removeSavedContent}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default SavedContentDropdown;
