import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./DetailsPage.module.css";

import useAllContentDetails, { Template } from "../../hooks/useAllContentPage";

import Grid from "../../components/Grid/Grid";

const DetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, error } = useAllContentDetails(slug);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.template) return <div>No data available</div>;

  const tiles = data.template.map((tile: Template) => {
    let content;
    if (tile.type === "text") {
      content = tile.translations?.[0]?.text || "";
    } else if (tile.type === "image") {
      content = tile.image || "";
    } else if (tile.type === "video") {
      content = tile.video_url || "";
    }

    return {
      id: tile.id,
      type: tile.type,
      content,
      x1: tile.x1,
      y1: tile.y1,
      x2: tile.x2,
      y2: tile.y2,
    };
  });

  return (
    <div className={styles.detailsPage}>
      <button onClick={() => navigate("/")}>{t("back")}</button>
      <h1>{data.translations[0]?.title}</h1>
      <Grid tiles={tiles} />
    </div>
  );
};

export default DetailsPage;
