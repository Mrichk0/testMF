import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.logo} onClick={handleClick}>
      <span className={styles.logoText}>METHODFUND</span>
    </div>
  );
};

export default Logo;
