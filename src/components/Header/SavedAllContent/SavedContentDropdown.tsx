import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSavedContent } from "../../../hooks/useSavedContent";
import styles from "./SavedContentDropdown.module.css";
import { AllContent } from "../../../types";

const SavedContentDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { savedContent, removeSavedContent, error } = useSavedContent();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const renderContentItem = (content: AllContent) => {
    const title = content.translations?.[0]?.title || "Untitled";
    const category =
      content.category?.translations?.[0]?.title || "Uncategorized";
    const subcategories =
      content.subcategories
        ?.map((sub) => sub.translations?.[0]?.title)
        .filter(Boolean)
        .join(", ") || "No subcategories";

    return (
      <div key={content.id} className={styles.savedContentItem}>
        <h4>{title}</h4>
        <p>
          {category} / {subcategories}
        </p>
        <p>
          {content.video ? t("video") : ""}
          {content.is_current ? t("actual") : t("archive")}
          {content.start_date} - {content.end_date}
        </p>
        <button
          onClick={() => removeSavedContent(content.id)}
          className={styles.deleteButton}
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <div className={styles.savedContentDropdown}>
      <button onClick={toggleDropdown} className={styles.savedContentButton}>
        {t("saved")}
      </button>
      {isOpen && (
        <div className={styles.savedContentList}>
          <div className={styles.savedContentHeader}>
            <h3>{t("saved")}</h3>
            <button onClick={toggleDropdown} className={styles.closeButton}>
              ×
            </button>
          </div>
          {error ? (
            <p className={styles.errorMessage}>{error}</p>
          ) : savedContent.length === 0 ? (
            <p className={styles.noContent}>{t("noSavedContent")}</p>
          ) : (
            savedContent.map(renderContentItem)
          )}
        </div>
      )}
    </div>
  );
};

export default SavedContentDropdown;
