import React, { useMemo, useCallback } from "react";
import { useFilters } from "../../hooks/useFilters";
import { useAllContent } from "../../hooks/useAllContent";
import styles from "./YearsList.module.css";

const YearsList: React.FC = () => {
  const {
    selectedYear,
    setSelectedYear,
    filters,
    selectedCategory,
    selectedSubcategories,
  } = useFilters();

  const { data: allContentData } = useAllContent({
    selectedCategory,
    selectedSubcategories,
    filters,
    selectedYear,
  });

  const handleYearSelect = useCallback(
    (year: number) => {
      setSelectedYear(selectedYear === year ? null : year);
    },
    [selectedYear, setSelectedYear]
  );

  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2016 + 1 }, (_, i) => 2016 + i);
  }, []);

  const yearsWithContent = useMemo(() => {
    if (!allContentData || !allContentData.pages) return new Set<number>();

    const years = new Set<number>();

    allContentData.pages.forEach((page) => {
      page.data.forEach((content) => {
        if (content.years && Array.isArray(content.years)) {
          content.years.forEach((yearObj) => {
            if (yearObj.years_id && typeof yearObj.years_id.year === "number") {
              years.add(yearObj.years_id.year);
            }
          });
        }
      });
    });

    return years;
  }, [allContentData]);

  return (
    <div className={styles.yearsList}>
      {availableYears.map((year) => (
        <button
          key={year}
          onClick={() => handleYearSelect(year)}
          className={`${styles.yearButton} ${
            selectedYear === year ? styles.yearButtonActive : ""
          } ${!yearsWithContent.has(year) ? styles.yearButtonDisabled : ""}`}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearsList;
