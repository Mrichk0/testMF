import React, { memo } from "react";
import { useTranslation } from "react-i18next";

interface AllContentItemProps {
  title: string;
  description: string;
  categoryInfo: string;
  dateRange: string;
  contentInfo: string;
  isCurrent: boolean | undefined;
  photoUrl: string | undefined;
  onSave: () => void;
  onProgramClick: () => void;
  isSaved: boolean;
}

const AllContentItem: React.FC<AllContentItemProps> = memo(
  ({
    title,
    description,
    categoryInfo,
    dateRange,
    contentInfo,
    isCurrent,
    photoUrl,
    onSave,
    onProgramClick,
    isSaved,
  }) => {
    const { t } = useTranslation();

    console.log("categoryInfo", categoryInfo);

    return (
      <div className="course-item">
        <h2 className="course-title">{title}</h2>
        <p className="course-description">{description}</p>
        {photoUrl && (
          <img
            src={photoUrl}
            alt={title}
            className="course-filter__course-image"
            width="300"
          />
        )}
        <div className="course-details">
          <p className="course-category">{categoryInfo}</p>
          <p className="course-date">{dateRange}</p>
          <p className="course-content">
            {t("contains")}: {contentInfo}
          </p>
          <p className="course-status">
            {isCurrent ? t("actual") : t("archive")}
          </p>
        </div>
        <div className="course-actions">
          <button onClick={onProgramClick} className="program-button">
            {t("courseProgram")}
          </button>
          <button onClick={onSave} className="save-button">
            {isSaved ? t("saved") : t("save")}
          </button>
        </div>
      </div>
    );
  }
);

export default AllContentItem;

// import React, { memo } from "react";
// import { useTranslation } from "react-i18next";
// import classNames from "classnames";
// import CourseDetailsList from "../../AllContentDetailsList/AllContentDetailsList";
// import styles from "./AllContentItem.module.css";

// interface AllContentItemProps {
//   content: any; // Replace 'any' with your actual content type
//   onSave: () => void;
//   onProgramClick: () => void;
//   isSaved: boolean;
// }

// const AllContentItem: React.FC<AllContentItemProps> = memo(
//   ({ content, onSave, onProgramClick, isSaved }) => {
//     const { t } = useTranslation();

//     return (
//       <li className={styles.courseItem}>
//         <div className={styles.courseContent}>
//           <h2 className={styles.courseTitle}>{content.title}</h2>
//           <p className={styles.courseDescription}>{content.description}</p>
//           <CourseDetailsList
//             content={content}
//             className={styles.courseDetails}
//             itemClassName={styles.courseDetailItem}
//           />
//           <div className={styles.courseActions}>
//             <button onClick={onProgramClick} className={styles.programButton}>
//               {t("courseProgram")}
//             </button>
//             <button
//               onClick={onSave}
//               className={classNames(styles.saveButton, {
//                 [styles.saved]: isSaved,
//               })}
//             >
//               {isSaved ? t("saved") : t("save")}
//             </button>
//           </div>
//         </div>
//         {content.photoUrl && (
//           <div className={styles.courseImageWrapper}>
//             <img
//               src={content.photoUrl}
//               alt={content.title}
//               className={styles.courseImage}
//             />
//           </div>
//         )}
//       </li>
//     );
//   }
// );

// export default AllContentItem;
