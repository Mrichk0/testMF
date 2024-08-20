import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { AllContent } from "../../types";
import { useTranslatedContent } from "../../hooks/useTranslatedContent";
import { useSubcategoryTranslations } from "../../hooks/useSubcategoryTranslations";
import styles from "./AllContentDetailsList.module.css";

interface ContentDetailsProps {
  content: AllContent;
  className?: string;
  itemClassName?: string;
  showTags?: boolean;
  showCategory?: boolean;
}

const AllContentDetailsList: React.FC<ContentDetailsProps> = React.memo(
  ({
    content,
    className,
    itemClassName,
    showTags = true,
    showCategory = true,
  }) => {
    const { t, i18n } = useTranslation();
    const { getTranslation } = useTranslatedContent();

    const subcategoryIds = useMemo(
      () =>
        content.subcategories?.map((sub) =>
          typeof sub === "number" ? sub : sub.id
        ) || [],
      [content.subcategories]
    );

    const { data: subcategoryTranslations, isLoading: isLoadingSubcategories } =
      useSubcategoryTranslations(subcategoryIds);

    const getCategoryInfo = useCallback(() => {
      let result = t("uncategorized");
      if (content.category) {
        const categoryName =
          getTranslation(content.category, "category_name") ||
          content.category.slug;
        result = categoryName;

        if (subcategoryTranslations && subcategoryTranslations.length > 0) {
          const subcategoryNames = subcategoryTranslations.flatMap(
            (translations, index) => {
              const translation =
                translations.find((t) => t.languages_code === i18n.language) ||
                translations.find((t) => t.languages_code === "uk") ||
                translations[0];
              return translation
                ? translation.subcategory_name
                : `Subcategory ${subcategoryIds[index]}`;
            }
          );
          result += ` / ${subcategoryNames.join(", ")}`;
        }
      }
      return result;
    }, [
      content.category,
      subcategoryTranslations,
      subcategoryIds,
      getTranslation,
      t,
      i18n.language,
    ]);

    const categoryElement = useMemo(() => {
      if (!showCategory) return null;
      return (
        <li
          className={classNames(
            styles.contentDetailsItem,
            itemClassName,
            styles.category
          )}
        >
          {isLoadingSubcategories ? t("loading") : getCategoryInfo()}
        </li>
      );
    }, [
      showCategory,
      itemClassName,
      isLoadingSubcategories,
      getCategoryInfo,
      t,
    ]);

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
        {categoryElement}
        {tags}
      </ul>
    );
  }
);

export default AllContentDetailsList;
