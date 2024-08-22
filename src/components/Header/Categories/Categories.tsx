import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useFilters } from "../../../hooks/useFilters";
import { useAllContent } from "../../../hooks/useAllContent";
import { useTranslatedContent } from "../../../hooks/useTranslatedContent";
import {
  CategoriesData,
  Category,
  Subcategory,
} from "../../../types/categories";
import AdditionalFilter from "../AdditionalFilter/AdditionalFilter";
import styles from "./Categories.module.css";

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { data: categoriesData, isError, error } = useCategories();
  const {
    filters,
    selectedCategory,
    selectedSubcategories,
    selectedYear,
    setSelectedCategory,
    setSelectedSubcategories,
  } = useFilters();
  const { getTranslation } = useTranslatedContent();
  const { data: coursesData } = useAllContent({
    selectedCategory,
    selectedSubcategories,
    filters,
    selectedYear,
  });

  const navigate = useNavigate();

  const typedCategoriesData = categoriesData as CategoriesData | undefined;

  const handleCategoryClick = (categoryId: string, categorySlug: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    navigate(newCategory ? `/${categorySlug}` : "/");
    setSelectedSubcategories([]);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const selectedCategoryData = useMemo(() => {
    if (!selectedCategory || !typedCategoriesData) return null;
    return typedCategoriesData.categories.find(
      (category) => category.id === selectedCategory
    );
  }, [selectedCategory, typedCategoriesData]);

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory || !typedCategoriesData) return [];
    return typedCategoriesData.subcategories.filter((subcategory) =>
      subcategory.categories.some(
        (cat) => cat.categories_id === selectedCategory
      )
    );
  }, [selectedCategory, typedCategoriesData]);

  if (isError) {
    return (
      <div>Помилка завантаження категорій: {(error as Error).message}</div>
    );
  }

  if (!typedCategoriesData) {
    return null;
  }

  return (
    <div className={styles.categories}>
      {selectedCategoryData ? (
        <>
          <button
            className={`${styles.categoryButton} ${styles.categoryButtonActive}`}
            onClick={() =>
              handleCategoryClick(
                selectedCategoryData.id,
                selectedCategoryData.slug
              )
            }
          >
            {getTranslation(selectedCategoryData, "category_name")} /
          </button>
          <div
            className={`${styles.subcategoryList} ${styles.subcategoryListOpen}`}
          >
            {filteredSubcategories.map((subcategory: Subcategory) => (
              <button
                key={subcategory.id}
                className={`${styles.categoryButton} ${
                  styles.subcategoryButton
                } ${
                  selectedSubcategories.includes(subcategory.id)
                    ? styles.subcategoryButtonActive
                    : ""
                }`}
                onClick={() => handleSubcategoryClick(subcategory.id)}
              >
                {getTranslation(subcategory, "subcategory_name")}
              </button>
            ))}
          </div>
        </>
      ) : (
        <ul className={styles.mainCategories}>
          {typedCategoriesData.categories.map((category: Category) => (
            <button
              key={category.id}
              className={styles.categoryButton}
              onClick={() => handleCategoryClick(category.id, category.slug)}
            >
              {getTranslation(category, "category_name")}
            </button>
          ))}
          <Link to="/dictionary">
            <button className={styles.categoryButton}>
              {t("dictionaryButton")}
            </button>
          </Link>
          <AdditionalFilter coursesData={coursesData} />
        </ul>
      )}
    </div>
  );
};

export default React.memo(Categories);
