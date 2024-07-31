// import React, { useMemo, useCallback } from "react";
// import { useFilters } from "../../hooks/useFilters";
// import { useCourses } from "../../hooks/useAllContent";
// import styles from "./YearsList.module.css";

// const YearsList: React.FC = () => {
//   const {
//     selectedYear,
//     setSelectedYear,
//     filters,
//     selectedCategory,
//     selectedSubcategories,
//   } = useFilters();
//   const { data: coursesData } = useCourses({
//     selectedCategory,
//     selectedSubcategories,
//     filters,
//     selectedYear,
//   });

//   const handleYearSelect = useCallback(
//     (year: number) => {
//       setSelectedYear((prevYear) => (prevYear === year ? null : year));
//     },
//     [setSelectedYear]
//   );

//   const availableYears = useMemo(() => {
//     const currentYear = new Date().getFullYear();
//     return Array.from({ length: 10 }, (_, i) => currentYear - i).reverse();
//   }, []);

//   const yearsWithCourses = useMemo(() => {
//     if (!coursesData) return new Set();
//     const years = new Set();
//     coursesData.pages.forEach((page) => {
//       page.data.forEach((course) => {
//         if (course.year) years.add(course.year);
//       });
//     });
//     return years;
//   }, [coursesData]);

//   return (
//     <div className={styles.yearsList}>
//       {availableYears.map((year) => (
//         <button
//           key={year}
//           onClick={() => handleYearSelect(year)}
//           className={`${styles.yearButton} ${
//             selectedYear === year ? styles.yearButtonActive : ""
//           } ${!yearsWithCourses.has(year) ? styles.yearButtonDisabled : ""}`}
//         >
//           {year}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default YearsList;

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
      setSelectedYear((prevYear) => (prevYear === year ? null : year));
    },
    [setSelectedYear]
  );

  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - i).reverse();
  }, []);

  const yearsWithContent = useMemo(() => {
    if (!allContentData) return new Set();
    const years = new Set();
    allContentData.pages.forEach((page) => {
      page.data.forEach((content) => {
        if (content.year) years.add(content.year);
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
