import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSavedContent } from "../../../hooks/useSavedContent";
import Dropdown from "../../Dropdown/Dropdown";
import styles from "./SavedContentDropdown.module.css";
import { AllContent } from "../../../types";

const SavedContentDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { savedContent, removeSavedContent, error } = useSavedContent();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCourseClick = (content: AllContent) => {
    navigate(`/course/${content.slug}`);
  };

  return (
    <div className={styles.savedContentDropdown}>
      <button onClick={toggleDropdown} className={styles.savedContentButton}>
        ᢂ
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={toggleDropdown}
        title={t("saved")}
        items={savedContent}
        groupByCategory={false}
        onItemClick={handleCourseClick}
        onItemRemove={removeSavedContent}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default SavedContentDropdown;

// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { useSavedContent } from "../../../hooks/useSavedContent";
// import Dropdown from "../../Dropdown/Dropdown";
// import styles from "./SavedContentDropdown.module.css";
// import { AllContent } from "../../../types";

// const SavedContentDropdown: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { savedContent, removeSavedContent, error } = useSavedContent();

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleCourseClick = (content: AllContent) => {
//     navigate(`/course/${content.slug}`);
//   };

//   return (
//     <div className={styles.dropdownContainer}>
//       <button onClick={toggleDropdown} className={styles.savedContentButton}>
//         {t("saved")}
//       </button>
//       {isOpen && (
//         <Dropdown
//           isOpen={isOpen}
//           onClose={toggleDropdown}
//           title={t("saved")}
//           items={savedContent}
//           groupByCategory={false}
//           onItemClick={handleCourseClick}
//           onItemRemove={removeSavedContent}
//         />
//       )}
//       {error && <p className={styles.errorMessage}>{error}</p>}
//     </div>
//   );
// };

// export default SavedContentDropdown;
