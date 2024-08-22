import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

type ArchiveStatus = "current" | "archive" | null;

interface Filters {
  archiveStatus: ArchiveStatus;
  [key: string]: boolean | ArchiveStatus;
}

interface UseFiltersReturn {
  filters: Filters;
  selectedCategory: string | null;
  selectedSubcategories: string[];
  selectedYear: number | null;
  handleFilterChange: (filterName: string, value: boolean) => void;
  handleArchiveChange: (value: ArchiveStatus) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedSubcategories: (
    subcategories: string[] | ((prev: string[]) => string[])
  ) => void;
  setSelectedYear: (year: number | null) => void;
  clearAllFilters: () => void;
}

export const useFilters = (): UseFiltersReturn => {
  const [filters, setFilters] = useLocalStorage<Filters>("courseFilters", {
    archiveStatus: null,
  });

  const [selectedCategory, setSelectedCategory] = useLocalStorage<
    string | null
  >("selectedCategory", null);
  const [selectedSubcategories, setSelectedSubcategories] = useLocalStorage<
    string[]
  >("selectedSubcategories", []);

  const [selectedYear, setSelectedYear] = useLocalStorage<number | null>(
    "selectedYear",
    null
  );

  const handleFilterChange = useCallback(
    (filterName: string, value: boolean) => {
      setFilters((prev) => ({
        ...prev,
        [filterName]: value,
      }));
    },
    [setFilters]
  );

  const handleArchiveChange = useCallback(
    (value: ArchiveStatus) => {
      setFilters((prev) => ({
        ...prev,
        archiveStatus: prev.archiveStatus === value ? null : value,
      }));
    },
    [setFilters]
  );

  const clearAllFilters = useCallback(() => {
    setFilters({
      archiveStatus: null,
    });
    setSelectedCategory(null);
    setSelectedSubcategories([]);
    setSelectedYear(null);
  }, [
    setFilters,
    setSelectedCategory,
    setSelectedSubcategories,
    setSelectedYear,
  ]);

  return {
    filters,
    selectedCategory,
    selectedSubcategories,
    selectedYear,
    handleFilterChange,
    handleArchiveChange,
    setSelectedCategory,
    setSelectedSubcategories,
    setSelectedYear,
    clearAllFilters,
  };
};
