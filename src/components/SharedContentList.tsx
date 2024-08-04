import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

import styles from "./ContentList.module.css";
import { AllContent } from "../types";

interface ContentListProps {
  data: any;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  renderItem: (content: AllContent) => React.ReactNode;
}

const ContentList: React.FC<ContentListProps> = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
  error,
  renderItem,
}) => {
  const { t } = useTranslation();
  const { ref: loaderRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allContentList = useMemo(
    () => data?.pages.flatMap((page: any) => page.data) ?? [],
    [data]
  );

  if (isLoading) return <div className="loading">{t("loading")}</div>;
  if (isError) return <div className="error">Error: {error?.message}</div>;

  return (
    <>
      <div className={styles.contentList}>
        {allContentList.map((content: AllContent) => renderItem(content))}
      </div>
      {hasNextPage && (
        <div ref={loaderRef} className={styles.loader}>
          {isFetchingNextPage ? t("loading") : t("loadMore")}
        </div>
      )}
    </>
  );
};

export default ContentList;
