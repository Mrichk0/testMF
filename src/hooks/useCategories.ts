import { useQuery } from "react-query";
import { fetchCategoriesAndCourses } from "../utils/api";
import { CategoriesData } from "../types/categories";

export const useCategories = () => {
  return useQuery<CategoriesData, Error>(
    ["categories"],
    fetchCategoriesAndCourses
  );
};
