import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCategories } from "./useCategories";
import { useCategory } from "../components/Header/Categories/CategoryContext";

export const usePageCategory = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { selectedCategory, setSelectedCategory } = useCategory();
  const { data: categoriesData } = useCategories();

  useEffect(() => {
    if (categorySlug && categoriesData) {
      const category = categoriesData.categories.find(
        (cat) => cat.slug === categorySlug
      );
      if (category) {
        setSelectedCategory(category.id);
      } else {
        setSelectedCategory(null);
      }
    } else if (!categorySlug) {
      setSelectedCategory(null);
    }
  }, [categorySlug, categoriesData, setSelectedCategory]);

  return { selectedCategory, setSelectedCategory };
};
