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
  onProgramClick: () => void;
  saveButton: React.ReactNode;
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
    onProgramClick,
    saveButton,
  }) => {
    const { t } = useTranslation();

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
          {saveButton}
        </div>
      </div>
    );
  }
);

export default AllContentItem;
