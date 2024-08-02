import styles from "./AllContentDetailsList.module.css";
import React, { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { AllContent } from "../../types";
import { getSubcategoryTranslations } from "../../utils/api";

interface CourseDetailsListProps {
  content: AllContent;
  className?: string;
  itemClassName?: string;
}

const CourseDetailsList: React.FC<CourseDetailsListProps> = ({
  content,
  className,
  itemClassName,
}) => {
  const { t, i18n } = useTranslation();
  const [subcategoryNames, setSubcategoryNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubcategoryNames = async () => {
      if (content.subcategories && content.subcategories.length > 0) {
        const names = await Promise.all(
          content.subcategories.map(async (sub) => {
            try {
              const translations = await getSubcategoryTranslations(
                sub.subcategories_id
              );
              const translation =
                translations.find((t) => t.languages_code === i18n.language) ||
                translations[0];
              return translation
                ? translation.subcategory_name
                : `Subcategory ${sub.subcategories_id}`;
            } catch (error) {
              console.error(
                `Error fetching subcategory ${sub.subcategories_id} translations:`,
                error
              );
              return `Subcategory ${sub.subcategories_id}`;
            }
          })
        );
        setSubcategoryNames(names);
      }
    };

    fetchSubcategoryNames();
  }, [content.subcategories, i18n.language]);

  const formatDateRange = useCallback(
    (start: string, end: string) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
      };

      if (startDate.getMonth() === endDate.getMonth()) {
        return `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString(
          i18n.language,
          { month: "long" }
        )}`;
      } else {
        return `${startDate.toLocaleDateString(
          i18n.language,
          options
        )} - ${endDate.toLocaleDateString(i18n.language, options)}`;
      }
    },
    [i18n.language]
  );

  const getContentTypes = () => {
    const types = [];
    if (content.video) types.push(t("video"));
    if (content.photo) types.push(t("photo"));
    if (content.audio) types.push(t("audio"));
    return types.join(", ");
  };

  const getCategoryInfo = () => {
    let categoryName = t("uncategorized");
    if (content.category && content.category.translations) {
      const categoryTranslation =
        content.category.translations.find(
          (trans) => trans.languages_code === i18n.language
        ) || content.category.translations[0];
      categoryName =
        categoryTranslation?.category_name || content.category.slug;
    }
    return categoryName;
  };

  const isActual = () => {
    const now = new Date();
    const endDate = new Date(content.end_date);
    return endDate >= now;
  };

  return (
    <ul className={classNames(styles.courseDetailsList, className)}>
      <li className={classNames(styles.courseDetailsItem, itemClassName)}>
        {getCategoryInfo()}
        {subcategoryNames.length > 0 && ` / ${subcategoryNames.join(", ")}`}
      </li>
      <li className={classNames(styles.courseDetailsItem, itemClassName)}>
        {getContentTypes()}
      </li>
      <li className={classNames(styles.courseDetailsItem, itemClassName)}>
        {isActual() ? t("actual") : t("archive")}
      </li>
      <li className={classNames(styles.courseDetailsItem, itemClassName)}>
        {formatDateRange(content.start_date, content.end_date)}
      </li>
    </ul>
  );
};

export default CourseDetailsList;
