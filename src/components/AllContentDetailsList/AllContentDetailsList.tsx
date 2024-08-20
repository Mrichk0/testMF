import React, { useMemo } from "react";

import classNames from "classnames";
import { AllContent } from "../../types";
import { useTranslatedContent } from "../../hooks/useTranslatedContent";

import styles from "./AllContentDetailsList.module.css";

interface ContentDetailsProps {
  content: AllContent;
  className?: string;
  itemClassName?: string;
  showTags?: boolean;
}

const AllContentDetailsList: React.FC<ContentDetailsProps> = React.memo(
  ({ content, className, itemClassName, showTags = true }) => {
    const { getTranslation } = useTranslatedContent();

    const tags = useMemo(() => {
      if (!showTags) return null;
      const translatedTags = getTranslation(content, "tags");
      return Array.isArray(translatedTags)
        ? translatedTags.map((tag) => (
            <li
              key={tag}
              className={classNames(
                styles.contentDetailsItem,
                itemClassName,
                styles.tag
              )}
            >
              {tag}
            </li>
          ))
        : null;
    }, [content, getTranslation, itemClassName, showTags]);

    return (
      <ul className={classNames(styles.contentDetails, className)}>
        <li
          className={classNames(
            styles.contentDetailsItem,
            itemClassName,
            styles.category
          )}
        >
          {getTranslation(content.category, "category_name")} {"/"}
        </li>

        <li
          className={classNames(
            styles.contentDetailsItem,
            itemClassName,
            styles.category
          )}
        >
          {getTranslation(
            content.subcategories[0].subcategories_id,
            "subcategory_name"
          )}
        </li>
        {tags}
        {content.translations[0].date_tag && (
          <li
            className={classNames(
              styles.contentDetailsItem,
              itemClassName,
              styles.category
            )}
          >
            {getTranslation(content, "date_tag")}
          </li>
        )}
      </ul>
    );
  }
);

export default AllContentDetailsList;
