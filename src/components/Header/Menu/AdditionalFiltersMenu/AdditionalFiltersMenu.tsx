import React from "react";
import { useTranslation } from "react-i18next";
import { useFilters } from "../../../../hooks/useFilters";
import { AllContent } from "../../../../types";
import styles from "./AdditionalFilterMenu.module.css";

interface AdditionalFilterMenuProps {
  coursesData: { pages: { data: AllContent[] }[] } | undefined;
}

const AdditionalFilterMenu: React.FC<AdditionalFilterMenuProps> = ({
  coursesData,
}) => {
  const { t } = useTranslation();
  const { filters, handleFilterChange, handleActualChange, clearAllFilters } =
    useFilters();

  const availableFilters = {
    hasVideo:
      coursesData?.pages.some((page) =>
        page.data.some((course) => course.video)
      ) ?? false,
    hasAudio:
      coursesData?.pages.some((page) =>
        page.data.some((course) => course.audio)
      ) ?? false,
    hasPhoto:
      coursesData?.pages.some((page) =>
        page.data.some((course) => course.photo)
      ) ?? false,
    hasActual:
      coursesData?.pages.some((page) =>
        page.data.some((course) => course.is_current !== undefined)
      ) ?? false,
  };

  return (
    <div className={styles.additionalFilters}>
      <div className={styles.filterButtons}>
        <button
          onClick={() => handleFilterChange("hasVideo")}
          className={`${styles.filterButton} 
            ${filters.hasVideo ? styles.filterButtonActive : ""} 
            ${!availableFilters.hasVideo ? styles.filterButtonDisabled : ""}`}
          disabled={!availableFilters.hasVideo}
        >
          {t("hasVideo")}
        </button>
        <button
          onClick={() => handleFilterChange("hasAudio")}
          className={`${styles.filterButton} 
            ${filters.hasAudio ? styles.filterButtonActive : ""} 
            ${!availableFilters.hasAudio ? styles.filterButtonDisabled : ""}`}
          disabled={!availableFilters.hasAudio}
        >
          {t("hasAudio")}
        </button>
        <button
          onClick={() => handleFilterChange("hasPhoto")}
          className={`${styles.filterButton} 
            ${filters.hasPhoto ? styles.filterButtonActive : ""} 
            ${!availableFilters.hasPhoto ? styles.filterButtonDisabled : ""}`}
          disabled={!availableFilters.hasPhoto}
        >
          {t("hasPhoto")}
        </button>
      </div>
      <div className={styles.filterButtons}>
        <button
          onClick={() => handleActualChange(true)}
          className={`${styles.filterButton} 
            ${filters.isActual === true ? styles.filterButtonActive : ""} 
            ${!availableFilters.hasActual ? styles.filterButtonDisabled : ""}`}
          disabled={!availableFilters.hasActual}
        >
          {t("actual")}
        </button>
        <button
          onClick={() => handleActualChange(false)}
          className={`${styles.filterButton} 
            ${filters.isActual === false ? styles.filterButtonActive : ""} 
            ${!availableFilters.hasActual ? styles.filterButtonDisabled : ""}`}
          disabled={!availableFilters.hasActual}
        >
          {t("notActual")}
        </button>
      </div>
      <button onClick={clearAllFilters} className={styles.clearFilters}>
        {t("clearAllFilters")}
      </button>
    </div>
  );
};

export default AdditionalFilterMenu;
