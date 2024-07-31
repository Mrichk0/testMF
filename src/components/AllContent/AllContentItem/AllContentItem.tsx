// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Course } from "../../types";
// import { useTranslation } from "react-i18next";
// import { useTranslatedContent } from "../../hooks/useTranslatedContent";
// import { useLocalStorage } from "usehooks-ts";

// interface CourseItemProps {
//   course: Course;
// }

// const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { getTranslation } = useTranslatedContent();
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

//   const handleCourseClick = () => {
//     navigate(`/course/${course.id}`);
//   };

//   return (
//     <li className="course-item">
//       <h3 className="course-title">{getTranslation(course, "title")}</h3>
//       <p className="course-text">{getTranslation(course, "text")}</p>
//       <p className="course-year">
//         {t("year")}: {course.year}
//       </p>
//       {course.photo && (
//         <img
//           src={`${"http://0.0.0."}/assets/${course.photo.id}`}
//           alt={getTranslation(course, "title")}
//           className="course-image"
//           width="300"
//         />
//       )}
//       <button onClick={handleSaveCourse} className="save-button">
//         {t("saveCourse")}
//       </button>
//       <button onClick={handleCourseClick} className="program-button">
//         {t("courseProgram")}
//       </button>
//     </li>
//   );
// };

// export default CourseItem;
// import React from "react";
// import { CourseItemProps } from "../../types";
// import { useTranslation } from "react-i18next";

// const CourseItem: React.FC<CourseItemProps> = ({
//   course,
//   onSave,
//   onProgramClick,
// }) => {
//   const { t } = useTranslation();

//   const formatDateRange = (start: string, end: string) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
//   };

//   const getContentInfo = () => {
//     const content = [];
//     if (course.hasVideo) content.push(t("video"));
//     if (course.hasPhoto) content.push(t("photo"));
//     if (course.hasAudio) content.push(t("audio"));
//     return content.join(", ");
//   };

//   return (
//     <div className="course-item">
//       <h2 className="course-title">{course.title}</h2>
//       <p className="course-description">{course.description}</p>
//       <div className="course-details">
//         <p className="course-category">
//           {course.category}
//           {course.subcategory && ` / ${course.subcategory}`}
//         </p>
//         <p className="course-date">
//           {formatDateRange(course.startDate, course.endDate)}
//         </p>
//         <p className="course-content">
//           {t("contains")}: {getContentInfo()}
//         </p>
//         <p className="course-status">
//           {course.isActual ? t("actual") : t("archive")}
//         </p>
//       </div>
//       <div className="course-actions">
//         <button
//           onClick={() => onProgramClick(course.slug)}
//           className="program-button"
//         >
//           {t("courseProgram")}
//         </button>
//         <button onClick={() => onSave(course)} className="save-button">
//           {t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CourseItem;
////////////////////////////////

import React from "react";
import { AllContentItemProps } from "../../../types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AllContentItem: React.FC<AllContentItemProps> = ({
  allContent,
  onSave,
  // onProgramClick,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const getTranslation = (
    translations: {
      languages_code: string;
      title?: string;
      description?: string;
    }[],
    field: "title" | "description"
  ) => {
    const translation =
      translations?.find((t) => t.languages_code === i18n.language) ||
      translations?.[0];
    return translation && translation[field] ? translation[field] : "";
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  const getCategoryInfo = () => {
    const categoryName = allContent.category?.translations
      ? getTranslation(allContent.category.translations, "title")
      : "";
    const subcategoryNames = allContent.subcategories?.length
      ? allContent.subcategories
          .map((sub) =>
            sub.translations ? getTranslation(sub.translations, "title") : ""
          )
          .join(", ")
      : "";
    return `${categoryName}${subcategoryNames ? ` / ${subcategoryNames}` : ""}`;
  };

  const getContentInfo = () => {
    const content = [];
    if (allContent.video) content.push(t("video"));
    if (allContent.photo) content.push(t("photo"));
    if (allContent.audio) content.push(t("audio"));
    return content.join(", ");
  };

  console.log("allContent from AllContentItem", allContent);

  const onProgramClick = (slug: string) => {
    navigate(`/course/${slug}`);
  };

  return (
    <div className="course-item">
      <h2 className="course-title">
        {getTranslation(allContent.translations, "title")}
      </h2>
      <p className="course-description">
        {getTranslation(allContent.translations, "description")}
      </p>
      <div className="course-details">
        <p className="course-category">{getCategoryInfo()}</p>
        <p className="course-date">
          {formatDateRange(allContent.start_date, allContent.end_date)}
        </p>
        <p className="course-content">
          {t("contains")}: {getContentInfo()}
        </p>
        <p className="course-status">
          {allContent.is_current ? t("actual") : t("archive")}
        </p>
      </div>
      <div className="course-actions">
        <button
          onClick={() => onProgramClick(allContent.slug)}
          className="program-button"
        >
          {t("courseProgram")}
        </button>
        <button onClick={() => onSave(allContent)} className="save-button">
          {t("save")}
        </button>
      </div>
    </div>
  );
};

export default AllContentItem;
///////////////////////////////////

// export interface AllContentItemProps {
//   allContent: {
//     id: number;
//     translations: {
//       languages_code: string;
//       title?: string;
//       description?: string;
//     }[];
//     start_date: string;
//     end_date: string;
//     is_current: boolean;
//     category?: {
//       translations: {
//         languages_code: string;
//         title?: string;
//       }[];
//     };
//     subcategories?: {
//       translations: {
//         languages_code: string;
//         title?: string;
//       }[];
//     }[];
//     video?: any;
//     photo?: any;
//     audio?: any;
//     slug: string;
//   };
//   onSave: (content: any) => void;
//   onProgramClick?: (slug: string) => void;
// }
// import React from "react";
// // import { AllContentItemProps } from "../../../types";
// import { useTranslation } from "react-i18next";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   allContent,
//   onSave,
//   onProgramClick,
// }) => {
//   const { t, i18n } = useTranslation();

//   const getTranslation = (
//     translations:
//       | {
//           languages_code: string;
//           title?: string;
//           description?: string;
//         }[]
//       | undefined,
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation && translation[field] ? translation[field] : "";
//   };

//   const formatDateRange = (start: string, end: string) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
//   };

//   const getCategoryInfo = () => {
//     const categoryName = allContent.category?.translations
//       ? getTranslation(allContent.category.translations, "title")
//       : "";
//     const subcategoryNames = allContent.subcategories?.length
//       ? allContent.subcategories
//           .map((sub) => getTranslation(sub.translations, "title"))
//           .filter(Boolean)
//           .join(", ")
//       : "";
//     return `${categoryName}${subcategoryNames ? ` / ${subcategoryNames}` : ""}`;
//   };

//   const getContentInfo = () => {
//     const content = [];
//     if (allContent.video) content.push(t("video"));
//     if (allContent.photo) content.push(t("photo"));
//     if (allContent.audio) content.push(t("audio"));
//     return content.join(", ");
//   };

//   return (
//     <div className="course-item">
//       <h2 className="course-title">
//         {getTranslation(allContent.translations, "title")}
//       </h2>
//       <p className="course-description">
//         {getTranslation(allContent.translations, "description")}
//       </p>
//       <div className="course-details">
//         <p className="course-category">{getCategoryInfo()}</p>
//         <p className="course-date">
//           {formatDateRange(allContent.start_date, allContent.end_date)}
//         </p>
//         <p className="course-content">
//           {t("contains")}: {getContentInfo()}
//         </p>
//         <p className="course-status">
//           {allContent.is_current ? t("actual") : t("archive")}
//         </p>
//       </div>
//       <div className="course-actions">
//         {typeof onProgramClick === "function" && (
//           <button
//             onClick={() => onProgramClick(allContent.slug)}
//             className="program-button"
//           >
//             {t("courseProgram")}
//           </button>
//         )}
//         <button onClick={() => onSave(allContent)} className="save-button">
//           {t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;

// import React from "react";
// import { AllContentItemProps } from "../../../types";
// import { useTranslation } from "react-i18next";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   allContent,
//   onSave,
//   onProgramClick,
// }) => {
//   const { t, i18n } = useTranslation();

//   const getTranslation = (
//     translations: {
//       languages_code: string;
//       title?: string;
//       description?: string;
//     }[],
//     field: "title" | "description"
//   ) => {
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation && translation[field] ? translation[field] : "";
//   };

//   const formatDateRange = (start: string, end: string) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
//   };

//   const getCategoryInfo = () => {
//     const categoryName = getTranslation(
//       allContent.category.translations,
//       "title"
//     );
//     const subcategoryNames = allContent.subcategories
//       .map((sub) => getTranslation(sub.translations, "title"))
//       .join(", ");
//     return `${categoryName}${subcategoryNames ? ` / ${subcategoryNames}` : ""}`;
//   };

//   const getContentInfo = () => {
//     const content = [];
//     if (allContent.video) content.push(t("video"));
//     if (allContent.photo) content.push(t("photo"));
//     if (allContent.audio) content.push(t("audio"));
//     return content.join(", ");
//   };

//   return (
//     <div className="course-item">
//       <h2 className="course-title">
//         {getTranslation(allContent.translations, "title")}
//       </h2>
//       <p className="course-description">
//         {getTranslation(allContent.translations, "description")}
//       </p>
//       <div className="course-details">
//         <p className="course-category">{getCategoryInfo()}</p>
//         <p className="course-date">
//           {formatDateRange(allContent.start_date, allContent.end_date)}
//         </p>
//         <p className="course-content">
//           {t("contains")}: {getContentInfo()}
//         </p>
//         <p className="course-status">
//           {allContent.is_current ? t("actual") : t("archive")}
//         </p>
//       </div>
//       <div className="course-actions">
//         <button
//           onClick={() => onProgramClick(allContent.slug)}
//           className="program-button"
//         >
//           {t("courseProgram")}
//         </button>
//         <button onClick={() => onSave(allContent)} className="save-button">
//           {t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;

// import React from "react";
// import { AllContentItemProps } from "../../types";
// import { useTranslation } from "react-i18next";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   allContent,
//   onSave,
//   onProgramClick,
// }) => {
//   const { t, i18n } = useTranslation();

//   const getTranslation = (
//     translations:
//       | { languages_code: string; title?: string; description?: string }[]
//       | undefined,
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation && translation[field] ? translation[field] : "";
//   };

//   const formatDateRange = (start: string, end: string) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
//   };

//   const getCategoryInfo = () => {
//     const categoryName = getTranslation(
//       allContent.category?.translations,
//       "title"
//     );
//     const subcategoryNames = allContent.subcategories
//       ?.map((sub) => getTranslation(sub.translations, "title"))
//       .filter(Boolean)
//       .join(", ");
//     return `${categoryName}${subcategoryNames ? ` / ${subcategoryNames}` : ""}`;
//   };

//   const getContentInfo = () => {
//     const content = [];
//     if (allContent.video) content.push(t("video"));
//     if (allContent.photo) content.push(t("photo"));
//     if (allContent.audio) content.push(t("audio"));
//     return content.join(", ");
//   };

//   if (!allContent) {
//     return <div className="error">{t("contentNotAvailable")}</div>;
//   }

//   return (
//     <div className="course-item">
//       <h2 className="course-title">
//         {getTranslation(allContent.translations, "title")}
//       </h2>
//       <p className="course-description">
//         {getTranslation(allContent.translations, "description")}
//       </p>
//       <div className="course-details">
//         <p className="course-category">{getCategoryInfo()}</p>
//         <p className="course-date">
//           {formatDateRange(allContent.start_date, allContent.end_date)}
//         </p>
//         <p className="course-content">
//           {t("contains")}: {getContentInfo()}
//         </p>
//         <p className="course-status">
//           {allContent.is_current ? t("actual") : t("archive")}
//         </p>
//       </div>
//       <div className="course-actions">
//         <button
//           onClick={() => onProgramClick(allContent.slug)}
//           className="program-button"
//         >
//           {t("courseProgram")}
//         </button>
//         <button onClick={() => onSave(allContent)} className="save-button">
//           {t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;

// import React from "react";
// import { AllContentItemProps } from "../../../types";
// import { useTranslation } from "react-i18next";
// // import styles from "./AllContentItem.module.css";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   allContent,
//   onSave,
//   onProgramClick,
//   isSaved,
// }) => {
//   const { t, i18n } = useTranslation();

//   const getTranslation = (
//     translations:
//       | { languages_code: string; title?: string; description?: string }[]
//       | undefined,
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation && translation[field] ? translation[field] : "";
//   };

//   const formatDateRange = (start: string, end: string) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
//   };

//   const getCategoryInfo = () => {
//     const categoryName = getTranslation(
//       allContent.category?.translations,
//       "title"
//     );
//     const subcategoryNames = allContent.subcategories
//       ?.map((sub) => getTranslation(sub.translations, "title"))
//       .filter(Boolean)
//       .join(", ");
//     return `${categoryName}${subcategoryNames ? ` / ${subcategoryNames}` : ""}`;
//   };

//   const getContentInfo = () => {
//     const content = [];
//     if (allContent.video) content.push(t("video"));
//     if (allContent.photo) content.push(t("photo"));
//     if (allContent.audio) content.push(t("audio"));
//     return content.join(", ");
//   };

//   if (!allContent) {
//     return <div className={styles.error}>{t("contentNotAvailable")}</div>;
//   }

//   return (
//     <div className={styles.courseItem}>
//       <h2 className={styles.courseTitle}>
//         {getTranslation(allContent.translations, "title")}
//       </h2>
//       <p className={styles.courseDescription}>
//         {getTranslation(allContent.translations, "description")}
//       </p>
//       <div className={styles.courseDetails}>
//         <p className={styles.courseCategory}>{getCategoryInfo()}</p>
//         <p className={styles.courseDate}>
//           {formatDateRange(allContent.start_date, allContent.end_date)}
//         </p>
//         <p className={styles.courseContent}>
//           {t("contains")}: {getContentInfo()}
//         </p>
//         <p className={styles.courseStatus}>
//           {allContent.is_current ? t("actual") : t("archive")}
//         </p>
//       </div>
//       <div className={styles.courseActions}>
//         <button
//           onClick={() => onProgramClick(allContent.slug)}
//           className={styles.programButton}
//         >
//           {t("courseProgram")}
//         </button>
//         <button
//           onClick={() => onSave(allContent)}
//           className={styles.saveButton}
//         >
//           {isSaved ? t("unsave") : t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;

// import React from "react";
// // import { AllContentItemProps } from "../../../../types";
// import { useTranslation } from "react-i18next";
// // import SaveButton from "./SaveButton";
// import styles from "./AllContentItem.module.css";
// import SaveButton from "../../Buttons/SaveButton/SaveButton";
// import { AllContentItemProps } from "../../../types";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   allContent,
//   onSave,
//   onProgramClick,
//   isSaved,
// }) => {
//   const { t, i18n } = useTranslation();

//   const getTranslation = (
//     translations:
//       | { languages_code: string; title?: string; description?: string }[]
//       | undefined,
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation && translation[field] ? translation[field] : "";
//   };

//   if (!allContent) {
//     return <div className={styles.error}>{t("contentNotAvailable")}</div>;
//   }

//   return (
//     <div className={styles.courseItem}>
//       <h2 className={styles.courseTitle}>
//         {getTranslation(allContent.translations, "title")}
//       </h2>
//       <div className={styles.courseInfo}>
//         <span className={styles.courseCategory}>
//           {getTranslation(allContent.category?.translations, "title")} /{" "}
//           {t("educationalPrograms")}
//         </span>
//         {allContent.video && <span className={styles.videoIcon}>Відео</span>}
//         <span
//           className={
//             allContent.is_current ? styles.actualLabel : styles.archiveLabel
//           }
//         >
//           {allContent.is_current ? t("actual") : t("archive")}
//         </span>
//         <span className={styles.courseDates}>
//           {new Date(allContent.start_date).toLocaleDateString()} -{" "}
//           {new Date(allContent.end_date).toLocaleDateString()}
//         </span>
//       </div>
//       {allContent.photo && (
//         <img
//           src={`http://0.0.0.0:8055/assets/${allContent.photo}`}
//           alt={getTranslation(allContent.translations, "title")}
//           className={styles.courseImage}
//           width="300"
//         />
//       )}
//       <div className={styles.courseActions}>
//         <button
//           onClick={() => onProgramClick(allContent.slug)}
//           className={styles.programButton}
//         >
//           {t("courseProgram")}
//         </button>
//         <SaveButton isSaved={isSaved} onClick={() => onSave(allContent)} />
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;

// import React from "react";
// import { AllContentItemProps } from "../../../types";
// import { useTranslation } from "react-i18next";
// import styles from "./AllContentItem.module.css";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   allContent,
//   onSave,
//   onProgramClick,
//   isSaved,
// }) => {
//   const { t, i18n } = useTranslation();

//   const getTranslation = (
//     translations:
//       | { languages_code: string; title?: string; description?: string }[]
//       | undefined,
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation && translation[field] ? translation[field] : "";
//   };

//   if (!allContent) {
//     return <div className={styles.error}>{t("contentNotAvailable")}</div>;
//   }

//   return (
//     <div className={styles.courseItem}>
//       <h2 className={styles.courseTitle}>
//         {getTranslation(allContent.translations, "title")}
//       </h2>
//       <div className={styles.courseInfo}>
//         <span className={styles.courseCategory}>
//           {getTranslation(allContent.category?.translations, "title")} /{" "}
//           {t("educationalPrograms")}
//         </span>
//         {allContent.video && <span className={styles.videoIcon}>Відео</span>}
//         <span
//           className={
//             allContent.is_current ? styles.actualLabel : styles.archiveLabel
//           }
//         >
//           {allContent.is_current ? t("actual") : t("archive")}
//         </span>
//         <span className={styles.courseDates}>
//           {new Date(allContent.start_date).toLocaleDateString()} -{" "}
//           {new Date(allContent.end_date).toLocaleDateString()}
//         </span>
//       </div>
//       {allContent.photo && (
//         <img
//           src={`http://0.0.0.0:8055/assets/${allContent.photo}`}
//           alt={getTranslation(allContent.translations, "title")}
//           className={styles.courseImage}
//           width="300"
//         />
//       )}
//       <div className={styles.courseActions}>
//         <button
//           onClick={() => onProgramClick(allContent.slug)}
//           className={styles.programButton}
//         >
//           {t("courseProgram")}
//         </button>
//         <button
//           onClick={() => onSave(allContent)}
//           className={`${styles.saveButton} ${isSaved ? styles.saved : ""}`}
//         >
//           {isSaved ? t("unsave") : t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;

// import React from "react";
// import { AllContentItemProps } from "../../../types";
// import { useTranslation } from "react-i18next";
// import styles from "./AllContentItem.module.css";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   allContent,
//   onSave,
//   onProgramClick,
//   isSaved,
// }) => {
//   const { t, i18n } = useTranslation();

//   const getTranslation = (
//     translations:
//       | { languages_code: string; title?: string; description?: string }[]
//       | undefined,
//     field: "title" | "description"
//   ): string => {
//     if (!translations || translations.length === 0) {
//       return "";
//     }
//     const translation =
//       translations.find((t) => t.languages_code === i18n.language) ||
//       translations[0];
//     return translation && translation[field] ? translation[field] : "";
//   };

//   if (!allContent) {
//     return <div className={styles.error}>{t("contentNotAvailable")}</div>;
//   }

//   return (
//     <div className={styles.courseItem}>
//       <h2 className={styles.courseTitle}>
//         {getTranslation(allContent.translations, "title")}
//       </h2>
//       <div className={styles.courseInfo}>
//         <span className={styles.courseCategory}>
//           {getTranslation(allContent.category?.translations, "title")} /{" "}
//           {t("educationalPrograms")}
//         </span>
//         {allContent.video && <span className={styles.videoIcon}>Відео</span>}
//         <span
//           className={
//             allContent.is_current ? styles.actualLabel : styles.archiveLabel
//           }
//         >
//           {allContent.is_current ? t("actual") : t("archive")}
//         </span>
//         <span className={styles.courseDates}>
//           {new Date(allContent.start_date).toLocaleDateString()} -{" "}
//           {new Date(allContent.end_date).toLocaleDateString()}
//         </span>
//       </div>
//       {allContent.photo && (
//         <img
//           src={`http://0.0.0.0:8055/assets/${allContent.photo}`}
//           alt={getTranslation(allContent.translations, "title")}
//           className={styles.courseImage}
//           width="300"
//         />
//       )}
//       <div className={styles.courseActions}>
//         <button
//           onClick={() => onProgramClick(allContent.slug)}
//           className={styles.programButton}
//         >
//           {t("courseProgram")}
//         </button>
//         <button
//           onClick={() => onSave(allContent)}
//           className={`${styles.saveButton} ${isSaved ? styles.saved : ""}`}
//         >
//           {isSaved ? t("unsave") : t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;

// import React from "react";
// import { AllContentItemProps } from "../../../types";
// import { useTranslation } from "react-i18next";

// const AllContentItem: React.FC<AllContentItemProps> = ({
//   content,
//   onSave,
//   onContentClick,
// }) => {
//   const { t } = useTranslation();

//   const formatDateRange = (start: string, end: string) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
//   };

//   const getContentInfo = () => {
//     const contentTypes = [];
//     if (content.video) contentTypes.push(t("video"));
//     if (content.photo) contentTypes.push(t("photo"));
//     if (content.audio) contentTypes.push(t("audio"));
//     return contentTypes.join(", ");
//   };

//   return (
//     <div className="all-content-item">
//       <h2 className="content-title">{content.translations.title}</h2>
//       <p className="content-description">{content.translations.description}</p>
//       <div className="content-details">
//         <p className="content-category">
//           {content.category.translations.name}
//           {content.subcategories.length > 0 &&
//             ` / ${content.subcategories[0].translations.name}`}
//         </p>
//         <p className="content-date">
//           {formatDateRange(content.start_date, content.end_date)}
//         </p>
//         <p className="content-types">
//           {t("contains")}: {getContentInfo()}
//         </p>
//         <p className="content-status">
//           {content.is_current ? t("actual") : t("archive")}
//         </p>
//       </div>
//       <div className="content-actions">
//         <button
//           onClick={() => onContentClick(content.translations.slug)}
//           className="details-button"
//         >
//           {t("contentDetails")}
//         </button>
//         <button onClick={() => onSave(content)} className="save-button">
//           {t("save")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllContentItem;
