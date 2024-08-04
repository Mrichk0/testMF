import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SquareBlock.module.css";
import { useCategories } from "../../../hooks/useCategories";

const SquareBlock: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: categoriesData } = useCategories();

  const isMainPage = location.pathname === "/";
  const isCategoryPage = categoriesData?.categories.some(
    (category) => `/${category.slug}` === location.pathname
  );

  const shouldShow = !isMainPage && !isCategoryPage;

  const handleClick = () => {
    if (shouldShow) {
      navigate(-1);
    }
  };

  return shouldShow ? (
    <div
      className={`${styles.squareBlock} ${styles.clickable}`}
      onClick={handleClick}
    >
      <svg
        className={styles.arrow}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 12H5M12 19L5 12L12 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ) : (
    <div
      className={`${styles.squareBlock} ${!isMainPage ? styles.clickable : ""}`}
    ></div>
  );
};

export default SquareBlock;
