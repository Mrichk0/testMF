import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AllContent } from "../../../types";
import styles from "./AdditionalFilter.module.css";
import { useFilters } from "../../../hooks/useFilters";
import { useTags } from "../../../hooks/useTags";

interface AdditionalFilterProps {
  coursesData: { pages: { data: AllContent[] }[] } | undefined;
}

interface ApiTag {
  id: string;
  sort: number | null;
  tag_name: string;
  translations: { languages_code: string; tag: string }[];
}

const AdditionalFilter: React.FC<AdditionalFilterProps> = ({ coursesData }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { filters, handleFilterChange, handleArchiveChange, clearAllFilters } =
    useFilters();
  const { data: apiTags, isLoading, error } = useTags();

  const { availableFilters } = useMemo(() => {
    if (!coursesData || !coursesData.pages) {
      return { availableFilters: {} };
    }

    const filterAvailability = {
      current: false,
      archive: false,
    };

    coursesData.pages.forEach((page) => {
      page.data.forEach((course) => {
        if (course.archive === null) {
          filterAvailability.current = true;
        } else {
          filterAvailability.archive = true;
        }
      });
    });

    return { availableFilters: filterAvailability };
  }, [coursesData]);

  const tagsToUse = useMemo(() => {
    if (apiTags && apiTags.length > 0) {
      return apiTags.map((tag: ApiTag) => ({
        id: tag.id,
        name:
          tag.translations.find((t) => t.languages_code === i18n.language)
            ?.tag || tag.tag_name,
      }));
    } else {
      return [];
    }
  }, [apiTags, i18n.language]);

  const handleTagChange = (tagId: string) => {
    handleFilterChange(tagId, !filters[tagId]);
  };

  const activeTagsCount = Object.entries(filters).filter(
    ([key, value]) => key !== "archiveStatus" && value
  ).length;

  if (isLoading) {
    console.log("Loading tags...");
  }

  if (error) {
    console.error("Error loading tags:", error);
  }

  return (
    <div className={styles.additionalFilters}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dropdownToggle}
      >
        ˭{" "}
        {activeTagsCount > 0 && (
          <span className={styles.activeCount}>({activeTagsCount})</span>
        )}
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.filterButtons}>
            <button
              onClick={() => handleArchiveChange("current")}
              className={`${styles.filterButton} 
                ${
                  filters.archiveStatus === "current"
                    ? styles.filterButtonActive
                    : ""
                } 
                ${
                  !availableFilters.current ? styles.filterButtonDisabled : ""
                }`}
              disabled={!availableFilters.current}
            >
              {t("current")}
            </button>
            <button
              onClick={() => handleArchiveChange("archive")}
              className={`${styles.filterButton} 
                ${
                  filters.archiveStatus === "archive"
                    ? styles.filterButtonActive
                    : ""
                } 
                ${
                  !availableFilters.archive ? styles.filterButtonDisabled : ""
                }`}
              disabled={!availableFilters.archive}
            >
              {t("archive")}
            </button>
          </div>
          <div className={styles.filterButtons}>
            {tagsToUse.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagChange(tag.id)}
                className={`${styles.filterButton} 
                  ${filters[tag.id] ? styles.filterButtonActive : ""}`}
              >
                {tag.name}
              </button>
            ))}
          </div>
          <button onClick={clearAllFilters} className={styles.clearFilters}>
            {t("clear")}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdditionalFilter;
