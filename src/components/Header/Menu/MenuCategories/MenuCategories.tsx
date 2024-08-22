import React, { useMemo } from "react";
import { useFilters } from "../../../../hooks/useFilters";
import { useTranslation } from "react-i18next";
import { useTranslatedContent } from "../../../../hooks/useTranslatedContent";
import { useAllContent } from "../../../../hooks/useAllContent";
import styles from "./MenuCategories.module.css";
import { AllContent } from "../../../../types";
import { useCategories } from "../../../../hooks/useCategories";

const MenuCategories: React.FC = () => {
  const { t } = useTranslation();
  const { data: categoriesData, isLoading, isError, error } = useCategories();
  const {
    selectedCategory,
    selectedSubcategories,
    setSelectedCategory,
    setSelectedSubcategories,
    filters,
    selectedYear,
  } = useFilters();
  const { getTranslation } = useTranslatedContent();
  const { data: allContentData, isLoading: isAllContentLoading } =
    useAllContent({
      selectedCategory,
      selectedSubcategories,
      filters,
      selectedYear,
    });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setSelectedSubcategories([]);
  };
  const handleSubcategoryClick = (
    categoryId: string,
    subcategoryId: string
  ) => {
    setSelectedCategory(categoryId);
    if (selectedSubcategories.includes(subcategoryId)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((id) => id !== subcategoryId)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
    }
  };

  const getCategoryId = (category: AllContent["category"]): string => {
    return category?.id || "";
  };

  const isCategoryDisabled = useMemo(
    () =>
      (categoryId: string): boolean => {
        if (!allContentData) return true;
        return !allContentData.pages.some((page) =>
          page.data.some(
            (content) => getCategoryId(content.category) === categoryId
          )
        );
      },
    [allContentData]
  );

  const isSubcategoryDisabled = useMemo(
    () =>
      (categoryId: string, subcategoryId: string): boolean => {
        if (!allContentData) return true;
        return !allContentData.pages.some((page) =>
          page.data.some((content) => {
            const hasCategory = getCategoryId(content.category) === categoryId;
            const hasSubcategory = content.subcategories?.some(
              (sub: any) => sub.subcategories_id === subcategoryId
            );
            return hasCategory && hasSubcategory;
          })
        );
      },
    [allContentData]
  );

  if (isLoading || isAllContentLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error loading categories: {(error as Error).message}</div>;
  if (!categoriesData || !allContentData) return <div>No data available</div>;

  return (
    <div className={styles.menuCategories}>
      <div className={styles.categoriesColumn}>
        {categoriesData.categories.map((category) => {
          const categoryDisabled = isCategoryDisabled(category.id);
          return (
            <div key={category.id} className={styles.categoryGroup}>
              <button
                className={`${styles.categoryName} ${
                  selectedCategory === category.id ? styles.active : ""
                } ${categoryDisabled ? styles.disabled : ""}`}
                onClick={() =>
                  !categoryDisabled && handleCategoryClick(category.id)
                }
                disabled={categoryDisabled}
              >
                {getTranslation(category, "category_name")}
              </button>
              {" / "}
              {categoriesData.subcategories
                .filter((subcategory) =>
                  subcategory.categories.some(
                    (cat) => cat.categories_id === category.id
                  )
                )
                .map((subcategory, index, array) => {
                  const subcategoryDisabled = isSubcategoryDisabled(
                    category.id,
                    subcategory.id
                  );
                  return (
                    <React.Fragment key={subcategory.id}>
                      <button
                        className={`${styles.subcategoryItem} ${
                          selectedSubcategories.includes(subcategory.id)
                            ? styles.active
                            : ""
                        } ${subcategoryDisabled ? styles.disabled : ""}`}
                        onClick={() =>
                          !subcategoryDisabled &&
                          handleSubcategoryClick(category.id, subcategory.id)
                        }
                        disabled={subcategoryDisabled}
                      >
                        {getTranslation(subcategory, "subcategory_name")}
                      </button>
                      {index < array.length - 1 && " "}
                    </React.Fragment>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className={styles.additionalLinksColumn}>
        <ul className={styles.additionalLinksList}>
          <li>{t("archiveProjects")}</li>
          <li>{t("aboutFund")}</li>
          <li>{t("contacts")}</li>
          <li>{t("diary")}</li>
          <li>{t("englishVersion")}</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuCategories;
