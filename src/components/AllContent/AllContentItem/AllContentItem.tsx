import React, { memo } from "react";
import AllContentDetailsList from "../../AllContentDetailsList/AllContentDetailsList";
import { AllContent } from "../../../types";

interface AllContentItemProps {
  title: string;
  description: string;
  buttonName: string;
  content: AllContent;
  // isCurrent: boolean | undefined;
  photoUrl: string | undefined;
  onProgramClick: () => void;
  saveButton: React.ReactNode;
}

const AllContentItem: React.FC<AllContentItemProps> = memo(
  ({
    title,
    description,
    buttonName,
    photoUrl,
    onProgramClick,
    saveButton,
    content,
  }) => {
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
          <AllContentDetailsList content={content} />
        </div>
        <div className="course-actions">
          <button onClick={onProgramClick} className="program-button">
            {buttonName}
          </button>
          {saveButton}
        </div>
      </div>
    );
  }
);

export default AllContentItem;
