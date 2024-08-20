import React, { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

import { useTranslatedContent } from "../../../hooks/useTranslatedContent";
import { useFilters } from "../../../hooks/useFilters";
import { useAllContent } from "../../../hooks/useAllContent";

import AllContentItem from "../AllContentItem/AllContentItem";
import YearsList from "../../YearsList/YearsList";
import SaveContentButton from "../../Buttons/SaveButton/SaveContentButton";

import { AllContent } from "../../../types";
import styles from "./AllContentList.module.css";

const getCategorySlug = (content: AllContent): string => {
  if (!content || !content.category || !content.category.slug) {
    return "";
  }
  return content.category.slug;
};

const AllContentList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { filters, selectedCategory, selectedSubcategories, selectedYear } =
    useFilters();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // isLoading,
    isError,
    error,
  } = useAllContent({
    selectedCategory,
    selectedSubcategories,
    filters,
    selectedYear,
  });

  const { getTranslation } = useTranslatedContent();

  const { ref: infiniteScrollRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleProgramClick = useCallback(
    (content: AllContent) => {
      const categorySlug = getCategorySlug(content);
      const safeCategorySlug = categorySlug || "uncategorized";
      navigate(`/${safeCategorySlug}/${content.slug}`);
    },
    [navigate]
  );

  const allContentList = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const memoizedAllContentItems = useMemo(() => {
    return allContentList.map((content) => (
      <AllContentItem
        key={content.id}
        title={getTranslation(content, "title")}
        description={getTranslation(content, "description")}
        buttonName={getTranslation(content, "button_name")}
        photoUrl={
          content.cover
            ? `http://0.0.0.0:8055/assets/${content.cover}`
            : undefined
        }
        onProgramClick={() => handleProgramClick(content)}
        saveButton={<SaveContentButton content={content} />}
        content={content}
      />
    ));
  }, [allContentList, getTranslation, handleProgramClick]);

  if (isError)
    return <div className="error">Error: {(error as Error).message}</div>;

  return (
    <>
      <YearsList />
      <ul className={styles.allContentList}>
        {memoizedAllContentItems}
        {(hasNextPage || isFetchingNextPage) && (
          <div ref={infiniteScrollRef} className="loader">
            {isFetchingNextPage ? t("loading") : t("loadMore")}
          </div>
        )}
      </ul>
    </>
  );
};

export default React.memo(AllContentList);
