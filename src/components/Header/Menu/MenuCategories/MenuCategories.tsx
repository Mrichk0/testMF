// import React, { useMemo } from "react";
// import { useCategories } from "../../../../hooks/useCategories";
// import { useFilters } from "../../../../hooks/useFilters";
// import { useTranslation } from "react-i18next";
// import { useTranslatedContent } from "../../../../hooks/useTranslatedContent";
// import { useCourses } from "../../../../hooks/useAllContent";
// import styles from "./MenuCategories.module.css";
// import { Course } from "../../../../types";

// const MenuCategories: React.FC = () => {
//   const { t } = useTranslation();
//   const { data: categoriesData, isLoading, isError, error } = useCategories();
//   const {
//     selectedCategory,
//     selectedSubcategories,
//     setSelectedCategory,
//     setSelectedSubcategories,
//     filters,
//     selectedYear,
//   } = useFilters();
//   const { getTranslation } = useTranslatedContent();
//   const { data: coursesData, isLoading: isCoursesLoading } = useCourses({
//     selectedCategory,
//     selectedSubcategories,
//     filters,
//     selectedYear,
//   });

//   const handleCategoryClick = (categoryId: string) => {
//     setSelectedCategory((prev) => {
//       const newValue = prev === categoryId ? null : categoryId;
//       return newValue;
//     });
//     setSelectedSubcategories([]);
//   };

//   const handleSubcategoryClick = (
//     categoryId: string,
//     subcategoryId: string
//   ) => {
//     setSelectedCategory(categoryId);
//     setSelectedSubcategories((prev) => {
//       const newValue = prev.includes(subcategoryId)
//         ? prev.filter((id) => id !== subcategoryId)
//         : [...prev, subcategoryId];
//       return newValue;
//     });
//   };

//   const getCategoryId = (categories: Course["categories"]): string => {
//     if (typeof categories === "string") {
//       return categories;
//     }
//     return categories?.id || "";
//   };

//   const isCategoryDisabled = useMemo(
//     () => (categoryId: string) => {
//       if (!coursesData) return true;
//       const isDisabled = !coursesData.pages.some((page) =>
//         page.data.some((course) => {
//           return getCategoryId(course.categories) === categoryId;
//         })
//       );
//       return isDisabled;
//     },
//     [coursesData]
//   );

//   const isSubcategoryDisabled = useMemo(
//     () => (categoryId: string, subcategoryId: string) => {
//       if (!coursesData) return true;
//       const isDisabled = !coursesData.pages.some((page) =>
//         page.data.some((course) => {
//           const hasCategory = getCategoryId(course.categories) === categoryId;
//           const hasSubcategory = course.subcategories?.some(
//             (sub) => sub.subcategories_id === subcategoryId
//           );
//           return hasCategory && hasSubcategory;
//         })
//       );
//       return isDisabled;
//     },
//     [coursesData]
//   );

//   if (isLoading || isCoursesLoading) return <div>Loading...</div>;
//   if (isError)
//     return <div>Error loading categories: {(error as Error).message}</div>;
//   if (!categoriesData || !coursesData) return <div>No data available</div>;

//   return (
//     <div className={styles.menuCategories}>
//       <div className={styles.categoriesColumn}>
//         {categoriesData.categories.map((category) => {
//           const categoryDisabled = isCategoryDisabled(category.id);
//           return (
//             <div key={category.id} className={styles.categoryGroup}>
//               <button
//                 className={`${styles.categoryName} ${
//                   selectedCategory === category.id ? styles.active : ""
//                 } ${categoryDisabled ? styles.disabled : ""}`}
//                 onClick={() =>
//                   !categoryDisabled && handleCategoryClick(category.id)
//                 }
//                 disabled={categoryDisabled}
//               >
//                 {getTranslation(category, "category_name")}
//               </button>
//               {" / "}
//               {categoriesData.subcategories
//                 .filter((subcategory) =>
//                   subcategory.categories.some(
//                     (cat) => cat.categories_id === category.id
//                   )
//                 )
//                 .map((subcategory, index, array) => {
//                   const subcategoryDisabled = isSubcategoryDisabled(
//                     category.id,
//                     subcategory.id
//                   );
//                   return (
//                     <React.Fragment key={subcategory.id}>
//                       <button
//                         className={`${styles.subcategoryItem} ${
//                           selectedSubcategories.includes(subcategory.id)
//                             ? styles.active
//                             : ""
//                         } ${subcategoryDisabled ? styles.disabled : ""}`}
//                         onClick={() =>
//                           !subcategoryDisabled &&
//                           handleSubcategoryClick(category.id, subcategory.id)
//                         }
//                         disabled={subcategoryDisabled}
//                       >
//                         {getTranslation(subcategory, "subcategory_name")}
//                       </button>
//                       {index < array.length - 1 && " "}
//                     </React.Fragment>
//                   );
//                 })}
//             </div>
//           );
//         })}
//       </div>
//       <div className={styles.additionalLinksColumn}>
//         <ul className={styles.additionalLinksList}>
//           <li>{t("archiveProjects")}</li>
//           <li>{t("aboutFund")}</li>
//           <li>{t("contacts")}</li>
//           <li>{t("diary")}</li>
//           <li>{t("englishVersion")}</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MenuCategories;

import React, { useMemo } from "react";

import { useFilters } from "../../../../hooks/useFilters";
import { useTranslation } from "react-i18next";
import { useTranslatedContent } from "../../../../hooks/useTranslatedContent";
import { useAllContent } from "../../../../hooks/useAllContent";
import styles from "./MenuCategories.module.css";
import { AllContent } from "../../../../types";
import { useCategories } from "../../../../hooks/useCategories";

const MenuCategories: React.FC = () => {
  const { t } = useTranslation();
  const { data: categoriesData, isLoading, isError, error } = useCategories();
  const {
    selectedCategory,
    selectedSubcategories,
    setSelectedCategory,
    setSelectedSubcategories,
    filters,
    selectedYear,
  } = useFilters();
  const { getTranslation } = useTranslatedContent();
  const { data: allContentData, isLoading: isAllContentLoading } =
    useAllContent({
      selectedCategory,
      selectedSubcategories,
      filters,
      selectedYear,
    });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory((prev) => {
      const newValue = prev === categoryId ? null : categoryId;
      return newValue;
    });
    setSelectedSubcategories([]);
  };

  const handleSubcategoryClick = (
    categoryId: string,
    subcategoryId: string
  ) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategories((prev) => {
      const newValue = prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId];
      return newValue;
    });
  };

  const getCategoryId = (category: AllContent["category"]): string => {
    return category?.id || "";
  };

  const isCategoryDisabled = useMemo(
    () => (categoryId: string) => {
      if (!allContentData) return true;
      const isDisabled = !allContentData.pages.some((page) =>
        page.data.some((content) => {
          return getCategoryId(content.category) === categoryId;
        })
      );
      return isDisabled;
    },
    [allContentData]
  );

  const isSubcategoryDisabled = useMemo(
    () => (categoryId: string, subcategoryId: string) => {
      if (!allContentData) return true;
      const isDisabled = !allContentData.pages.some((page) =>
        page.data.some((content) => {
          const hasCategory = getCategoryId(content.category) === categoryId;
          const hasSubcategory = content.subcategories?.some(
            (sub) => sub.subcategories_id === subcategoryId
          );
          return hasCategory && hasSubcategory;
        })
      );
      return isDisabled;
    },
    [allContentData]
  );

  if (isLoading || isAllContentLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error loading categories: {(error as Error).message}</div>;
  if (!categoriesData || !allContentData) return <div>No data available</div>;

  return (
    <div className={styles.menuCategories}>
      <div className={styles.categoriesColumn}>
        {categoriesData.categories.map((category) => {
          const categoryDisabled = isCategoryDisabled(category.id);
          return (
            <div key={category.id} className={styles.categoryGroup}>
              <button
                className={`${styles.categoryName} ${
                  selectedCategory === category.id ? styles.active : ""
                } ${categoryDisabled ? styles.disabled : ""}`}
                onClick={() =>
                  !categoryDisabled && handleCategoryClick(category.id)
                }
                disabled={categoryDisabled}
              >
                {getTranslation(category, "category_name")}
              </button>
              {" / "}
              {categoriesData.subcategories
                .filter((subcategory) =>
                  subcategory.categories.some(
                    (cat) => cat.categories_id === category.id
                  )
                )
                .map((subcategory, index, array) => {
                  const subcategoryDisabled = isSubcategoryDisabled(
                    category.id,
                    subcategory.id
                  );
                  return (
                    <React.Fragment key={subcategory.id}>
                      <button
                        className={`${styles.subcategoryItem} ${
                          selectedSubcategories.includes(subcategory.id)
                            ? styles.active
                            : ""
                        } ${subcategoryDisabled ? styles.disabled : ""}`}
                        onClick={() =>
                          !subcategoryDisabled &&
                          handleSubcategoryClick(category.id, subcategory.id)
                        }
                        disabled={subcategoryDisabled}
                      >
                        {getTranslation(subcategory, "subcategory_name")}
                      </button>
                      {index < array.length - 1 && " "}
                    </React.Fragment>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className={styles.additionalLinksColumn}>
        <ul className={styles.additionalLinksList}>
          <li>{t("archiveProjects")}</li>
          <li>{t("aboutFund")}</li>
          <li>{t("contacts")}</li>
          <li>{t("diary")}</li>
          <li>{t("englishVersion")}</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuCategories;
