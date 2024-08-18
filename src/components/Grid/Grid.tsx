import React, { useEffect, useRef, useState } from "react";
import styles from "./Grid.module.css";
import Tile from "./Tile/Tile";

interface GridProps {
  tiles: {
    id: string;
    type: "text" | "image" | "video";
    content: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }[];
}

const Grid: React.FC<GridProps> = ({ tiles }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<number>(0);

  useEffect(() => {
    const updateRowHeight = () => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.offsetWidth - 40; // Враховуємо padding
        const maxX = Math.max(...tiles.map((tile) => tile.x2));
        const cellWidth = (gridWidth - (maxX - 1) * 10) / maxX; // Враховуємо gap
        setRowHeight(cellWidth * 0.75); // Встановлюємо висоту як 3/4 від ширини
      }
    };

    updateRowHeight();
    window.addEventListener("resize", updateRowHeight);
    return () => window.removeEventListener("resize", updateRowHeight);
  }, [tiles]);

  const maxX = Math.max(...tiles.map((tile) => tile.x2));
  const maxY = Math.max(...tiles.map((tile) => tile.y2));

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${maxX}, 1fr)`,
    gridAutoRows: `${rowHeight}px`,
    gap: "10px",
    padding: "20px",
  };

  return (
    <div ref={gridRef} className={styles.gridContainer} style={gridStyle}>
      {tiles.map((tile) => {
        const tileStyle = {
          gridColumn: `${tile.x1 + 1} / ${tile.x2 + 1}`,
          gridRow: `${tile.y1 + 1} / span ${tile.y2 - tile.y1}`,
          height: `${rowHeight * (tile.y2 - tile.y1)}px`,
        };

        return (
          <div key={tile.id} style={tileStyle} className={styles.tileWrapper}>
            <Tile data={tile} />
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
