import React from "react";
import { useParams } from "react-router-dom";

import useAllContentDetails, { Template } from "../../hooks/useAllContentPage";

import Grid from "../../components/Grid/Grid";
import styles from "./DetailsPage.module.css";

interface DetailsPageProps {
  slug: string | undefined;
  categorySlug?: string | undefined;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ slug: propSlug }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const slug = propSlug || paramSlug;

  const { data, isLoading, error } = useAllContentDetails(slug);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const tiles =
    data?.template?.map((tile: Template) => {
      const getContent = (tile: Template) => {
        switch (tile.type) {
          case "text":
            return tile.translations?.[0]?.text || "";
          case "image":
            return tile.image || "";
          case "video":
            return tile.video_url || "";
          default:
            return "";
        }
      };

      return {
        id: tile.id,
        type: tile.type as "text" | "image" | "video",
        content: getContent(tile),
        x1: tile.x1,
        y1: tile.y1,
        x2: tile.x2,
        y2: tile.y2,
      };
    }) || [];

  return (
    <div className={styles.detailsPage}>
      <h1>{data.translations[0]?.title}</h1>
      {tiles.length > 0 && <Grid tiles={tiles} />}
    </div>
  );
};

export default DetailsPage;
