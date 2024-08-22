import React, { memo, useState } from "react";
import AllContentDetailsList from "../../AllContentDetailsList/AllContentDetailsList";
import { AllContent } from "../../../types";

interface AllContentItemProps {
  title: string;
  description: string;
  buttonName: string;
  content: AllContent;
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
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div className="course-item">
        <h2 className="course-title">{title}</h2>
        {description !== "Field not found" && (
          <p className="course-description">{description}</p>
        )}
        {photoUrl && !imageError && (
          <img
            src={photoUrl}
            alt={title}
            className="course-filter__course-image"
            width={300}
            height={200}
            loading="lazy"
            onError={handleImageError}
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
