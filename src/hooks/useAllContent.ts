import { useInfiniteQuery, QueryClient } from "react-query";
import { fetchFilteredAllContent } from "../utils/api";
import { AllContent, Filters } from "../types";

interface UseAllContentProps {
  selectedCategory: string | null;
  selectedSubcategories: string[];
  filters: Filters;
  selectedYear: number | null;
}

interface AllContentResponse {
  data: AllContent[];
  nextPage: number | null;
  totalItems: number;
}

export const useAllContent = ({
  selectedCategory,
  selectedSubcategories,
  filters,
  selectedYear,
}: UseAllContentProps) => {
  return useInfiniteQuery<AllContentResponse, Error>(
    [
      "filteredAllContent",
      selectedCategory,
      selectedSubcategories,
      filters,
      selectedYear,
    ],
    async ({ pageParam = 1 }) => {
      const response = await fetchFilteredAllContent({
        pageParam,
        categoryId: selectedCategory,
        subcategoryIds: selectedSubcategories,
        filters,
        selectedYear,
      });
      return {
        ...response,
        nextPage: response.nextPage ?? null,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: (error) => {
        console.error("Error fetching all content:", error);
      },
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};

export const prefetchAllContent = async (
  props: UseAllContentProps,
  queryClient: QueryClient
): Promise<void> => {
  await queryClient.prefetchInfiniteQuery<AllContentResponse, Error>(
    [
      "filteredAllContent",
      props.selectedCategory,
      props.selectedSubcategories,
      props.filters,
      props.selectedYear,
    ],
    async ({ pageParam = 1 }) => {
      const response = await fetchFilteredAllContent({
        pageParam,
        categoryId: props.selectedCategory,
        subcategoryIds: props.selectedSubcategories,
        filters: props.filters,
        selectedYear: props.selectedYear,
      });
      return {
        ...response,
        nextPage: response.nextPage ?? null,
      };
    }
  );
};
