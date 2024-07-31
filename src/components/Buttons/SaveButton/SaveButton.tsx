import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./SaveButton.module.css";

interface SaveButtonProps {
  isSaved: boolean;
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isSaved, onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className={`${styles.saveButton} ${isSaved ? styles.saved : ""}`}
    >
      {isSaved ? t("unsave") : t("save")}
    </button>
  );
};

export default SaveButton;
