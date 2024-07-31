// import { useInfiniteQuery } from "react-query";
// import { fetchFilteredCourses } from "../utils/api";
// import { Filters } from "../types";

// interface UseCoursesProps {
//   selectedCategory: string | null;
//   selectedSubcategories: string[];
//   filters: Filters;
//   selectedYear: number | null;
// }

// export const useCourses = ({
//   selectedCategory,
//   selectedSubcategories,
//   filters,
//   selectedYear,
// }: UseCoursesProps) => {
//   return useInfiniteQuery(
//     [
//       "filteredCourses",
//       selectedCategory,
//       selectedSubcategories,
//       filters,
//       selectedYear,
//     ],
//     ({ pageParam = 1 }) =>
//       fetchFilteredCourses({
//         pageParam,
//         categoryId: selectedCategory,
//         subcategoryIds: selectedSubcategories,
//         filters,
//         selectedYear,
//       }),
//     {
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//     }
//   );
// };

// import { useInfiniteQuery } from "react-query";
// import { fetchFilteredCourses } from "../utils/api";
// import { Filters } from "../types";

// interface UseCoursesProps {
//   selectedCategory: string | null;
//   selectedSubcategories: string[];
//   filters: Filters;
//   selectedYear: number | null;
// }

// export const useCourses = ({
//   selectedCategory,
//   selectedSubcategories,
//   filters,
//   selectedYear,
// }: UseCoursesProps) => {
//   return useInfiniteQuery(
//     [
//       "filteredCourses",
//       selectedCategory,
//       selectedSubcategories,
//       filters,
//       selectedYear,
//     ],
//     ({ pageParam = 1 }) =>
//       fetchFilteredCourses({
//         pageParam,
//         categoryId: selectedCategory,
//         subcategoryIds: selectedSubcategories,
//         filters,
//         selectedYear,
//       }),
//     {
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//     }
//   );
// };

// import { useInfiniteQuery } from "react-query";
// import { fetchFilteredCourses } from "../utils/api";
// import { Filters } from "../types";

// interface UseCoursesProps {
//   selectedCategory: string | null;
//   selectedSubcategories: string[];
//   filters: Filters;
//   selectedYear: number | null;
// }

// export const useCourses = ({
//   selectedCategory,
//   selectedSubcategories,
//   filters,
//   selectedYear,
// }: UseCoursesProps) => {
//   return useInfiniteQuery(
//     [
//       "filteredCourses",
//       selectedCategory,
//       selectedSubcategories,
//       filters,
//       selectedYear,
//     ],
//     ({ pageParam = 1 }) =>
//       fetchFilteredCourses({
//         pageParam,
//         categoryId: selectedCategory,
//         subcategoryIds: selectedSubcategories,
//         filters,
//         selectedYear,
//       }),
//     {
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//     }
//   );
// };

import { useInfiniteQuery } from "react-query";
import { fetchFilteredAllContent } from "../utils/api";
import { Filters } from "../types";

interface UseAllContentProps {
  selectedCategory: string | null;
  selectedSubcategories: string[];
  filters: Filters;
  selectedYear: number | null;
}

export const useAllContent = ({
  selectedCategory,
  selectedSubcategories,
  filters,
  selectedYear,
}: UseAllContentProps) => {
  return useInfiniteQuery(
    [
      "filteredAllContent",
      selectedCategory,
      selectedSubcategories,
      filters,
      selectedYear,
    ],
    ({ pageParam = 1 }) =>
      fetchFilteredAllContent({
        pageParam,
        categoryId: selectedCategory,
        subcategoryIds: selectedSubcategories,
        filters,
        selectedYear,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};
