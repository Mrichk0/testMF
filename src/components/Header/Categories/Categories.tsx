import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useFilters } from "../../../hooks/useFilters";
import { useTranslation } from "react-i18next";
import { useTranslatedContent } from "../../../hooks/useTranslatedContent";

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { data: categoriesData, isLoading, isError, error } = useCategories();

  console.log("fromCategory categoriesData", categoriesData);
  const {
    selectedCategory,
    selectedSubcategories,
    setSelectedCategory,
    setSelectedSubcategories,
  } = useFilters();
  const { getTranslation } = useTranslatedContent();

  if (isLoading) return <div>Loading categories...</div>;
  if (isError)
    return <div>Error loading categories: {(error as Error).message}</div>;
  if (!categoriesData) return <div>No categories data available</div>;

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
    setSelectedSubcategories([]);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  return (
    <div className="categories">
      {selectedCategory ? (
        <>
          {categoriesData.categories
            .filter((category) => category.id === selectedCategory)
            .map((category) => (
              <React.Fragment key={category.id}>
                <button
                  className="category-button category-button--active"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {getTranslation(category, "category_name")}
                </button>
                {categoriesData.subcategories
                  .filter((subcategory) =>
                    subcategory.categories.some(
                      (cat) => cat.categories_id === category.id
                    )
                  )
                  .map((subcategory) => (
                    <button
                      key={subcategory.id}
                      className={`category-button subcategory-button ${
                        selectedSubcategories.includes(subcategory.id)
                          ? "subcategory-button--active"
                          : ""
                      }`}
                      onClick={() => handleSubcategoryClick(subcategory.id)}
                    >
                      {getTranslation(subcategory, "subcategory_name")}
                    </button>
                  ))}
              </React.Fragment>
            ))}
        </>
      ) : (
        <ul className="main-categories">
          {categoriesData.categories.map((category) => (
            <button
              key={category.id}
              className="category-button"
              onClick={() => handleCategoryClick(category.id)}
            >
              {getTranslation(category, "category_name")}
            </button>
          ))}
          <Link to="/dictionary">
            <button className="category-button">{t("dictionaryButton")}</button>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Categories;
