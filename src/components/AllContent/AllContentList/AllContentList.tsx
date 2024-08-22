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

const getCategorySlug = (content: AllContent): string =>
  content?.category?.slug || "uncategorized";

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
    isLoading,
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
      navigate(`/${categorySlug}/${content.slug}`);
    },
    [navigate]
  );

  const allContentList = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const memoizedAllContentItems = useMemo(
    () =>
      allContentList
        .map((content: AllContent) => {
          if (!content) return null;
          const uniqueKey = `content-${content.id}-${content.slug}`;
          const title = getTranslation(content, "title");
          const description = getTranslation(content, "description");
          const buttonName = getTranslation(content, "button_name");

          if (!title || !description || !buttonName) {
            console.warn(`Missing translation for content: ${content.id}`);
            return null;
          }

          return (
            <AllContentItem
              key={uniqueKey}
              title={title}
              description={description}
              buttonName={buttonName}
              photoUrl={
                content.cover
                  ? `http://0.0.0.0:8055/assets/${content.cover}`
                  : undefined
              }
              onProgramClick={() => handleProgramClick(content)}
              saveButton={
                <SaveContentButton
                  key={`save-${uniqueKey}`}
                  content={content}
                />
              }
              content={content}
            />
          );
        })
        .filter(Boolean),
    [allContentList, getTranslation, handleProgramClick]
  );

  const contentToRender = useMemo(() => {
    if (isLoading && allContentList.length === 0) {
      return <div className="loader">{t("loading")}</div>;
    }
    if (isError) {
      return (
        <div className="error">
          {t("error", { message: (error as Error).message })}
        </div>
      );
    }
    if (allContentList.length === 0) {
      return <div className="no-content">{t("noContent")}</div>;
    }
    if (memoizedAllContentItems.length === 0) {
      return <div className="no-content">{t("noValidContent")}</div>;
    }
    return (
      <ul className={styles.allContentList}>
        {memoizedAllContentItems}
        {(hasNextPage || isFetchingNextPage) && (
          <div ref={infiniteScrollRef} className="loader">
            {isFetchingNextPage ? t("loading") : t("loadMore")}
          </div>
        )}
      </ul>
    );
  }, [
    isLoading,
    isError,
    allContentList,
    memoizedAllContentItems,
    hasNextPage,
    isFetchingNextPage,
    t,
    error,
  ]);

  return (
    <>
      <YearsList />
      {contentToRender}
    </>
  );
};

export default React.memo(AllContentList);
