import React from "react";
import styles from "./Tile.module.css";

interface TileProps {
  data: {
    id: string;
    type: "text" | "image" | "video";
    content: string;
  };
}

const Tile: React.FC<TileProps> = ({ data }) => {
  const renderContent = () => {
    switch (data.type) {
      case "image":
        return (
          <img
            src={`http://0.0.0.0:8055/assets/${data.content}`}
            alt=""
            className={styles.tileImage}
          />
        );
      case "video":
        const isYouTube = data.content.includes("youtube.com/watch");
        const embedUrl = isYouTube
          ? data.content.replace("watch?v=", "embed/")
          : data.content;
        return (
          <div className={styles.videoWrapper}>
            <iframe
              src={embedUrl}
              title="video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      case "text":
      default:
        return <p className={styles.tileText}>{data.content}</p>;
    }
  };

  return (
    <div className={`${styles.tile} ${styles[`tile-${data.type}`]}`}>
      {renderContent()}
    </div>
  );
};

export default Tile;
