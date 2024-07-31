import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Filters } from "../types";

export const useFilters = () => {
  const [filters, setFilters] = useLocalStorage<Filters>("courseFilters", {
    hasVideo: false,
    hasAudio: false,
    hasPhoto: false,
    isActual: null,
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
      setFilters((prev) => ({
        ...prev,
        [filterName]: !prev[filterName],
      }));
    },
    [setFilters]
  );

  const handleActualChange = useCallback(
    (value: boolean) => {
      setFilters((prev) => ({
        ...prev,
        isActual: prev.isActual === value ? null : value,
      }));
    },
    [setFilters]
  );

  const clearAllFilters = useCallback(() => {
    setFilters({
      hasVideo: false,
      hasAudio: false,
      hasPhoto: false,
      isActual: null,
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
    setSelectedCategory,
    setSelectedSubcategories,
    setSelectedYear,
    clearAllFilters,
  };
};
