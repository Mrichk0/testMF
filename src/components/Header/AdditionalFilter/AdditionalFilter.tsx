import React, { useState, useMemo } from "react";
import { useFilters } from "../../../hooks/useFilters";
import { useTranslation } from "react-i18next";
import { Course } from "../../../types";
import styles from "./AdditionalFilter.module.css";

interface AdditionalFilterProps {
  coursesData: { pages: { data: Course[] }[] } | undefined;
}

const AdditionalFilter: React.FC<AdditionalFilterProps> = ({ coursesData }) => {
  const { t } = useTranslation();
  const { filters, handleFilterChange, handleActualChange, clearAllFilters } =
    useFilters();
  const [isOpen, setIsOpen] = useState(false);

  const availableFilters = useMemo(() => {
    if (!coursesData || !coursesData.pages)
      return {
        hasVideo: false,
        hasAudio: false,
        hasPhoto: false,
        hasActual: false,
      };

    const filterAvailability = {
      hasVideo: false,
      hasAudio: false,
      hasPhoto: false,
      hasActual: false,
    };

    coursesData.pages.forEach((page) => {
      page.data.forEach((course) => {
        if (course.video) filterAvailability.hasVideo = true;
        if (course.audio) filterAvailability.hasAudio = true;
        if (course.photo) filterAvailability.hasPhoto = true;
        if (course.is_current !== undefined)
          filterAvailability.hasActual = true;
      });
    });

    return filterAvailability;
  }, [coursesData]);

  return (
    <div className={styles.additionalFilters}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dropdownToggle}
      >
        {t("additionalFilters")}
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.filterButtons}>
            <button
              onClick={() => handleFilterChange("hasVideo")}
              className={`${styles.filterButton} 
                ${filters.hasVideo ? styles.filterButtonActive : ""} 
                ${
                  !availableFilters.hasVideo ? styles.filterButtonDisabled : ""
                }`}
              disabled={!availableFilters.hasVideo}
            >
              {t("hasVideo")}
            </button>
            <button
              onClick={() => handleFilterChange("hasAudio")}
              className={`${styles.filterButton} 
                ${filters.hasAudio ? styles.filterButtonActive : ""} 
                ${
                  !availableFilters.hasAudio ? styles.filterButtonDisabled : ""
                }`}
              disabled={!availableFilters.hasAudio}
            >
              {t("hasAudio")}
            </button>
            <button
              onClick={() => handleFilterChange("hasPhoto")}
              className={`${styles.filterButton} 
                ${filters.hasPhoto ? styles.filterButtonActive : ""} 
                ${
                  !availableFilters.hasPhoto ? styles.filterButtonDisabled : ""
                }`}
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
                ${
                  !availableFilters.hasActual ? styles.filterButtonDisabled : ""
                }`}
              disabled={!availableFilters.hasActual}
            >
              {t("actual")}
            </button>
            <button
              onClick={() => handleActualChange(false)}
              className={`${styles.filterButton} 
                ${filters.isActual === false ? styles.filterButtonActive : ""} 
                ${
                  !availableFilters.hasActual ? styles.filterButtonDisabled : ""
                }`}
              disabled={!availableFilters.hasActual}
            >
              {t("notActual")}
            </button>
          </div>
          <button onClick={clearAllFilters} className={styles.clearFilters}>
            {t("clearAllFilters")}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdditionalFilter;
