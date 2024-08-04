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
