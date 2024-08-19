import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AllContent } from "../../types";
import CourseDetailsList from "../AllContentDetailsList/AllContentDetailsList";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: AllContent[];
  groupByCategory?: boolean;
  onItemRemove?: (itemId: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  title,
  items,
  groupByCategory = false,
  onItemRemove,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const groupedItems = React.useMemo(() => {
    if (!groupByCategory) return { [title]: items };

    return items.reduce((acc, item) => {
      const category =
        item.category?.translations?.[0]?.category_name || t("uncategorized");
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<string, AllContent[]>);
  }, [items, groupByCategory, t, title]);

  const handleItemClick = (item: AllContent) => {
    const categorySlug = item.category?.slug || "uncategorized";
    const itemSlug = item.slug;
    const path = `/${categorySlug}/${itemSlug}`;

    navigate(path);
    // if (onItemClick) {
    //   onItemClick(item);
    // }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownHeader}>
        <h3>{title}</h3>
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
      </div>
      <div className={styles.dropdownContent}>
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className={styles.categoryGroup}>
            {groupByCategory && (
              <h4 className={styles.categoryTitle}>{category}</h4>
            )}
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className={styles.contentItem}
                onClick={() => handleItemClick(item)}
              >
                <h5 className={styles.contentTitle}>
                  {item.translations?.[0]?.title || "Untitled"}
                </h5>
                <CourseDetailsList
                  content={item}
                  className={styles.courseDetails}
                  itemClassName={styles.courseDetailsItem}
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
