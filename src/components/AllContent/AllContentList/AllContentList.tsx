// import React, { useRef, useEffect } from "react";
// import { useCourses } from "../../hooks/useCourses";
// import { useFilters } from "../../hooks/useFilters";
// import CourseItem from "./CourseItem";
// import { useTranslation } from "react-i18next";

// const CourseList: React.FC = () => {
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//     error,
//   } = useCourses({
//     selectedCategory,
//     selectedSubcategories,
//     filters,
//     selectedYear,
//   });

//   const loaderRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   const courses = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <>
//       <ul className="course-list">
//         {courses
//           .filter((course) => !selectedYear || course.year === selectedYear)
//           .map((course) => (
//             <CourseItem key={course.id} course={course} />
//           ))}
//       </ul>
//       {hasNextPage && (
//         <div ref={loaderRef} className="loading">
//           {t("loading")}
//         </div>
//       )}
//       {!hasNextPage && courses.length > 0 && (
//         <div className="no-more-courses">{t("noMoreCourses")}</div>
//       )}
//       {courses.length === 0 && (
//         <div className="no-courses">{t("noCourses")}</div>
//       )}
//     </>
//   );
// };

// export default CourseList;

// import React, { useEffect, useRef } from "react";
// import { useFilters } from "../../hooks/useFilters";
// import { useCourses } from "../../hooks/useCourses";
// import CourseItem from "./CourseItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { Course } from "../../types";
// const CourseList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//     error,
//   } = useCourses({
//     selectedCategory,
//     selectedSubcategories,
//     filters,
//     selectedYear,
//   });

//   const loaderRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   const courses = data?.pages.flatMap((page) => page.data) ?? [];

//   const [savedCourses, setSavedCourses] = useLocalStorage<Course[]>(
//     "savedCourses",
//     []
//   );

//   const handleSaveCourse = () => {
//     setSavedCourses((prev) => {
//       if (prev.some((savedCourse) => savedCourse.id === course.id)) {
//         return prev;
//       }
//       return [...prev, course];
//     });
//   };

//   const handleProgramClick = (slug: string) => {
//     navigate(`/course/${slug}`);
//   };

//   return (
//     <div className="course-list">
//       {courses.map((course) => (
//         <CourseItem
//           key={course.id}
//           course={course}
//           onSave={handleSaveCourse}
//           onProgramClick={handleProgramClick}
//         />
//       ))}
//       {hasNextPage && (
//         <div ref={loaderRef} className="loader">
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseList;

// import React, { useEffect, useRef } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// // import AllContentItem from "./AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
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

//   const loaderRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = (content: AllContent) => {
//     setSavedContent((prev) => {
//       if (prev.some((savedContent) => savedContent.id === content.id)) {
//         return prev;
//       }
//       return [...prev, content];
//     });
//   };

//   const handleProgramClick = (slug: string) => {
//     navigate(`/content/${slug}`);
//   };

//   return (
//     <div className="all-content-list">
//       {allContentList.map((content) => (
//         <AllContentItem
//           key={content.id}
//           allContent={content}
//           onSave={handleSaveContent}
//           onProgramClick={handleProgramClick}
//         />
//       ))}
//       {hasNextPage && (
//         <div ref={loaderRef} className="loader">
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;
////////////////GOOD ONE ////////
// import React, { useEffect, useRef } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// // import AllContentItem from "./AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// import AllContentItem from "../AllContentItem/AllContentItem";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
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

//   const loaderRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = (content: AllContent) => {
//     setSavedContent((prev) => {
//       if (prev.some((savedContent) => savedContent.id === content.id)) {
//         return prev;
//       }
//       return [...prev, content];
//     });
//   };

//   const handleProgramClick = (slug: string) => {
//     navigate(`/content/${slug}`);
//   };

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className="all-content-list">
//       {allContentList.map((content) => (
//         <AllContentItem
//           key={content.id}
//           allContent={content}
//           onSave={handleSaveContent}
//           onProgramClick={handleProgramClick}
//         />
//       ))}
//       {hasNextPage && (
//         <div ref={loaderRef} className="loader">
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// // import AllContentItem from "./AllContentItem";
// // import SavedContentDropdown from "./SavedContentDropdown";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// import SavedContentDropdown from "../../Header/SavedAllContent/SavedContentDropdown";
// import AllContentItem from "../AllContentItem/AllContentItem";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );
//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }
//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   const handleSaveContent = (content: AllContent) => {
//     setSavedContent((prev) => {
//       if (prev.some((savedContent) => savedContent.id === content.id)) {
//         return prev;
//       }
//       return [...prev, content];
//     });
//   };

//   const handleDeleteContent = (id: number) => {
//     setSavedContent((prev) => prev.filter((content) => content.id !== id));
//   };

//   const handleProgramClick = (slug: string) => {
//     navigate(`/content/${slug}`);
//   };

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className="all-content-container">
//       <SavedContentDropdown
//         savedContent={savedContent}
//         onProgramClick={handleProgramClick}
//         onDeleteContent={handleDeleteContent}
//       />
//       <div className="all-content-list">
//         {allContentList.map((content) => (
//           <AllContentItem
//             key={content.id}
//             allContent={content}
//             onSave={handleSaveContent}
//             onProgramClick={handleProgramClick}
//           />
//         ))}
//         {hasNextPage && (
//           <div ref={loaderRef} className="loader">
//             {isFetchingNextPage ? t("loading") : t("loadMore")}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllContentList;

import React, { useEffect, useRef } from "react";
import { useFilters } from "../../../hooks/useFilters";
import { useAllContent } from "../../../hooks/useAllContent";
import { useSavedContent } from "../../../hooks/useSavedContent";
import AllContentItem from "../AllContentItem/AllContentItem";
import { useTranslation } from "react-i18next";
import { AllContent } from "../types";

const AllContentList: React.FC = () => {
  const { t } = useTranslation();
  const { filters, selectedCategory, selectedSubcategories, selectedYear } =
    useFilters();
  const { addSavedContent } = useSavedContent();
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

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div className="loading">{t("loading")}</div>;
  if (isError)
    return <div className="error">Error: {(error as Error).message}</div>;

  const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="all-content-list">
      {allContentList.map((content) => (
        <AllContentItem
          key={content.id}
          allContent={content}
          onSave={addSavedContent}
        />
      ))}
      {hasNextPage && (
        <div ref={loaderRef} className="loader">
          {isFetchingNextPage ? t("loading") : t("loadMore")}
        </div>
      )}
    </div>
  );
};

export default AllContentList;

//////////////////////////////////----------------------------------------------------

// import React, { useEffect, useRef } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// // import AllContentItem from "./AllContentItem"; // Розкоментуємо це
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// import AllContentItem from "../AllContentItem/AllContentItem";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
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

//   const loaderRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = (content: AllContent) => {
//     setSavedContent((prev) => {
//       if (prev.some((savedContent) => savedContent.id === content.id)) {
//         return prev;
//       }
//       return [...prev, content];
//     });
//   };

//   const handleProgramClick = (slug: string) => {
//     navigate(`/content/${slug}`);
//   };

//   return (
//     <div className="all-content-list">
//       {allContentList.map((content) => (
//         <AllContentItem
//           key={content.id}
//           allContent={content}
//           onSave={handleSaveContent}
//           onProgramClick={handleProgramClick}
//         />
//       ))}
//       {hasNextPage && (
//         <div ref={loaderRef} className="loader">
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../hooks/useFilters";
// import { useAllContent } from "../../hooks/useAllContent";
// import AllContentItem from "./AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../types";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = useCallback(
//     (content: AllContent) => {
//       setSavedContent((prev) => {
//         if (prev.some((savedContent) => savedContent.id === content.id)) {
//           return prev;
//         }
//         return [...prev, content];
//       });
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       navigate(`/content/${slug}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className="loading">{t("loading")}</div>;
//   if (isError)
//     return <div className="error">Error: {(error as Error).message}</div>;

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className="all-content-list">
//       {allContentList.map((content) => (
//         <AllContentItem
//           key={content.id}
//           allContent={content}
//           onSave={handleSaveContent}
//           onProgramClick={handleProgramClick}
//         />
//       ))}
//       {hasNextPage && (
//         <div ref={loaderRef} className="loader">
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// import AllContentItem from "../AllComponentsItem/AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// // import styles from "./AllContentList.module.css";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();

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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = useCallback(
//     (content: AllContent) => {
//       setSavedContent((prev) => {
//         const isAlreadySaved = prev.some(
//           (savedContent) => savedContent.id === content.id
//         );
//         if (isAlreadySaved) {
//           return prev.filter((savedContent) => savedContent.id !== content.id);
//         }
//         return [...prev, content];
//       });
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       navigate(`/content/${slug}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className={styles.allContentList}>
//       {allContentList.map((content) => (
//         <AllContentItem
//           key={content.id}
//           allContent={content}
//           onSave={handleSaveContent}
//           onProgramClick={handleProgramClick}
//           isSaved={savedContent.some((saved) => saved.id === content.id)}
//         />
//       ))}
//       {hasNextPage && (
//         <div ref={loaderRef} className={styles.loader}>
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// import AllContentItem from "../AllComponentsItem/AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// import styles from "./AllContentList.module.css";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();

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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = useCallback(
//     (content: AllContent) => {
//       setSavedContent((prev) => {
//         const isAlreadySaved = prev.some(
//           (savedContent) => savedContent.id === content.id
//         );
//         if (isAlreadySaved) {
//           return prev.filter((savedContent) => savedContent.id !== content.id);
//         }
//         return [...prev, content];
//       });
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       navigate(`/content/${slug}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className={styles.allContentList}>
//       {allContentList.map((content) => (
//         <AllContentItem
//           key={content.id}
//           allContent={content}
//           onSave={handleSaveContent}
//           onProgramClick={handleProgramClick}
//           isSaved={savedContent.some((saved) => saved.id === content.id)}
//         />
//       ))}
//       {hasNextPage && (
//         <div ref={loaderRef} className={styles.loader}>
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// import AllContentItem from "../AllComponentsItem/AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// import styles from "./AllContentList.module.css";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();

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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = useCallback(
//     (content: AllContent) => {
//       if (!content || typeof content.id === "undefined") {
//         console.error("Invalid content item:", content);
//         return;
//       }
//       setSavedContent((prev) => {
//         const isAlreadySaved = prev.some(
//           (savedContent) => savedContent.id === content.id
//         );
//         if (isAlreadySaved) {
//           return prev.filter((savedContent) => savedContent.id !== content.id);
//         }
//         return [...prev, content];
//       });
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       if (slug) {
//         navigate(`/content/${slug}`);
//       } else {
//         console.error("Invalid slug for navigation");
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className={styles.allContentList}>
//       {allContentList.map((content) => {
//         if (!content || typeof content.id === "undefined") {
//           console.error("Invalid content item:", content);
//           return null;
//         }
//         return (
//           <AllContentItem
//             key={content.id}
//             allContent={content}
//             onSave={handleSaveContent}
//             onProgramClick={handleProgramClick}
//             isSaved={savedContent.some(
//               (saved) => saved && saved.id === content.id
//             )}
//           />
//         );
//       })}
//       {hasNextPage && (
//         <div ref={loaderRef} className={styles.loader}>
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// // import AllContentItem from "../AllContentItem/AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// import styles from "./AllContentList.module.css";
// import AllContentItem from "../AllComponentsItem/AllContentItem";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();

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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = useCallback(
//     (content: AllContent) => {
//       if (!content || typeof content.id === "undefined") {
//         console.error("Invalid content item:", content);
//         return;
//       }
//       setSavedContent((prev) => {
//         const isAlreadySaved = prev.some(
//           (savedItem) => savedItem.id === content.id
//         );
//         if (isAlreadySaved) {
//           return prev.filter((savedItem) => savedItem.id !== content.id);
//         }
//         return [...prev, content];
//       });
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       if (slug) {
//         navigate(`/content/${slug}`);
//       } else {
//         console.error("Invalid slug for navigation:", slug);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];
//   console.log(allContentList);

//   return (
//     <div className={styles.allContentList}>
//       {allContentList.map((content) => {
//         if (!content || typeof content.id === "undefined") {
//           console.error("Invalid content item:", content);
//           return null;
//         }
//         const isSaved = savedContent.some(
//           (savedItem) => savedItem.id === content.id
//         );
//         return (
//           <AllContentItem
//             key={content.id}
//             allContent={content}
//             onSave={handleSaveContent}
//             onProgramClick={handleProgramClick}
//             isSaved={isSaved}
//           />
//         );
//       })}
//       {hasNextPage && (
//         <div ref={loaderRef} className={styles.loader}>
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// // import AllContentItem from "./AllContentItem";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import { AllContent } from "../../../types";
// import styles from "./AllContentList.module.css";
// import AllContentItem from "../AllComponentsItem/AllContentItem";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();

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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   console.log("Saved content:", savedContent);

//   const handleSaveContent = useCallback(
//     (content: AllContent) => {
//       if (!content || typeof content.id === "undefined") {
//         console.error("Invalid content item:", content);
//         return;
//       }
//       setSavedContent((prev) => {
//         const validPrev = prev.filter((item) => item && item.id);
//         const isAlreadySaved = validPrev.some(
//           (savedItem) => savedItem.id === content.id
//         );
//         if (isAlreadySaved) {
//           return validPrev.filter((savedItem) => savedItem.id !== content.id);
//         }
//         return [...validPrev, content];
//       });
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       if (slug) {
//         navigate(`/content/${slug}`);
//       } else {
//         console.error("Invalid slug for navigation:", slug);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   console.log("All content list:", allContentList);

//   return (
//     <div className={styles.allContentList}>
//       {allContentList.map((content) => {
//         if (!content || typeof content.id === "undefined") {
//           console.error("Invalid content item:", content);
//           return null;
//         }
//         const isSaved = savedContent.some(
//           (savedItem) => savedItem && savedItem.id === content.id
//         );
//         console.log(`Content ${content.id} is saved:`, isSaved);
//         return (
//           <AllContentItem
//             key={content.id}
//             allContent={content}
//             onSave={handleSaveContent}
//             onProgramClick={handleProgramClick}
//             isSaved={isSaved}
//           />
//         );
//       })}
//       {hasNextPage && (
//         <div ref={loaderRef} className={styles.loader}>
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback, useState } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import styles from "./AllContentList.module.css";
// import AllContentItem from "../AllComponentsItem/AllContentItem";
// import SavedAllContent, {
//   useSavedContent,
// } from "../../Header/SavedAllContent/SavedAllContent";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();
//   const { savedContent, setSavedContent } = useSavedContent();
//   const [localSavedContent, setLocalSavedContent] = useState(savedContent);

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

//   const loaderRef = useRef<HTMLDivElement>(null);

//   const handleSaveContent = useCallback((content: AllContent) => {
//     setLocalSavedContent((prev) => {
//       const isAlreadySaved = prev.some(
//         (savedItem) => savedItem.id === content.id
//       );
//       if (isAlreadySaved) {
//         return prev.filter((savedItem) => savedItem.id !== content.id);
//       } else {
//         return [...prev, content];
//       }
//     });
//   }, []);

//   const handleSaveChange = useCallback(
//     (newSavedContent: AllContent[]) => {
//       setLocalSavedContent(newSavedContent);
//       setSavedContent(newSavedContent);
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       if (slug) {
//         navigate(`/content/${slug}`);
//       } else {
//         console.error("Invalid slug for navigation:", slug);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <>
//       <SavedAllContent onSaveChange={handleSaveChange} />
//       <div className={styles.allContentList}>
//         {allContentList.map((content) => {
//           if (!content || typeof content.id === "undefined") {
//             console.error("Invalid content item:", content);
//             return null;
//           }
//           const isSaved = localSavedContent.some(
//             (savedItem) => savedItem.id === content.id
//           );
//           return (
//             <AllContentItem
//               key={content.id}
//               allContent={content}
//               onSave={handleSaveContent}
//               onProgramClick={handleProgramClick}
//               isSaved={isSaved}
//             />
//           );
//         })}
//         {hasNextPage && (
//           <div ref={loaderRef} className={styles.loader}>
//             {isFetchingNextPage ? t("loading") : t("loadMore")}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AllContentList;
// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import styles from "./AllContentList.module.css";
// import AllContentItem from "../AllContentItem/AllContentItem";
// import AllContentItem from "../AllComponentsItem/AllContentItem";
// import AllContentItem from "../AllComponentsItem/AllContentItem";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();

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

//   const loaderRef = useRef<HTMLDivElement>(null);

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       if (slug) {
//         navigate(`/content/${slug}`);
//       } else {
//         console.error("Invalid slug for navigation:", slug);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className={styles.allContentList}>
//       {allContentList.map((content) => {
//         if (!content || typeof content.id === "undefined") {
//           console.error("Invalid content item:", content);
//           return null;
//         }
//         return (
//           <AllContentItem
//             key={content.id}
//             allContent={content}
//             onProgramClick={handleProgramClick}
//           />
//         );
//       })}
//       {hasNextPage && (
//         <div ref={loaderRef} className={styles.loader}>
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;

// import React, { useEffect, useRef, useCallback } from "react";
// import { useFilters } from "../../../hooks/useFilters";
// import { useAllContent } from "../../../hooks/useAllContent";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useLocalStorage } from "usehooks-ts";
// import styles from "./AllContentList.module.css";
// import AllContentItem from "../AllComponentsItem/AllContentItem";

// const AllContentList: React.FC = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { filters, selectedCategory, selectedSubcategories, selectedYear } =
//     useFilters();

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

//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [savedContent, setSavedContent] = useLocalStorage<AllContent[]>(
//     "savedContent",
//     []
//   );

//   const handleSaveContent = useCallback(
//     (content: AllContent) => {
//       if (!content || typeof content.id === "undefined") {
//         console.error("Invalid content item:", content);
//         return;
//       }
//       setSavedContent((prev) => {
//         const validPrev = prev.filter((item) => item && item.id);
//         const isAlreadySaved = validPrev.some(
//           (savedItem) => savedItem.id === content.id
//         );
//         if (isAlreadySaved) {
//           return validPrev.filter((savedItem) => savedItem.id !== content.id);
//         }
//         return [...validPrev, content];
//       });
//     },
//     [setSavedContent]
//   );

//   const handleProgramClick = useCallback(
//     (slug: string) => {
//       if (slug) {
//         navigate(`/content/${slug}`);
//       } else {
//         console.error("Invalid slug for navigation:", slug);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   if (isLoading) return <div className={styles.loading}>{t("loading")}</div>;
//   if (isError)
//     return (
//       <div className={styles.error}>Error: {(error as Error).message}</div>
//     );

//   const allContentList = data?.pages.flatMap((page) => page.data) ?? [];

//   return (
//     <div className={styles.allContentList}>
//       {allContentList.map((content) => {
//         if (!content || typeof content.id === "undefined") {
//           console.error("Invalid content item:", content);
//           return null;
//         }
//         const isSaved = savedContent.some(
//           (savedItem) => savedItem && savedItem.id === content.id
//         );
//         return (
//           <AllContentItem
//             key={content.id}
//             allContent={content}
//             onSave={handleSaveContent}
//             onProgramClick={handleProgramClick}
//             isSaved={isSaved}
//           />
//         );
//       })}
//       {hasNextPage && (
//         <div ref={loaderRef} className={styles.loader}>
//           {isFetchingNextPage ? t("loading") : t("loadMore")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllContentList;
