// import React from "react";
// import Logo from "./Logo/Logo";
// import SquareBlock from "./SquareBlock/SquareBlock";
// import SearchInput from "./SearchInput/SearchInput";
// import Menu from "./Menu/Menu";
// import styles from "./Header.module.css";
// import Categories from "./Categories/Categories";
// import SavedContentDropdown from "./SavedAllContent/SavedContentDropdown";

// const Header: React.FC = () => {
//   return (
//     <header className={styles.header}>
//       <div className={styles.leftSection}>
//         <SquareBlock />
//         <Logo />
//         <div className={styles.dropdownSection}>
//           <SearchInput />
//           <SavedContentDropdown />
//         </div>
//         <Menu />
//       </div>
//       <Categories />
//     </header>
//   );
// };

// export default Header;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import Logo from "./Logo/Logo";
// import SquareBlock from "./SquareBlock/SquareBlock";
// import SearchInput from "./SearchInput/SearchInput";
// import Menu from "./Menu/Menu";
// import styles from "./Header.module.css";
// import Categories from "./Categories/Categories";
// import SavedContentDropdown from "./SavedAllContent/SavedContentDropdown";

// import { useCategories } from "../../hooks/useCategories";
// import { useTranslatedContent } from "../../hooks/useTranslatedContent";
// import { useCategory } from "./Categories/CategoryContext";

// const Header: React.FC = () => {
//   const location = useLocation();
//   const { selectedCategory } = useCategory();
//   const { data: categoriesData } = useCategories();
//   const { getTranslation } = useTranslatedContent();

//   const selectedCategoryName = categoriesData?.categories.find(
//     (category) => category.id === selectedCategory
//   );

//   return (
//     <header className={styles.header}>
//       <div className={styles.leftSection}>
//         <SquareBlock />
//         <Logo />
//         <div className={styles.dropdownSection}>
//           <SearchInput />
//           <SavedContentDropdown />
//         </div>
//         <Menu />
//       </div>
//       {location.pathname === "/" ? (
//         <Categories />
//       ) : selectedCategory && selectedCategoryName ? (
//         <div className={styles.selectedCategory}>
//           {getTranslation(selectedCategoryName, "category_name")}
//         </div>
//       ) : null}
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo/Logo";
import SquareBlock from "./SquareBlock/SquareBlock";
import SearchInput from "./SearchInput/SearchInput";
import Menu from "./Menu/Menu";
import styles from "./Header.module.css";
import Categories from "./Categories/Categories";
import SavedContentDropdown from "./SavedAllContent/SavedContentDropdown";

import { useCategories } from "../../hooks/useCategories";
import { useTranslatedContent } from "../../hooks/useTranslatedContent";
import { useCategory } from "./Categories/CategoryContext";

const Header: React.FC = () => {
  const location = useLocation();
  const { selectedCategory } = useCategory();
  const { data: categoriesData } = useCategories();
  const { getTranslation } = useTranslatedContent();

  const selectedCategoryName = categoriesData?.categories.find(
    (category) => category.id === selectedCategory
  );

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <SquareBlock />
        <Logo />
        <div className={styles.dropdownSection}>
          <SearchInput />
          <SavedContentDropdown />
        </div>
        <Menu />
      </div>
      {location.pathname === "/" ? (
        <Categories />
      ) : selectedCategory && selectedCategoryName ? (
        <div className={styles.selectedCategory}>
          {getTranslation(selectedCategoryName, "category_name")}
        </div>
      ) : null}
    </header>
  );
};

export default Header;
