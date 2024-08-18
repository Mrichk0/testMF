import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Filters } from "../types";

export const useFilters = () => {
  const [filters, setFilters] = useLocalStorage<Filters>("courseFilters", {
    hasVideo: false,
    hasAudio: false,
    hasPhoto: false,
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
    (filterName: keyof Filters) => {
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          [filterName]: !prev[filterName],
        };

        return newFilters;
      });
    },
    [setFilters]
  );

  const handleActualChange = useCallback(
    (value: boolean | null) => {
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          isActual: prev.isActual === value ? null : value,
        };

        return newFilters;
      });
    },
    [setFilters]
  );

  const clearAllFilters = useCallback(() => {
    setFilters({
      hasVideo: false,
      hasAudio: false,
      hasPhoto: false,
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
    handleActualChange,
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
