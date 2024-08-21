import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useFilters } from "../../../hooks/useFilters";
import { useAllContent } from "../../../hooks/useAllContent";
import { useTranslatedContent } from "../../../hooks/useTranslatedContent";
import { CategoriesData, SubcategoryCategory } from "../../../types/categories";
import AdditionalFilter from "../AdditionalFilter/AdditionalFilter";
import styles from "./Categories.module.css";

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { data: categoriesData, isLoading, isError, error } = useCategories();
  const {
    filters,
    selectedCategory,
    selectedSubcategories,
    selectedYear,
    handleFilterChange,
    handleArchiveChange,
    setSelectedCategory,
    setSelectedSubcategories,
    clearAllFilters,
  } = useFilters();
  const { getTranslation } = useTranslatedContent();
  const { data: coursesData } = useAllContent({
    selectedCategory,
    selectedSubcategories,
    filters,
    selectedYear,
  });

  const navigate = useNavigate();

  // if (isLoading) return <div>Loading categories...</div>;
  if (isError)
    return <div>Error loading categories: {(error as Error).message}</div>;
  if (!categoriesData) return <div>No categories data available</div>;

  const typedCategoriesData = categoriesData as CategoriesData;

  const handleCategoryClick = (categoryId: string, categorySlug: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    if (newCategory) {
      navigate(`/${categorySlug}`);
    } else {
      navigate("/");
    }
    setSelectedSubcategories([]);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategories(
      selectedSubcategories.includes(subcategoryId)
        ? selectedSubcategories.filter((id) => id !== subcategoryId)
        : [...selectedSubcategories, subcategoryId]
    );
  };

  return (
    <div className={styles.categories}>
      {selectedCategory ? (
        <>
          {typedCategoriesData.categories
            .filter((category) => category.id === selectedCategory)
            .map((category) => (
              <React.Fragment key={category.id}>
                <button
                  className={`${styles.categoryButton} ${styles.categoryButtonActive}`}
                  onClick={() =>
                    handleCategoryClick(category.id, category.slug)
                  }
                >
                  {getTranslation(category, "category_name")} /
                </button>
                <div
                  className={`${styles.subcategoryList} ${styles.subcategoryListOpen}`}
                >
                  {typedCategoriesData.subcategories
                    .filter((subcategory) =>
                      subcategory.categories.some(
                        (cat: SubcategoryCategory) =>
                          cat.categories_id === category.id
                      )
                    )
                    .map((subcategory) => (
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
              </React.Fragment>
            ))}
        </>
      ) : (
        <ul className={styles.mainCategories}>
          {typedCategoriesData.categories.map((category) => (
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
          <AdditionalFilter
            // filters={filters}
            // handleFilterChange={handleFilterChange}
            // handleArchiveChange={handleArchiveChange}
            // clearAllFilters={clearAllFilters}
            coursesData={coursesData}
          />
        </ul>
      )}
    </div>
  );
};

export default Categories;
