// import React from "react";
// import styles from "./Tile.module.css";

// interface TileData {
//   id: string;
//   type: "text" | "image" | "video";
//   content: string;
//   x1: number;
//   y1: number;
//   x2: number;
//   y2: number;
// }

// interface TileProps {
//   data: TileData;
// }

// const Tile: React.FC<TileProps> = ({ data }) => {
//   console.log("Tile - rendering with data:", data);

//   const style = {
//     gridColumn: `span ${data.x2 - data.x1}`,
//     gridRow: `span ${data.y2 - data.y1}`,
//   };

//   console.log("Tile - computed style:", style);

//   const renderContent = () => {
//     if (!data.content) {
//       return <p>No content available</p>;
//     }

//     console.log("data content ", data.content);

//     switch (data.type) {
//       case "image":
//         return (
//           <img src={`http://0.0.0.0:8055/assets/${data.content}`} alt="" />
//         );
//       case "video":
//         const isYouTube = data.content.includes("youtube.com/watch");
//         const embedUrl = isYouTube
//           ? data.content.replace("watch?v=", "embed/")
//           : data.content;

//         return (
//           <div className={styles.videoWrapper}>
//             <iframe
//               src={embedUrl}
//               title="video"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{ width: "100%", height: "100%" }}
//             ></iframe>
//           </div>
//         );
//       case "text":
//       default:
//         return <article>{data.content}</article>;
//     }
//   };

//   return (
//     <div className={`tile tile-${data.type}`} style={style}>
//       {renderContent()}
//     </div>
//   );
// };

// export default Tile;

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
