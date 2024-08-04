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
import PathInfo from "./PathInfo/PathInfo";

const Header: React.FC = () => {
  const location = useLocation();
  const { data: categoriesData } = useCategories();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isMainPage = pathSegments.length === 0;
  const categorySlug = pathSegments[0];
  const pageSlug = pathSegments[1];

  const category = categoriesData?.categories.find(
    (cat) => cat.slug === categorySlug
  );
  const isCategoryPage = categoriesData?.categories.some(
    (category) => `/${category.slug}` === location.pathname
  );
  const shouldShow = !isMainPage && !isCategoryPage;

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <SquareBlock />
        <Logo />
        <div className={styles.dropdownSection}>
          {shouldShow ? (
            <PathInfo category={category} pageSlug={pageSlug} />
          ) : (
            <SearchInput />
          )}
          <SavedContentDropdown />
        </div>
        <Menu />
      </div>
      {!shouldShow && <Categories />}
    </header>
  );
};

export default Header;
