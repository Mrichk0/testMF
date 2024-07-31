import { useQuery } from "react-query";
import { fetchCategoriesAndCourses } from "../utils/api";

export const useCategories = () => {
  return useQuery(["categories"], fetchCategoriesAndCourses, {
    onSuccess: (data) => console.log("Categories data fetched:", data),
    onError: (error) => console.error("Error fetching categories:", error),
  });
};
