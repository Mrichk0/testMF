import React from "react";
import { useTranslatedContent } from "../../../hooks/useTranslatedContent";

import styles from "./PathInfo.module.css";
import useAllContentDetails from "../../../hooks/useAllContentPage";

interface PathInfoProps {
  category: any;
  pageSlug: string | undefined;
}

const PathInfo: React.FC<PathInfoProps> = ({ category, pageSlug }) => {
  const { getTranslation } = useTranslatedContent();
  const { data: courseDetails, isLoading } = useAllContentDetails(pageSlug);

  const getCategoryName = () => {
    if (category) {
      return getTranslation(category, "category_name");
    }
    return "";
  };

  const getPageTitle = () => {
    if (isLoading) return "Loading...";
    if (courseDetails) {
      const fullTitle = getTranslation(courseDetails, "title");
      if (fullTitle !== "Translation not available") {
        const words = fullTitle.split(" ");
        if (words.length > 4) {
          return words.slice(0, 4).join(" ") + "...";
        }
        return fullTitle + (words.length < 4 ? "..." : "");
      }
    }
    return (pageSlug || "") + "...";
  };

  return (
    <div className={styles.pathInfo}>
      {category && (
        <div className={styles.selectedCategory}>{getCategoryName()}/</div>
      )}
      {pageSlug && <div className={styles.pageTitle}>{getPageTitle()}</div>}
    </div>
  );
};

export default PathInfo;
