import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

interface Filters {
  archiveStatus: "current" | "archive" | null;
  [key: string]: boolean | "current" | "archive" | null;
}

export const useFilters = () => {
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
    (value: "current" | "archive" | null) => {
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
    setSelectedCategory: (category: string | null) => {
      setSelectedCategory(category);
    },
    setSelectedSubcategories: (subcategories: string[]) => {
      setSelectedSubcategories(subcategories);
    },
    setSelectedYear: (year: number | null) => {
      setSelectedYear(year);
    },
    clearAllFilters,
  };
};
