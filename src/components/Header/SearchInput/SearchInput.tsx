// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { debounce } from "lodash";
// import { searchCourses, getCategoryName } from "../../../utils/api";
// import { Course } from "../../../types";
// import { useTranslation } from "react-i18next";
// import { useTranslatedContent } from "../../../hooks/useTranslatedContent";
// import styles from "./SearchInput.module.css";

// interface GroupedSearchResults {
//   [key: string]: Course[];
// }

// const SearchInput: React.FC = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { getTranslation } = useTranslatedContent();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Course[]>([]);
//   const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>(
//     {}
//   );

//   const debouncedSearch = useCallback(
//     debounce(async (value: string) => {
//       if (value.length > 2) {
//         const results = await searchCourses(value);
//         setSearchResults(results);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     const fetchCategoryNames = async () => {
//       const categoryIds = new Set<string>();
//       searchResults.forEach((course) => {
//         if (course.categories) {
//           if (
//             typeof course.categories === "string" &&
//             !categoryNames[course.categories]
//           ) {
//             categoryIds.add(course.categories);
//           } else if (
//             typeof course.categories === "object" &&
//             course.categories.id &&
//             !categoryNames[course.categories.id]
//           ) {
//             categoryIds.add(course.categories.id);
//           }
//         }
//       });

//       const newNames: { [key: string]: string } = {};
//       for (const id of categoryIds) {
//         newNames[id] = await getCategoryName(id);
//       }
//       if (Object.keys(newNames).length > 0) {
//         setCategoryNames((prev) => ({ ...prev, ...newNames }));
//       }
//     };

//     fetchCategoryNames();
//   }, [searchResults, categoryNames]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value);
//   };

//   const handleSearchResultClick = (course: Course) => {
//     setSearchQuery("");
//     setSearchResults([]);
//     navigate(`/course/${course.id}`);
//   };

//   const groupedResults = useMemo(() => {
//     const grouped: GroupedSearchResults = {};
//     searchResults.forEach((course) => {
//       let categoryId: string | undefined;
//       if (course.categories) {
//         if (typeof course.categories === "string") {
//           categoryId = course.categories;
//         } else if (
//           typeof course.categories === "object" &&
//           course.categories.id
//         ) {
//           categoryId = course.categories.id;
//         }
//       }

//       const category =
//         (categoryId && categoryNames[categoryId]) || t("uncategorized");
//       if (!grouped[category]) {
//         grouped[category] = [];
//       }
//       grouped[category].push(course);
//     });
//     return grouped;
//   }, [searchResults, categoryNames, t]);

//   return (
//     <div className={styles.searchInput}>
//       <input
//         type="text"
//         placeholder={t("searchCourses")}
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className={styles.input}
//       />
//       {Object.keys(groupedResults).length > 0 && (
//         <div className={styles.searchResults}>
//           {Object.entries(groupedResults).map(([category, courses]) => (
//             <div key={category} className={styles.categoryGroup}>
//               <h3 className={styles.categoryTitle}>{category}</h3>
//               <ul className={styles.courseList}>
//                 {courses.map((course) => (
//                   <li
//                     key={course.id}
//                     onClick={() => handleSearchResultClick(course)}
//                     className={styles.courseItem}
//                   >
//                     <span className={styles.courseTitle}>
//                       {getTranslation(course, "title")}
//                     </span>
//                     <span className={styles.courseInfo}>
//                       {course.video && (
//                         <span className={styles.videoIcon}>🎥</span>
//                       )}
//                       {course.is_current ? (
//                         <span className={styles.actualLabel}>
//                           {t("actual")}
//                         </span>
//                       ) : (
//                         <span className={styles.archiveLabel}>
//                           {t("archive")}
//                         </span>
//                       )}
//                       {course.date && (
//                         <span className={styles.courseDate}>{course.date}</span>
//                       )}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInput;

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { debounce } from "lodash";
// import { searchCourses, getCategoryName } from "../../../utils/api";
// import { Course } from "../../../types";
// import { useTranslation } from "react-i18next";
// import { useTranslatedContent } from "../../../hooks/useTranslatedContent";
// import styles from "./SearchInput.module.css";

// interface GroupedSearchResults {
//   [key: string]: Course[];
// }

// const SearchInput: React.FC = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { getTranslation } = useTranslatedContent();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Course[]>([]);
//   const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>(
//     {}
//   );

//   const debouncedSearch = useCallback(
//     debounce(async (value: string) => {
//       if (value.length > 2) {
//         const results = await searchCourses(value);

//         setSearchResults(results);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     const fetchCategoryNames = async () => {
//       const categoryIds = new Set<string>();
//       searchResults.forEach((course) => {
//         if (course.categories) {
//           if (typeof course.categories === "string") {
//             categoryIds.add(course.categories);
//           } else if (
//             typeof course.categories === "object" &&
//             course.categories.id
//           ) {
//             categoryIds.add(course.categories.id);
//           }
//         }
//       });

//       const newNames: { [key: string]: string } = {};
//       for (const id of categoryIds) {
//         if (!categoryNames[id]) {
//           const name = await getCategoryName(id);
//           newNames[id] = name;
//         }
//       }
//       if (Object.keys(newNames).length > 0) {
//         setCategoryNames((prev) => {
//           const updated = { ...prev, ...newNames };

//           return updated;
//         });
//       }
//     };

//     fetchCategoryNames();
//   }, [searchResults]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value);
//   };

//   const handleSearchResultClick = (course: Course) => {
//     setSearchQuery("");
//     setSearchResults([]);
//     navigate(`/course/${course.id}`);
//   };

//   const groupedResults = useMemo(() => {
//     const grouped: GroupedSearchResults = {};
//     searchResults.forEach((course) => {
//       let categoryId: string | undefined;
//       if (course.categories) {
//         if (typeof course.categories === "string") {
//           categoryId = course.categories;
//         } else if (
//           typeof course.categories === "object" &&
//           course.categories.id
//         ) {
//           categoryId = course.categories.id;
//         }
//       }

//       const category =
//         categoryId && categoryNames[categoryId]
//           ? categoryNames[categoryId]
//           : t("uncategorized");

//       if (!grouped[category]) {
//         grouped[category] = [];
//       }
//       grouped[category].push(course);
//     });

//     return grouped;
//   }, [searchResults, categoryNames, t]);

//   return (
//     <div className={styles.searchInput}>
//       <input
//         type="text"
//         placeholder={t("searchCourses")}
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className={styles.input}
//       />
//       {Object.keys(groupedResults).length > 0 && (
//         <div className={styles.searchResults}>
//           {Object.entries(groupedResults).map(([category, courses]) => (
//             <div key={category} className={styles.categoryGroup}>
//               <h3 className={styles.categoryTitle}>{category}</h3>
//               <ul className={styles.courseList}>
//                 {courses.map((course) => (
//                   <li
//                     key={course.id}
//                     onClick={() => handleSearchResultClick(course)}
//                     className={styles.courseItem}
//                   >
//                     <span className={styles.courseTitle}>
//                       {getTranslation(course, "title")}
//                     </span>
//                     <span className={styles.courseInfo}>
//                       {course.video && (
//                         <span className={styles.videoIcon}>🎥</span>
//                       )}
//                       {course.is_current ? (
//                         <span className={styles.actualLabel}>
//                           {t("actual")}
//                         </span>
//                       ) : (
//                         <span className={styles.archiveLabel}>
//                           {t("archive")}
//                         </span>
//                       )}
//                       {course.date && (
//                         <span className={styles.courseDate}>{course.date}</span>
//                       )}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInput;

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { debounce } from "lodash";
// import { searchAllContent, getCategoryName } from "../../../utils/api";
// import { AllContent } from "../../../types";
// import { useTranslation } from "react-i18next";
// import { useTranslatedContent } from "../../../hooks/useTranslatedContent";
// import styles from "./SearchInput.module.css";

// interface GroupedSearchResults {
//   [key: string]: AllContent[];
// }

// const SearchInput: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const { getTranslation } = useTranslatedContent();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<AllContent[]>([]);
//   const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>(
//     {}
//   );

//   const debouncedSearch = useCallback(
//     debounce(async (value: string) => {
//       if (value.length > 2) {
//         const results = await searchAllContent(value);
//         setSearchResults(results);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     const fetchCategoryNames = async () => {
//       const categoryIds = new Set<string>();
//       searchResults.forEach((content) => {
//         if (content.category && content.category.id) {
//           categoryIds.add(content.category.id);
//         }
//       });

//       const newNames: { [key: string]: string } = {};
//       for (const id of categoryIds) {
//         if (!categoryNames[id]) {
//           const name = await getCategoryName(id);
//           newNames[id] = name;
//         }
//       }
//       if (Object.keys(newNames).length > 0) {
//         setCategoryNames((prev) => ({ ...prev, ...newNames }));
//       }
//     };

//     fetchCategoryNames();
//   }, [searchResults, categoryNames]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value);
//   };

//   const handleSearchResultClick = (content: AllContent) => {
//     setSearchQuery("");
//     setSearchResults([]);
//     navigate(`/content/${content.slug}`);
//   };

//   const groupedResults = useMemo(() => {
//     const grouped: GroupedSearchResults = {};
//     searchResults.forEach((content) => {
//       const categoryId = content.category?.id;
//       const category =
//         categoryId && categoryNames[categoryId]
//           ? categoryNames[categoryId]
//           : t("uncategorized");

//       if (!grouped[category]) {
//         grouped[category] = [];
//       }
//       grouped[category].push(content);
//     });

//     return grouped;
//   }, [searchResults, categoryNames, t]);

//   return (
//     <div className={styles.searchInput}>
//       <input
//         type="text"
//         placeholder={t("searchContent")}
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className={styles.input}
//       />
//       {Object.keys(groupedResults).length > 0 && (
//         <div className={styles.searchResults}>
//           {Object.entries(groupedResults).map(([category, contents]) => (
//             <div key={category} className={styles.categoryGroup}>
//               <h3 className={styles.categoryTitle}>{category}</h3>
//               <ul className={styles.contentList}>
//                 {contents.map((content) => (
//                   <li
//                     key={content.id}
//                     onClick={() => handleSearchResultClick(content)}
//                     className={styles.contentItem}
//                   >
//                     <span className={styles.contentTitle}>
//                       {getTranslation(content.translations, "title")}
//                     </span>
//                     <span className={styles.contentInfo}>
//                       {content.video && (
//                         <span className={styles.videoIcon}>🎥</span>
//                       )}
//                       {content.is_current ? (
//                         <span className={styles.actualLabel}>
//                           {t("actual")}
//                         </span>
//                       ) : (
//                         <span className={styles.archiveLabel}>
//                           {t("archive")}
//                         </span>
//                       )}
//                       {content.start_date && (
//                         <span className={styles.contentDate}>
//                           {new Date(content.start_date).toLocaleDateString()}
//                         </span>
//                       )}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInput;

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { debounce } from "lodash";
// import { searchAllContent, getCategoryName } from "../../../utils/api";
// import { AllContent } from "../../../types";
// import { useTranslation } from "react-i18next";
// import styles from "./SearchInput.module.css";

// interface GroupedSearchResults {
//   [key: string]: AllContent[];
// }

// const SearchInput: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<AllContent[]>([]);
//   const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>(
//     {}
//   );

//   const debouncedSearch = useCallback(
//     debounce(async (value: string) => {
//       if (value.length > 2) {
//         const results = await searchAllContent(value);
//         setSearchResults(results);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     const fetchCategoryNames = async () => {
//       const categoryIds = new Set<string>();
//       searchResults.forEach((content) => {
//         if (content.category && content.category.id) {
//           categoryIds.add(content.category.id);
//         }
//       });

//       const newNames: { [key: string]: string } = {};
//       for (const id of categoryIds) {
//         if (!categoryNames[id]) {
//           const name = await getCategoryName(id, i18n.language);
//           newNames[id] = name;
//         }
//       }
//       if (Object.keys(newNames).length > 0) {
//         setCategoryNames((prev) => ({ ...prev, ...newNames }));
//       }
//     };

//     fetchCategoryNames();
//   }, [searchResults, categoryNames, i18n.language]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value);
//   };

//   const handleSearchResultClick = (content: AllContent) => {
//     setSearchQuery("");
//     setSearchResults([]);
//     navigate(`/content/${content.slug}`);
//   };

//   const getTranslation = (
//     translations: {
//       languages_code: string;
//       title: string;
//       description: string;
//     }[],
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "Translation not available";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation[field] || "Translation not available";
//   };

//   const groupedResults = useMemo(() => {
//     const grouped: GroupedSearchResults = {};
//     searchResults.forEach((content) => {
//       const categoryId = content.category?.id;
//       const category =
//         categoryId && categoryNames[categoryId]
//           ? categoryNames[categoryId]
//           : t("uncategorized");

//       if (!grouped[category]) {
//         grouped[category] = [];
//       }
//       grouped[category].push(content);
//     });

//     return grouped;
//   }, [searchResults, categoryNames, t]);

//   return (
//     <div className={styles.searchInput}>
//       <input
//         type="text"
//         placeholder={t("searchContent")}
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className={styles.input}
//       />
//       {Object.keys(groupedResults).length > 0 && (
//         <div className={styles.searchResults}>
//           {Object.entries(groupedResults).map(([category, contents]) => (
//             <div key={category} className={styles.categoryGroup}>
//               <h3 className={styles.categoryTitle}>{category}</h3>
//               <ul className={styles.contentList}>
//                 {contents.map((content) => (
//                   <li
//                     key={content.id}
//                     onClick={() => handleSearchResultClick(content)}
//                     className={styles.contentItem}
//                   >
//                     <span className={styles.contentTitle}>
//                       {getTranslation(content.translations, "title")}
//                     </span>
//                     <span className={styles.contentInfo}>
//                       {content.video && (
//                         <span className={styles.videoIcon}>🎥</span>
//                       )}
//                       <span
//                         className={
//                           content.is_current
//                             ? styles.actualLabel
//                             : styles.archiveLabel
//                         }
//                       >
//                         {content.is_current ? t("actual") : t("archive")}
//                       </span>
//                       {content.start_date && (
//                         <span className={styles.contentDate}>
//                           {new Date(content.start_date).toLocaleDateString()}
//                         </span>
//                       )}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInput;

// import React, { useState, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { debounce } from "lodash";
// import { searchAllContent } from "../../../utils/api";
// import { AllContent } from "../../../types";
// import { useTranslation } from "react-i18next";
// import styles from "./SearchInput.module.css";

// interface GroupedSearchResults {
//   [key: string]: AllContent[];
// }

// const SearchInput: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<AllContent[]>([]);

//   const debouncedSearch = useCallback(
//     debounce(async (value: string) => {
//       if (value.length > 2) {
//         const results = await searchAllContent(value);
//         setSearchResults(results);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300),
//     []
//   );

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value);
//   };

//   const handleSearchResultClick = (content: AllContent) => {
//     setSearchQuery("");
//     setSearchResults([]);
//     navigate(`/content/${content.slug}`);
//   };

//   const getTranslation = (
//     translations: {
//       languages_code: string;
//       title?: string;
//       description?: string;
//     }[],
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "Translation not available";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation[field] || "Translation not available";
//   };

//   const groupedResults = useMemo(() => {
//     const grouped: GroupedSearchResults = {};
//     searchResults.forEach((content) => {
//       const categoryName = content.category
//         ? getTranslation(content.category.translations, "title")
//         : t("uncategorized");
//       if (!grouped[categoryName]) {
//         grouped[categoryName] = [];
//       }
//       grouped[categoryName].push(content);
//     });

//     // Sort categories alphabetically
//     return Object.fromEntries(
//       Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
//     );
//   }, [searchResults, i18n.language]);

//   return (
//     <div className={styles.searchInput}>
//       <input
//         type="text"
//         placeholder={t("searchContent")}
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className={styles.input}
//       />
//       {Object.keys(groupedResults).length > 0 && (
//         <div className={styles.searchResults}>
//           {Object.entries(groupedResults).map(([category, contents]) => (
//             <div key={category} className={styles.categoryGroup}>
//               <h3 className={styles.categoryTitle}>{category}</h3>
//               <ul className={styles.contentList}>
//                 {contents.map((content) => (
//                   <li
//                     key={content.id}
//                     onClick={() => handleSearchResultClick(content)}
//                     className={styles.contentItem}
//                   >
//                     <span className={styles.contentTitle}>
//                       {getTranslation(content.translations, "title")}
//                     </span>
//                     <span className={styles.contentInfo}>
//                       {content.video && (
//                         <span className={styles.videoIcon}>🎥</span>
//                       )}
//                       <span
//                         className={
//                           content.is_current
//                             ? styles.actualLabel
//                             : styles.archiveLabel
//                         }
//                       >
//                         {content.is_current ? t("actual") : t("archive")}
//                       </span>
//                       {content.start_date && (
//                         <span className={styles.contentDate}>
//                           {new Date(content.start_date).toLocaleDateString()}
//                         </span>
//                       )}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInput;

import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { searchAllContent } from "../../../utils/api";
import { AllContent } from "../../../types";
import { useTranslation } from "react-i18next";
import styles from "./SearchInput.module.css";

interface GroupedSearchResults {
  [key: string]: AllContent[];
}

const SearchInput: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AllContent[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.length > 2) {
        const results = await searchAllContent(value);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSearchResultClick = (content: AllContent) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/content/${content.slug}`);
  };

  const getTranslation = (
    translations: {
      languages_code: string;
      title?: string;
      description?: string;
    }[],
    field: "title" | "description"
  ): string => {
    if (!translations || translations.length === 0) {
      return "Translation not available";
    }
    const translation =
      translations.find((t) => t.languages_code === i18n.language) ||
      translations[0];
    return translation[field] || "Translation not available";
  };

  const groupedResults = useMemo(() => {
    const grouped: GroupedSearchResults = {};
    searchResults.forEach((content) => {
      const categoryName = content.category
        ? getTranslation(content.category.translations, "title")
        : t("uncategorized");
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(content);
    });

    // Sort categories alphabetically
    return Object.fromEntries(
      Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
    );
  }, [searchResults, i18n.language]);

  return (
    <div className={styles.searchInputContainer}>
      <input
        type="text"
        placeholder={t("searchContent")}
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {Object.keys(groupedResults).length > 0 && (
        <div className={styles.dropdownResults}>
          {Object.entries(groupedResults).map(([category, contents]) => (
            <div key={category} className={styles.categoryGroup}>
              <h3 className={styles.categoryName}>{category}</h3>
              {contents.map((content) => (
                <div
                  key={content.id}
                  onClick={() => handleSearchResultClick(content)}
                  className={styles.contentItem}
                >
                  <span className={styles.contentTitle}>
                    {getTranslation(content.translations, "title")}
                  </span>
                  <span className={styles.contentMeta}>
                    {content.video && (
                      <span className={styles.videoIcon}>🎥</span>
                    )}
                    <span
                      className={
                        content.is_current
                          ? styles.actualLabel
                          : styles.archiveLabel
                      }
                    >
                      {content.is_current ? t("actual") : t("archive")}
                    </span>
                    {content.start_date && (
                      <span className={styles.contentDate}>
                        {new Date(content.start_date).toLocaleDateString()}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
