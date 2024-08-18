import React, { useCallback } from "react";
import { useSavedContent } from "../../../hooks/useSavedContent";
import { useTranslation } from "react-i18next";

interface SaveContentButtonProps {
  content: any;
  className?: string;
}

const SaveContentButton: React.FC<SaveContentButtonProps> = ({
  content,
  className = "",
}) => {
  const { t } = useTranslation();
  const { addSavedContent, removeSavedContent, savedContent } =
    useSavedContent();

  const contentId = content?.id;

  const isSaved = savedContent.some((saved) => saved.id === contentId);

  const handleToggleSave = useCallback(() => {
    if (!contentId) {
      console.error("Cannot save/remove content without an id");
      return;
    }

    if (isSaved) {
      removeSavedContent(contentId);
    } else {
      const contentToSave = {
        id: contentId,
        slug: content.slug,
        translations: content.translations,
        category: content.category,
      };
      addSavedContent(contentToSave);
    }
  }, [isSaved, content, contentId, addSavedContent, removeSavedContent]);

  if (!contentId) {
    return null;
  }

  return (
    <button
      onClick={handleToggleSave}
      className={`save-content-button ${isSaved ? "saved" : ""} ${className}`}
    >
      {isSaved ? t("remove") : t("save")}
    </button>
  );
};

export default React.memo(SaveContentButton);
