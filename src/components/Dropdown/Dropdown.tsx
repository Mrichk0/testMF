import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AllContent } from "../../types";
import AllContentDetailsList from "../AllContentDetailsList/AllContentDetailsList";

import { useTranslatedContent } from "../../hooks/useTranslatedContent";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;

  items: AllContent[];
  groupByCategory?: boolean;
  onItemRemove?: (itemId: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,

  items,
  groupByCategory = false,
  onItemRemove,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { getTranslation } = useTranslatedContent();

  const groupedItems = React.useMemo(() => {
    return items.reduce((acc, item) => {
      const category =
        item.category?.translations?.[0]?.category_name || t("uncategorized");
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<string, AllContent[]>);
  }, [items, groupByCategory, t]);

  const handleItemClick = (item: AllContent) => {
    const categorySlug = item.category?.slug || "uncategorized";
    const itemSlug = item.slug;
    const path = `/${categorySlug}/${itemSlug}`;

    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownHeader}>
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
      </div>
      <div className={styles.dropdownContent}>
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className={styles.categoryGroup}>
            {groupByCategory && (
              <h4 className={styles.categoryTitle}>
                {getTranslation(categoryItems[0].category, "category_name") ||
                  category}
              </h4>
            )}
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className={styles.contentItem}
                onClick={() => handleItemClick(item)}
              >
                <h5 className={styles.contentTitle}>
                  {getTranslation(item, "title") || "Untitled"}
                </h5>
                <AllContentDetailsList
                  content={item}
                  className={styles.courseDetails}
                  itemClassName={styles.courseDetailsItem}
                  showTags={true}
                />
                {onItemRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemRemove(item.id);
                    }}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
