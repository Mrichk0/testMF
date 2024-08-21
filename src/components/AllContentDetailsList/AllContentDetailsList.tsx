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
      if (!showTags || !content?.tags || content.tags.length === 0) return null;

      return content.tags
        .map((tagWrapper, index) => {
          const tag = tagWrapper.tags_id;
          if (!tag) return null;

          const tagText = getTranslation(tag, "tag");

          return (
            <li
              key={`tag-${tag.id || index}`}
              className={classNames(
                styles.contentDetailsItem,
                itemClassName,
                styles.tag
              )}
            >
              {tagText}
            </li>
          );
        })
        .filter(Boolean);
    }, [content?.tags, getTranslation, itemClassName, showTags]);

    const renderListItem = (
      key: string,
      content: React.ReactNode,
      additionalClassName?: string
    ) => (
      <li
        key={key}
        className={classNames(
          styles.contentDetailsItem,
          itemClassName,
          additionalClassName
        )}
      >
        {content}
      </li>
    );

    if (!content) {
      return null;
    }

    return (
      <ul className={classNames(styles.contentDetails, className)}>
        {content.category &&
          renderListItem(
            `category-${content.category.id || "unknown"}`,
            `${getTranslation(content.category, "category_name")} /`,
            styles.category
          )}
        {content.subcategories?.[0] &&
          renderListItem(
            `subcategory-${
              content.subcategories[0].subcategories_id || "unknown"
            }`,
            getTranslation(
              content.subcategories[0].subcategories_id,
              "subcategory_name"
            ),
            styles.category
          )}
        {tags}
        {content.translations?.[0]?.date_tag &&
          renderListItem(
            "date-tag",
            getTranslation(content, "date_tag"),
            styles.category
          )}
      </ul>
    );
  }
);

export default AllContentDetailsList;
