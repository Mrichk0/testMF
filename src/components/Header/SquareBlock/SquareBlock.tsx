import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SquareBlock.module.css";

const SquareBlock: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === "/";

  const handleClick = () => {
    if (!isMainPage) {
      navigate(-1);
    }
  };

  return (
    <div
      className={`${styles.squareBlock} ${!isMainPage ? styles.clickable : ""}`}
      onClick={handleClick}
    >
      {!isMainPage && (
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
      )}
    </div>
  );
};

export default SquareBlock;
