import { useState, useEffect, useMemo, RefObject } from "react";

export function useGrid({ $el }: { $el: RefObject<HTMLDivElement> }) {
  const [grid, setGrid] = useState({
    cols: 15,
    rows: 0,
    width: 0,
    ratio: 0.64,
  });

  console.log("useGrid - initial grid:", grid);

  const scaleX = useMemo(() => grid.width / grid.cols, [grid.width, grid.cols]);
  const scaleY = useMemo(() => scaleX * grid.ratio, [scaleX, grid.ratio]);

  console.log("useGrid - scaleX:", scaleX);
  console.log("useGrid - scaleY:", scaleY);

  useEffect(() => {
    function handleResize() {
      if ($el.current) {
        setGrid((prev) => ({ ...prev, width: $el.current!.offsetWidth }));
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [$el]);

  const getCell = (event: MouseEvent) => {
    if (!$el.current) return { x1: 0, y1: 0, x2: 1, y2: 1 };
    const rect = $el.current.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.x) / scaleX);
    const y = Math.floor((event.clientY - rect.y) / scaleY);
    return { x1: x, y1: y, x2: x + 1, y2: y + 1 };
  };

  const containerStyle = useMemo(
    () => ({
      height: grid.rows ? `${grid.rows * scaleY}px` : "100%",
      width: "100%",
      position: "relative" as const,
    }),
    [grid.rows, scaleY]
  );

  return {
    grid: { ...grid, scaleX, scaleY, getCell },
    containerStyle,
  };
}
