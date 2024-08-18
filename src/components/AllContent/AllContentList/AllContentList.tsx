// import React, { useEffect, useCallback, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useInView } from "react-intersection-observer";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// import { useSavedContent } from "../../../hooks/useSavedContent";
// import AllContentItem from "../AllContentItem/AllContentItem";
// import YearsList from "../../YearsList/YearsList";
// import { getSubcategoryTranslations } from "../../../utils/api";
// import { AllContent } from "../../../types";
// import styles from "./AllContentList.module.css";

// const getCategorySlug = (content: AllContent): string => {
//   if (!content || !content.category || !content.category.slug) {
//     return "";
//   }
//   return content.category.slug;
// };

// const AllContentList: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
//   const { addSavedContent, removeSavedContent, savedContent } =
//     useSavedContent();
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//     error,
//   } = useAllContent({
//     selectedCategory,
//     selectedSubcategories,
//     filters,
//     selectedYear,
//   });

//   const [categoryInfos, setCategoryInfos] = useState<{ [key: number]: string }>(
//     {}
//   );

//   const { ref: infiniteScrollRef, inView } = useInView({ threshold: 0 });

//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

//   const handleProgramClick = useCallback(
//     (content: AllContent) => {
//       const categorySlug = getCategorySlug(content);
//       const safeCategorySlug = categorySlug || "uncategorized";
//       navigate(`/${safeCategorySlug}/${content.slug}`);
//     },
//     [navigate]
//   );

//   const handleSave = useCallback(
//     (content: AllContent) => {
//       const isSaved = savedContent.some((saved) => saved.id === content.id);
//       if (isSaved) {
//         removeSavedContent(content.id);
//       } else {
//         addSavedContent(content);
//       }
//     },
//     [addSavedContent, removeSavedContent, savedContent]
//   );

//   const getTranslation = useCallback(
//     (
//       translations: AllContent["translations"],
//       field: "title" | "description"
//     ) => {
//       const translation =
//         translations.find((t) => t.languages_code === i18n.language) ||
//         translations[0];
//       return translation ? translation[field] : "";
//     },
//     [i18n.language]
//   );

//   const getCategoryInfo = useCallback(
//     async (content: AllContent) => {
//       let categoryName = t("uncategorized");
//       if (content.category && content.category.translations) {
//         const categoryTranslation =
//           content.category.translations.find(
//             (trans) => trans.languages_code === i18n.language
//           ) || content.category.translations[0];

//         if (categoryTranslation) {
//           categoryName = categoryTranslation.category_name;
//         } else {
//           categoryName = content.category.slug;
//         }
//       }

//       let subcategoryNames: string[] = [];
//       if (
//         Array.isArray(content.subcategories) &&
//         content.subcategories.length > 0
//       ) {
//         for (const sub of content.subcategories) {
//           try {
//             const subTranslations = await getSubcategoryTranslations(
//               sub.subcategories_id
//             );
//             const subTranslation =
//               subTranslations.find(
//                 (trans) => trans.languages_code === i18n.language
//               ) || subTranslations[0];

//             if (subTranslation) {
//               subcategoryNames.push(subTranslation.subcategory_name);
//             } else {
//               subcategoryNames.push(`Subcategory ${sub.subcategories_id}`);
//             }
//           } catch (error) {
//             subcategoryNames.push(`Subcategory ${sub.subcategories_id}`);
//           }
//         }
//       }

//       return `${categoryName}${
//         subcategoryNames.length > 0 ? ` / ${subcategoryNames.join(", ")}` : ""
//       }`;
//     },
//     [t, i18n.language]
//   );

//   useEffect(() => {
//     const fetchCategoryInfos = async () => {
//       if (data?.pages) {
//         const newCategoryInfos: { [key: number]: string } = {};
//         for (const page of data.pages) {
//           for (const content of page.data) {
//             if (!categoryInfos[content.id]) {
//               newCategoryInfos[content.id] = await getCategoryInfo(content);
//             }
//           }
//         }
//         setCategoryInfos((prev) => ({ ...prev, ...newCategoryInfos }));
//       }
//     };

//     fetchCategoryInfos();
//   }, [data, getCategoryInfo]);

//   const formatDateRange = useCallback(
//     (start: string, end: string) => {
//       const startDate = new Date(start);
//       const endDate = new Date(end);
//       const options: Intl.DateTimeFormatOptions = {
//         day: "numeric",
//         month: "long",
//       };

//       if (startDate.getMonth() === endDate.getMonth()) {
//         return `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString(
//           i18n.language,
//           { month: "long" }
//         )}`;
//       } else {
//         return `${startDate.toLocaleDateString(
//           i18n.language,
//           options
//         )} - ${endDate.toLocaleDateString(i18n.language, options)}`;
//       }
//     },
//     [i18n.language]
//   );

//   const getContentInfo = useCallback(
//     (content: AllContent) => {
//       const contentTypes = [];
//       if (content.video) contentTypes.push(t("video"));
//       if (content.photo) contentTypes.push(t("photo"));
//       if (content.audio) contentTypes.push(t("audio"));
//       return contentTypes.join(", ");
//     },
//     [t]
//   );

//   const allContentList = useMemo(
//     () => data?.pages.flatMap((page) => page.data) ?? [],
//     [data]
//   );

//   const memoizedAllContentItems = useMemo(() => {
//     return allContentList.map((content) => (
//       <AllContentItem
//         key={content.id}
//         title={getTranslation(content.translations, "title")}
//         description={getTranslation(content.translations, "description")}
//         categoryInfo={categoryInfos[content.id] || t("loading")}
//         dateRange={formatDateRange(content.start_date, content.end_date)}
//         contentInfo={getContentInfo(content)}
//         isCurrent={content.is_current}
//         photoUrl={
//           content.photo
//             ? `http://0.0.0.0:8055/assets/${content.photo.id}`
//             : undefined
//         }
//         onSave={() => handleSave(content)}
//         onProgramClick={() => handleProgramClick(content)}
//         isSaved={savedContent.some((saved) => saved.id === content.id)}
//       />
//     ));
//   }, [
//     allContentList,
//     getTranslation,
//     categoryInfos,
//     t,
//     formatDateRange,
//     getContentInfo,
//     handleSave,
//     handleProgramClick,
//     savedContent,
//   ]);

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   return (
//     <>
//       <YearsList />
//       <ul className={styles.allContentList}>
//         {memoizedAllContentItems}
//         {(hasNextPage || isFetchingNextPage) && (
//           <div ref={infiniteScrollRef} className="loader">
//             {isFetchingNextPage ? t("loading") : t("loadMore")}
//           </div>
//         )}
//       </ul>
//     </>
//   );
// };

// export default React.memo(AllContentList);

import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useFilters } from "../../../hooks/useFilters";
import { useAllContent } from "../../../hooks/useAllContent";
import AllContentItem from "../AllContentItem/AllContentItem";
import YearsList from "../../YearsList/YearsList";

import { getSubcategoryTranslations } from "../../../utils/api";
import { AllContent } from "../../../types";
import styles from "./AllContentList.module.css";
import SaveContentButton from "../../Buttons/SaveButton/SaveContentButton";

const getCategorySlug = (content: AllContent): string => {
  if (!content || !content.category || !content.category.slug) {
    return "";
  }
  return content.category.slug;
};

const AllContentList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { filters, selectedCategory, selectedSubcategories, selectedYear } =
    useFilters();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useAllContent({
    selectedCategory,
    selectedSubcategories,
    filters,
    selectedYear,
  });

  const [categoryInfos, setCategoryInfos] = useState<{ [key: number]: string }>(
    {}
  );

  const { ref: infiniteScrollRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleProgramClick = useCallback(
    (content: AllContent) => {
      const categorySlug = getCategorySlug(content);
      const safeCategorySlug = categorySlug || "uncategorized";
      navigate(`/${safeCategorySlug}/${content.slug}`);
    },
    [navigate]
  );

  const getTranslation = useCallback(
    (
      translations: AllContent["translations"],
      field: "title" | "description"
    ) => {
      const translation =
        translations.find((t) => t.languages_code === i18n.language) ||
        translations[0];
      return translation ? translation[field] : "";
    },
    [i18n.language]
  );

  const getCategoryInfo = useCallback(
    async (content: AllContent) => {
      let categoryName = t("uncategorized");
      if (content.category && content.category.translations) {
        const categoryTranslation =
          content.category.translations.find(
            (trans) => trans.languages_code === i18n.language
          ) || content.category.translations[0];

        if (categoryTranslation) {
          categoryName = categoryTranslation.category_name;
        } else {
          categoryName = content.category.slug;
        }
      }

      let subcategoryNames: string[] = [];
      if (
        Array.isArray(content.subcategories) &&
        content.subcategories.length > 0
      ) {
        for (const sub of content.subcategories) {
          try {
            const subTranslations = await getSubcategoryTranslations(
              sub.subcategories_id
            );
            const subTranslation =
              subTranslations.find(
                (trans) => trans.languages_code === i18n.language
              ) || subTranslations[0];

            if (subTranslation) {
              subcategoryNames.push(subTranslation.subcategory_name);
            } else {
              subcategoryNames.push(`Subcategory ${sub.subcategories_id}`);
            }
          } catch (error) {
            subcategoryNames.push(`Subcategory ${sub.subcategories_id}`);
          }
        }
      }

      return `${categoryName}${
        subcategoryNames.length > 0 ? ` / ${subcategoryNames.join(", ")}` : ""
      }`;
    },
    [t, i18n.language]
  );

  useEffect(() => {
    const fetchCategoryInfos = async () => {
      if (data?.pages) {
        const newCategoryInfos: { [key: number]: string } = {};
        for (const page of data.pages) {
          for (const content of page.data) {
            if (!categoryInfos[content.id]) {
              newCategoryInfos[content.id] = await getCategoryInfo(content);
            }
          }
        }
        setCategoryInfos((prev) => ({ ...prev, ...newCategoryInfos }));
      }
    };

    fetchCategoryInfos();
  }, [data, getCategoryInfo]);

  const formatDateRange = useCallback(
    (start: string, end: string) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
      };

      if (startDate.getMonth() === endDate.getMonth()) {
        return `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString(
          i18n.language,
          { month: "long" }
        )}`;
      } else {
        return `${startDate.toLocaleDateString(
          i18n.language,
          options
        )} - ${endDate.toLocaleDateString(i18n.language, options)}`;
      }
    },
    [i18n.language]
  );

  const getContentInfo = useCallback(
    (content: AllContent) => {
      const contentTypes = [];
      if (content.video) contentTypes.push(t("video"));
      if (content.photo) contentTypes.push(t("photo"));
      if (content.audio) contentTypes.push(t("audio"));
      return contentTypes.join(", ");
    },
    [t]
  );

  const allContentList = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const memoizedAllContentItems = useMemo(() => {
    return allContentList.map((content) => (
      <AllContentItem
        key={content.id}
        title={getTranslation(content.translations, "title")}
        description={getTranslation(content.translations, "description")}
        categoryInfo={categoryInfos[content.id] || t("loading")}
        dateRange={formatDateRange(content.start_date, content.end_date)}
        contentInfo={getContentInfo(content)}
        isCurrent={content.is_current}
        photoUrl={
          content.photo
            ? `http://0.0.0.0:8055/assets/${content.photo.id}`
            : undefined
        }
        onProgramClick={() => handleProgramClick(content)}
        saveButton={<SaveContentButton content={content} />}
      />
    ));
  }, [
    allContentList,
    getTranslation,
    categoryInfos,
    t,
    formatDateRange,
    getContentInfo,
    handleProgramClick,
  ]);

  if (isLoading) return <div className="loading">{t("loading")}</div>;
  if (isError)
    return <div className="error">Error: {(error as Error).message}</div>;

  return (
    <>
      <YearsList />
      <ul className={styles.allContentList}>
        {memoizedAllContentItems}
        {(hasNextPage || isFetchingNextPage) && (
          <div ref={infiniteScrollRef} className="loader">
            {isFetchingNextPage ? t("loading") : t("loadMore")}
          </div>
        )}
      </ul>
    </>
  );
};

export default React.memo(AllContentList);
